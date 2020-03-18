import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./GeneralTracker.css";

class GeneralTracker extends Component {
	state = {
		confirmed: 0,
		recovered: 0,
		deaths: 0,
		lastUpdated: "",
		loading: true
	};

	componentDidMount() {
		axios
			.get("https://covid19.mathdro.id/api")
			.then(res => {
				this.setState({
					confirmed: res.data.confirmed.value,
					deaths: res.data.deaths.value,
					recovered: res.data.recovered.value,
					lastUpdated: res.data.lastUpdate,
					loading: false
				});
			})
			.catch(err => console.log(err));
	}
	render() {
		let content = null;
		if (this.state.loading) {
			content = <Spinner animation="grow" />;
		} else {
			content = (
				<Row>
					<Col xs={12} md={3}>
						<b>
							{this.state.confirmed.toLocaleString("en-Us", {
								minimumFractionDigits: 0
							})}{" "}
						</b>
						<br />
						Confirmed
					</Col>
					<Col className="d-md-none">
						<hr style={{ borderTop: "1px solid white" }} />
					</Col>
					<Col xs={12} md={3} style={{ color: "#03dac6" }}>
						<b>
							{this.state.recovered.toLocaleString("en-Us", {
								minimumFractionDigits: 0
							})}{" "}
						</b>
						<br />
						Recovered
					</Col>
					<Col className="d-md-none">
						<hr style={{ borderTop: "1px solid white" }} />
					</Col>
					<Col xs={12} md={3} style={{ color: "#f5f6aa" }}>
						<b>
							{(this.state.confirmed - this.state.recovered).toLocaleString(
								"en-Us",
								{
									minimumFractionDigits: 0
								}
							)}{" "}
						</b>
						<br />
						Active
					</Col>
					<Col className="d-md-none">
						<hr style={{ borderTop: "1px solid white" }} />
					</Col>
					<Col xs={12} md={3} style={{ color: "#d77f8f" }}>
						<b>
							{this.state.deaths.toLocaleString("en-Us", {
								minimumFractionDigits: 0
							})}{" "}
						</b>
						<br />
						Deaths
					</Col>
				</Row>
			);
			/* <Grid container spacing={5}>
					<Grid item xs={12} sm={3}>
						<Typography variant="body1" gutterBottom style={{ color: "red" }}>
							<b>
								{this.state.confirmed.toLocaleString("en-Us", {
									minimumFractionDigits: 0
								})}{" "}
							</b>
							<br />
							Confirmed
						</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Typography variant="body1" gutterBottom style={{ color: "green" }}>
							<b>
								{this.state.recovered.toLocaleString("en-Us", {
									minimumFractionDigits: 0
								})}{" "}
							</b>
							<br />
							Recovered
						</Typography>
					</Grid>

					<Grid item xs={12} sm={3}>
						<Typography variant="body1" gutterBottom>
							<b>
								{(this.state.confirmed - this.state.recovered).toLocaleString(
									"en-Us",
									{
										minimumFractionDigits: 0
									}
								)}{" "}
							</b>
							<br />
							Active
						</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Typography variant="body1" gutterBottom>
							<b>
								{this.state.deaths.toLocaleString("en-Us", {
									minimumFractionDigits: 0
								})}{" "}
							</b>
							<br />
							Deaths
						</Typography>
					</Grid>
				</Grid> */
		}
		return (
			<div className="generalTracker">
				<Container>
					<Card bg={"dark"} text={"light"}>
						<Card.Body>
							<Row>
								<Col xs={12} md={8} className="d-md-flex justify-content-start">
									<p>
										<b>Global Stats</b>
									</p>
								</Col>
								<Col xs={12} md={4}>
									{" "}
									<small>
										{this.state.lastUpdated !== ""
											? "Last Updated: " + this.state.lastUpdated
											: ""}
									</small>
								</Col>
							</Row>
							<br />

							{content}
						</Card.Body>
					</Card>
				</Container>
			</div>
		);
	}
}

export default GeneralTracker;
