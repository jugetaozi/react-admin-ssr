import React, { Component } from 'react';
import { Menu, Icon, Alert, Tabs, Button, Table } from 'antd';
import styles from './xcentz.less'
import { getNewList, postDate } from "api/keyword";
import store from "../../store/store";

const TabPane = Tabs.TabPane;
const { SubMenu } = Menu;

class xcentZ extends Component {

	state = {
		title: 'xcentz',
		form: ''
	}

	componentDidMount = () => {
		// store.dispatch({
		// 	type: 'API_GET_USER_ADDR_FULFILLED',
		// 	payload: 'payload123123'
		// });
		console.log(store,'store.getState()');
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
export default xcentZ
