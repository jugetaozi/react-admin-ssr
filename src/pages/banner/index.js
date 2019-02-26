import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from "react-router-dom";
import classnames from 'classnames';
import styles from './banner.less';
import "../../utils/crypto";
import { hrefTo } from '../../utils/utils'
import { getList } from 'api/keyword'
const { Header, Content } = Layout;

class Banner extends Component {
	state = {
		isRender: true
	}
	componentDidMount = () => {
		// console.log(this.props, this.state, this.props.history.location.pathname !== "/login");
		this.setState({
			isRender: this.props.history.location.pathname !== "/login"
		})
	}
	shouldComponentUpdate (nextProps, nextState) {
		return this.state.isRender !== nextState.isRender;
	}
	componentWillReceiveProps (nextProps) {
		this.setState({
			isRender: this.props.history.location.pathname !== "/login"
		})
	}
	linkToDoc () {
		hrefTo('/AppDoc/_book/')
		// getList()
	}



	render () {
		const LayoutHeader = () => <Header className={classnames(styles['Menu'])}>
			<p className={classnames(styles['title'])} >xCentz</p>
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={['1']}
				style={{ lineHeight: '64px' }}
			>
				<Menu.Item key="1"><Link to='/home'>coolpad</Link></Menu.Item>
				<Menu.Item key="2"><Link to='/admin'>admin</Link></Menu.Item>
				<Menu.Item key="3"><Link to='/login'>login</Link></Menu.Item>
				<Menu.Item key="4" onClick={this.linkToDoc.bind(this)}>AppDoc</Menu.Item>
			</Menu>
		</Header>
		const { isRender } = this.state
		return <Layout className={isRender ? styles['layout'] : ''}>
			{isRender ? <LayoutHeader /> : ''}
			<Content style={isRender ? { margin: '0 10px', backgroundColor: '#fff' } : { margin: '0', backgroundColor: '#fff' }}>
				{this.props.children}
			</Content>
		</Layout>
	}
}

export default withRouter(Banner);