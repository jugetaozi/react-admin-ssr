import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Login from '../pages/login'
import DashBoard from './dashBoard'
import ErrorPage from '../pages/errorPage'
import styles from './layoutIndex.less';
import Banner from '../pages/banner'

import Coolpad from '../pages/coolpad/coolpad.js'
import Xcentz from '../pages/coolpad/xcentz.js'

class LayoutIndex extends Component {
	render () {
		return (
			<Banner>{/* isRender={this.props.history.location.pathname !== "/login"}  route改变=>location改变=>prop改变=>导致子组件重复渲染 */}
				<Switch> {/** Switch只对子元素生效 */}
					<Route path="/home" exact component={Coolpad} />
					<Route path="/admin" exact component={Xcentz} />
					<Route path="/login" exact component={Login} />
					<Redirect from="/" exact to="/home" />
					<Route component={ErrorPage} />
				</Switch>
			</Banner>
		);
	}
}

export default withRouter(LayoutIndex);//withRouter 提供一个history对象 来操作路由
