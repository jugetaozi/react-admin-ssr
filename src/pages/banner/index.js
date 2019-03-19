import React, { Component } from 'react'
import { Layout, Menu, Avatar } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import styles from './banner.less'
import '../../utils/crypto'
import { hrefTo } from '../../utils/utils'
import { getList } from 'api/keyword'
const { Header, Content } = Layout

class Banner extends Component {
	state = {
		isRender: true,
		defaultSelectedKeys: ['1'],
	}

	componentDidMount = () => {
		// console.log(this.props, this.state, this.props.history.location.pathname !== "/login");
		this.setState({
			isRender: this.props.history.location.pathname !== '/login',
		})
	}
	static getDerivedStateFromProps(props, state) {
		let _key = ['1']
		switch (props.history.location.pathname) {
			case '/home':
				_key = ['1']
				break
			case '/upload':
				_key = ['2']
				break
			case '/charts':
				_key = ['3']
				break
			default:
				_key = ['1']
				break
		}
		return {
			defaultSelectedKeys: _key,
			isRender: props.history.location.pathname !== '/login',
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state.isRender !== nextState.isRender
	}
	linkToDoc() {
		hrefTo('/AppDoc/_book/')
		// getList()
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
				</Menu>
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
