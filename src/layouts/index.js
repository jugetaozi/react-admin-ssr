import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";
import LayoutIndex from './layoutIndex.js'
import store from '../store/store';

class Index extends Component {
	render () {
		return (
			<Provider store={store}>
				<Router>
					<LayoutIndex />
				</Router>
			</Provider>
		);
	}
}

export default Index;//分离router 以便增加withRouter
