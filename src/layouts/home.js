import React, { Component } from 'react';
import { Layout, Menu,Button, Icon, Avatar } from 'antd';
import classnames from 'classnames';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import styles from './home.less';
import Coolpad from '../pages/coolpad/coolpad.js'
import MdcMonitor from '../pages/mdcMonitor/mdcMonitor.js'
import imgSrc from "../assets/logo.png"
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Home extends Component {
	render () {
		return (
			<Router>
				<Layout className={styles['layout']}>
					<Header className={classnames(styles['Menu'])}>
						<p className={classnames(styles['title'], styles['kk'])}>xCentz</p>
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={['1']}
							style={{ lineHeight: '64px' }}
						>
							<Menu.Item key="1"><Link to='/'>coolpad</Link></Menu.Item>
						</Menu>
					</Header>
					<Content style={{ margin: '0 10px', backgroundColor: '#fff' }}>
						<Switch>
							<Route path="/" exact component={Coolpad} />
						</Switch>
					</Content>
				</Layout>
			</Router>
		);
	}
}

export default Home;
