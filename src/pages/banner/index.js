import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { connect } from 'react-redux'
import styles from './index.less'
import '../../utils/crypto'
import { hrefTo } from '../../utils/utils'
import PropTypes from 'prop-types'
import { getList } from 'api/keyword'
import Avatar from 'components/avatar'
import SystemTime from './systemTime'
const { Header, Content } = Layout

class Banner extends Component {
	static propTypes = {
		children: PropTypes.element,
		history: PropTypes.object.isRequired,
	}
	constructor(props) {
		super(props)
		this.state = {
			isRender: true,
			defaultSelectedKeys: ['1'],
		}
	}

	componentDidMount = () => {
		// const socket = io('http://localhost:8888')
		// socket.on('connect', function (e) {
		// 	console.log('连接成功', e)
		// })
		// socket.on('message', function (data) {
		// 	console.log(data)
		// })
		// const evtSource = new EventSource(
		// 	window.location.protocol + '//' + window.location.host + '/es'
		// )
		// evtSource.addEventListener('HandleGetTime', function(e) {
		// 	//必须用addEventListener才能监听到
		// 	console.log(e.data)
		// })
		// this.props.getSystemInfo.evtSource.onHandleGetTime = e => {
		// 	console.log('eeeeeeeeeeeeee', e)
		// }
		// console.log(this.props, this.state, this.props.history.location.pathname !== "/login");
		this.setState({
			isRender: this.props.history.location.pathname !== '/login',
		})
	}

	static getDerivedStateFromProps(nextProps, state) {
		// if (nextProps.getSystemInfo.evtSource) {
		// 	nextProps.getSystemInfo.evtSource.addEventListener('HandleGetTime', e => {
		// 		//必须用addEventListener才能监听到
		// 		this.setState({
		// 			serverTime: e.data.toLocaleDateString(),
		// 		})
		// 	})
		// }
		let _key = ['1']
		switch (nextProps.history.location.pathname) {
			case '/home':
				_key = ['1']
				break
			case '/upload':
				_key = ['2']
				break
			case '/charts':
				_key = ['3']
				break
			case '/lottery':
				_key = ['5']
				break
			default:
				_key = ['1']
				break
		}
		return {
			defaultSelectedKeys: _key,
			isRender: nextProps.history.location.pathname !== '/login',
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.isRender !== nextState.isRender
	}
	linkToDoc() {
		hrefTo('/AppDoc/_book/')
	}

	render() {
		const LayoutHeader = () => (
			<Header className={classnames(styles['Menu'])}>
				<p className={classnames(styles['title'])}>xCentz</p>
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={this.state.defaultSelectedKeys}
					style={{ lineHeight: '64px' }}
				>
					<Menu.Item key="1">
						<Link to="/home">coolpad</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/upload">upload</Link>
					</Menu.Item>
					<Menu.Item key="3">
						<Link to="/charts">charts</Link>
					</Menu.Item>
					<Menu.Item key="4" onClick={this.linkToDoc.bind(this)}>
						AppDoc
					</Menu.Item>
					<Menu.Item key="5">
						<Link to="/lottery">lottery</Link>
					</Menu.Item>
				</Menu>
				<SystemTime />
				<Avatar className={styles['avatarInfo']} />
			</Header>
		)
		const { isRender } = this.state
		return (
			<Layout className={isRender ? styles['layout'] : ''}>
				{isRender ? <LayoutHeader /> : ''}
				<Content
					className={isRender ? styles['isRender'] : styles['isNotRender']}
				>
					<div className={styles['layout_content']}>{this.props.children}</div>
				</Content>
			</Layout>
		)
	}
}

export default withRouter(Banner)
