import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getStorage } from '../../utils/utils'

class privateRoute extends Component {
	static propTypes = {
		path: PropTypes.string,
		exact: PropTypes.bool,
		notRequiredAuth: PropTypes.bool,
		component: PropTypes.func.isRequired, //组件func
	}
	static defaultProps = {
		notRequiredAuth: false, //默认都需要带上auth
	}
	constructor(props) {
		super(props)
		this.state = {
			hasAuth: false,
		}
	}

	componentDidMount() {
		// console.log(this.state.hasAuth);
		// if (getStorage("_token")) {
		// 	this.setState({
		// 		hasAuth: true
		// 	})
		// } else {
		// 	this.setState({
		// 		hasAuth: false
		// 	}, () => {
		// 		if (!this.props.notRequiredAuth) {
		// 			this.props.history.push('/login')
		// 		}
		// 	})
		// }
	}
	static getDerivedStateFromProps(props, state) {
		if (getStorage('_token')) {
			return {
				hasAuth: true,
			}
		} else {
			if (!props.notRequiredAuth) {
				props.history.push('/login')
				return null
			}
			return {
				hasAuth: false,
			}
		}
	}

	render() {
		const { notRequiredAuth } = this.props
		if (!notRequiredAuth && !this.state.hasAuth) {
			//如果默认需要验证auto而且又没有aotu 拦截此类请求
			return null
		}
		return <Route {...this.props} />
	}
}

export default withRouter(privateRoute) //withRouter 提供一个history对象 来操作路由
