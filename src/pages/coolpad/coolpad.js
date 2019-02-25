import React, { Component } from 'react';
import styles from './coolpad.less'
import { getList, newCustomer} from 'api/keyword'
import { Table } from 'antd';

class coolpadList extends Component {
	state = {
		data: [],
	}

	componentDidMount () {
		// getList().then((res) => {
		// 	this.setState({
		// 		data: res.data,
		// 	});
		// })
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
			<Table rowKey={(record, index) => `${record.review_data + record.review_body+ index}`} columns={columns} dataSource={this.state.data} />
		)
	}
}

export default coolpadList
