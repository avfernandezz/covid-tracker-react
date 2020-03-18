import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import GeneralTracker from "./components/GeneralTracker/GeneralTracker";
import CountryTracker from "./components/GeneralTracker/CountryTracker/CountryTracker";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h2>Covid-19 Tracker</h2>
			</header>
			<GeneralTracker></GeneralTracker>
			<br />
			<CountryTracker></CountryTracker>
			<br />
		</div>
	);
}

export default App;
