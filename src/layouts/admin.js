//多页应用另外一个入口
import React, { Component } from 'react';
import { Layout, Menu,Button, Icon, Avatar } from 'antd';
import classnames from 'classnames';
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import Xcentz from '../pages/coolpad/xcentz.js'
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Admin extends Component {
	render () {
		return (
			<Router>
				<Layout className={styles['layout']}>
					<Header className={classnames(styles['Menu'])}>
						<p className={classnames(styles['title'], styles['kk'])}>xCentz admin</p>
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={['1']}
							style={{ lineHeight: '64px' }}
						>
							<Menu.Item key="1"><Link to='/'>xcentz admin</Link></Menu.Item>
						</Menu>
					</Header>
					<Content style={{ margin: '0 10px', backgroundColor: '#fff' }}>
						<Switch>
							<Route path="/" exact component={Xcentz} />
						</Switch>
					</Content>
				</Layout>
			</Router>
		);
	}
}

export default Admin;
