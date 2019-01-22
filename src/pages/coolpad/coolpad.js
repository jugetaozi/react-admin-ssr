import React, { Component } from 'react';
import { Menu, Icon, Alert, Tabs, Button, Table } from 'antd';
import styles from './coolpad.less'
import { getNewList, postDate } from "api/keyword";
import PropTypes from 'prop-types';

const TabPane = Tabs.TabPane;
const { SubMenu } = Menu;

class mdcMonitor extends Component {

	state = {
		title: 'coolpad',
		form: ''
	}

	componentDidMount = () => {
		getNewList().then((data) => {
			console.log(data)
			this.setState({
				form: data
			})
		})
		postDate().then((data) => {
			console.log(data)
		})
	}


	render () {
		return (
			<div className="coolpad">
				<div dangerouslySetInnerHTML={{ __html:this.state.form}}></div>
				<Button>sdaf</Button>
				<div className={styles.kk}>{this.state.title}</div>
			</div>
		)
	}
}
export default mdcMonitor
