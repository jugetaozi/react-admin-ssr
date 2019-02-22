import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Banner from '../pages/banner'
import styles from './layoutIndex.less';
import Coolpad from '../pages/coolpad/coolpad.js'
import Xcentz from '../pages/coolpad/xcentz.js'
import ErrorPage from '../pages/errorPage'

class DashBoard extends Component {
	render () {
		return (
			<Banner>
				<Switch> {/** Switch只对子元素生效 */}
					<Route path="/home" exact component={Coolpad} />
					<Route path="/admin" exact component={Xcentz} />
					<Redirect from="/" exact to="/home" />
					<Route component={ErrorPage} />
				</Switch>
			</Banner>
		);
	}
}

export default DashBoard;