import React, { Component } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";

class CountryTracker extends Component {
	state = {
		countries: [],
		iso3: [],
		countryName: "Select your country",
		countryISO: "",
		dropdownCountries: [],
		filterValue: "",
		loading: true,
		loadingData: 0,
		show: false,
		countryData: {
			deaths: 0,
			active: 0,
			recovered: 0,
			confirmed: 0
		}
	};

	componentDidMount() {
		axios
			.get("https://covid19.mathdro.id/api/countries")
			.then(res => {
				let dropdownValues = Object.entries(res.data.countries);
				this.setState({
					countries: res.data.countries,
					dropdownCountries: dropdownValues,
					iso3: res.data.iso3,
					loading: false
				});
			})
			.catch(err => console.log(err));
	}

	closeHandler = () => {
		this.setState({ show: false });
	};
	cardLinkHandler = data => {
		this.setState({ show: true });
		axios
			.get(
				`https://covid19.mathdro.id/api/countries/${this.state.countryISO}/${data}`
			)
			.then(res => {
				console.log(res.data);
			})
			.catch(err => console.log(err));
	};

	dropdownHandler = e => {
		this.setState({
			countryName: e,
			countryISO: this.state.iso3[this.state.countries[e]],
			loadingData: 1
		});

		axios
			.get(
				`https://covid19.mathdro.id/api/countries/${
					this.state.iso3[this.state.countries[e]]
				}`
			)
			.then(res => {
				this.setState({
					countryData: {
						active: res.data.confirmed.value - res.data.recovered.value,
						deaths: res.data.deaths.value,
						recovered: res.data.recovered.value,
						confirmed: res.data.confirmed.value
					},
					loadingData: 3
				});
			})
			.catch(err => {
				console.log(err);
				this.setState({ loadingData: 2 });
			});
	};

	setValue = value => {
		let newdropdownCountries = null;
		if (!value) {
			let newdropdownCountries = Object.entries(this.state.countries);
			this.setState({
				filterValue: value,
				dropdownCountries: newdropdownCountries
			});
			return;
		}

		newdropdownCountries = this.state.dropdownCountries.filter(
			child => !value || child[0].toLowerCase().startsWith(value)
		);

		this.setState({
			filterValue: value,
			dropdownCountries: newdropdownCountries
		});
	};
	render() {
		let content = null;
		if (this.state.loadingData === 0) {
			content = null;
		} else if (this.state.loadingData === 1) {
			content = <Spinner animation="grow" />;
		} else if (this.state.loadingData === 2) {
			content = (
				<Row className="justify-content-md-center">
					<Col xs={12} md={3}>
						<Card body> No data</Card>
					</Col>
				</Row>
			);
		} else {
			content = (
				<Container>
					<p>
						<b>{`${this.state.countryName} Stats`}</b>
					</p>
					<Row>
						<Col xs={12} md={3}>
							<Card bg={"success"} text={"light"}>
								<Card.Body>
									<b>
										{this.state.countryData.confirmed.toLocaleString("en-Us", {
											minimumFractionDigits: 0
										})}{" "}
									</b>
									<br />
									Confirmed
								</Card.Body>
							</Card>
						</Col>
						<Col className="d-md-none">
							<hr style={{ borderTop: "1px solid white" }} />
						</Col>
						<Col xs={12} md={3}>
							<Card bg={"info"} text={"light"}>
								<Card.Body>
									<b>
										{this.state.countryData.recovered.toLocaleString("en-Us", {
											minimumFractionDigits: 0
										})}{" "}
									</b>
									<br />
									Recovered
								</Card.Body>
							</Card>
						</Col>{" "}
						<Col className="d-md-none">
							<hr style={{ borderTop: "1px solid white" }} />
						</Col>
						<Col xs={12} md={3}>
							{" "}
							<Card bg={"warning"} text={"light"}>
								<Card.Body>
									<b>
										{this.state.countryData.active.toLocaleString("en-Us", {
											minimumFractionDigits: 0
										})}{" "}
									</b>
									<br />
									Active
								</Card.Body>
							</Card>
						</Col>
						<Col className="d-md-none">
							<hr style={{ borderTop: "1px solid white" }} />
						</Col>
						<Col xs={12} md={3}>
							<Card bg={"dark"} text={"light"}>
								<Card.Body>
									<b>
										{this.state.countryData.deaths.toLocaleString("en-Us", {
											minimumFractionDigits: 0
										})}{" "}
									</b>
									<br />
									Deaths
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			);
		}
		return (
			<div>
				<Container>
					<Modal
						size="lg"
						aria-labelledby="contained-modal-title-vcenter"
						centered
						show={this.state.show}
						onHide={this.closeHandler}
					>
						<Modal.Header closeButton>
							<Modal.Title id="contained-modal-title-vcenter">
								<b>{`${this.state.countryName} Stats`}</b>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<h4>Centered Modal</h4>
							<p>
								Cras mattis consectetur purus sit amet fermentum. Cras justo
								odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
								risus, porta ac consectetur ac, vestibulum at eros.
							</p>
						</Modal.Body>
					</Modal>
					<DropdownButton
						id={`dropdown-variants-danger`}
						variant={"outline-dark"}
						title={this.state.countryName}
						onSelect={this.dropdownHandler}
					>
						<FormControl
							autoFocus
							className="mx-3 my-2 w-auto"
							placeholder="Type to filter..."
							onChange={e => this.setValue(e.target.value.toLowerCase())}
							value={this.state.filterValue}
						/>
						{this.state.dropdownCountries.map(([country, code]) => (
							<Dropdown.Item eventKey={country} key={country}>
								{country}
							</Dropdown.Item>
						))}

						<Dropdown.Divider />
					</DropdownButton>{" "}
					<br />
					{content != null ? content : null}
				</Container>
			</div>
		);
	}
}
export default CountryTracker;
