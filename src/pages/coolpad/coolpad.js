import React, { Component } from 'react';
import { Menu, Icon, Alert, Tabs, Button, Table } from 'antd';
import styles from './coolpad.less'
import {getNewList, getList} from 'api/keyword'

const TabPane = Tabs.TabPane;
const { SubMenu } = Menu;

class mdcMonitor extends Component {

	state = {
		title: 'coolpad',
		form: ''
	}

	componentDidMount = () => {
		// getNewList().then((data) => {
		// 	console.log(data)
		// })
		getList().then(data => {
			console.log(data)
		})
	}


	render () {
		return (
			<div className="coolpad">
				<Button className = {styles['kk']}>sdaf</Button>
				<div className={styles['kk']}>{this.state.title}</div>
			</div>
		)
	}
}
export default mdcMonitor
