import React, { Component } from 'react';
import { HashRouter as Router } from "react-router-dom";
import LayoutIndex from './layoutIndex.js'

class Index extends Component {
	render () {
		return (
			<Router>
				<LayoutIndex />
			</Router>
		);
	}
}

export default Index;//分离router 以便增加withRouter
