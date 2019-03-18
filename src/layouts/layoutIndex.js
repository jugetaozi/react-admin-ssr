import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Login from '../pages/login'
import ErrorPage from '../pages/errorPage'
import Banner from '../pages/banner'
import PrivateRoute from "../components/privateRoute";

import Coolpad from '../pages/coolpad'
import Upload from '../pages/upload'
import Charts from '../pages/charts'

class LayoutIndex extends Component {
	render () {
		return (
			<Banner>
				{/* isRender={this.props.history.location.pathname !== "/login"}  route改变=>location改变=>prop改变=>导致子组件重复渲染 */}
				<Switch>
					{' '}
					{/** Switch只对子元素生效 */}
					<PrivateRoute path="/home" exact component={Coolpad} />
					<PrivateRoute path="/upload" exact component={Upload} />
					<PrivateRoute path="/charts" exact component={Charts} />
					<PrivateRoute path="/login" exact component={Login} notRequiredAuth />
					<Redirect from="/" exact to="/home" />
					<PrivateRoute component={ErrorPage} notRequiredAuth />
					{/* <Route path="/home" exact component={Coolpad} />
					<Route path="/admin" exact component={Xcentz} />
					<Route path="/login" exact component={Login} />
					<Redirect from="/" exact to="/home" />
					<Route component={ErrorPage} /> */}
				</Switch>
			</Banner>
		)
	}
}

export default withRouter(LayoutIndex);//withRouter 提供一个history对象 来操作路由
