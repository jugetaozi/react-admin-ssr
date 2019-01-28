import React, { Component } from 'react';
import { Menu, Icon, Alert, Tabs, Button, Table } from 'antd';
import styles from './xcentz.less'
import { getNewList, postDate } from "api/keyword";

const TabPane = Tabs.TabPane;
const { SubMenu } = Menu;

class mdcMonitor extends Component {

	state = {
		title: 'xcentz',
		form: ''
	}

	componentDidMount = () => {
		// getNewList().then((data) => {
		// 	console.log(data)
		// })
		// postDate().then((data) => {
		// 	console.log(data)
		// })
	}


	render () {
		return (
			<div className="coolpad">
				<Button>sdaf</Button>
				<div className={styles.kk}>{this.state.title}</div>
			</div>
		)
	}
}
export default mdcMonitor
