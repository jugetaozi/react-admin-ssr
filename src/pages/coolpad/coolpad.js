import React, { Component } from 'react';
import styles from './coolpad.less'
import { getList, newCustomer } from 'api/keyword'
import { Table } from 'antd';
import { connect } from 'react-redux'
import { getUserInfo } from 'store/reducers/userReducer';

@connect(
	state => ({
		userReducer: state.userReducer
	}),
	{ getUserInfo }
)
class coolpadList extends Component {
	state = {
		data: [],
	}

	async componentDidMount () {
		// getList().then((res) => {
		// 	this.setState({
		// 		data: res.data,
		// 	});
		// })
		const res = await this.props.getUserInfo()
		console.log(res, 'res');
		console.log(this.props, 'this.props');
		// newCustomer().then((res) => {
		// })
	}

	render () {
		const columns = [{
			title: 'asin',
			dataIndex: 'asin',
		}, {
			title: 'review_author',
			dataIndex: 'review_author',
		}, {
			title: 'review_data',
			dataIndex: 'review_data',
		}, {
			title: 'review_title',
			dataIndex: 'review_title',
		}, {
			title: 'review_body',
			dataIndex: 'review_body',
			// render: text => <a href={text.url}>{text}</a>,
		}];
		return (
			<div>
				{/* <p>{this.props.userReducer}</p> */}
				<Table rowKey={(record, index) => `${record.review_data + record.review_body + index}`} columns={columns} dataSource={this.state.data} />
			</div>
		)
	}
}

export default coolpadList
