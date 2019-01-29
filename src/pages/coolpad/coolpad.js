import React, { Component } from 'react';
import styles from './coolpad.less'
import { getList } from 'api/keyword'
import { Table } from 'antd';

class coolpadList extends Component {
	state = {
		data: [],
	}

	componentDidMount () {
		getList().then((res) => {
			this.setState({
				data: res.data,
			});
		})
	}

	render () {
		const columns = [{
			title: 'asin',
			dataIndex: 'asin',
		}, {
			title: 'title',
			dataIndex: 'title',
		}, {
			title: 'author',
			dataIndex: 'author',
		}, {
			title: 'review',
			dataIndex: 'review',
		}, {
			title: 'url',
			dataIndex: 'url',
			render: text => <a href={text.url}>{text}</a>,
		}];
		return (
			<Table rowKey={(record, index) => `${record.reviewDate + index}`} columns={columns} dataSource={this.state.data} />
		)
	}
}

export default coolpadList
