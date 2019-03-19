import React, { Component } from 'react'
import styles from './coolpad.less'
import classnames from 'classnames'
import moment from 'moment'
import { getList, newCustomer } from 'api/keyword'
import { Table, Button, Popconfirm, Alert } from 'antd'
import { connect } from 'react-redux'
import { getUserInfo } from 'store/reducers/userReducer'
import AddModal from './addModal'
import ModifyModal from './modifyModal'
@connect(
	state => ({
		userReducer: state.userReducer,
	}),
	{ getUserInfo }
)
class coolpadList extends Component {
	state = {
		data: [],
		addModalShow: false,
		isDeleteNotEnable: true,
		visible: false,
		modifyMdelShow: false,
		selectedRowKeys: [],
	}

	async componentDidMount() {
		getList().then(res => {
			this.setState({
				data: res.data,
			})
		})
		// const res = await this.props.getUserInfo()
		// newCustomer().then((res) => {
		// })
	}
	addModalShow() {
		this.setState({
			addModalShow: true,
		})
	}

	handleAddModalClose() {
		this.setState({
			addModalShow: false,
		})
	}

	handleModify() {
		this.setState({
			modifyMdelShow: true,
		})
	}
	handleModifyModalClose() {
		this.setState({
			modifyMdelShow: false,
		})
	}

	onSelectChange(changableRowKeys) {
		let newSelectedRowKeys = []
		newSelectedRowKeys = changableRowKeys.filter((key, index) => {
			return true
		})
		let enable = false
		if (newSelectedRowKeys.length) {
			enable = false
		} else {
			enable = true
		}
		this.setState({
			selectedRowKeys: newSelectedRowKeys,
			isDeleteNotEnable: enable,
		})
	}
	onSelection(v, b, n, m) {
		console.log(v, b, n, m, 'onSelection')
	}
	handlePageSizeChange() {
		this.setState({ selectedRowKeys: [], isDeleteNotEnable: true })
	}
	deleteConfirm() {
		console.log('deleteConfirm')
	}
	handleVisibleChange = visible => {
		if (!visible) {
			this.setState({ visible })
			return
		}
		if (this.state.isDeleteNotEnable) {
			this.setState({ visible: false })
		} else {
			this.setState({ visible: true }) // show the popconfirm
		}
	}

	handlePopconfirmCancel = () => {
		this.setState({ visible: false })
	}

	render() {
		const columns = [
			{
				title: 'Asin',
				dataIndex: 'asin',
				align: 'center',
			},
			{
				title: 'review_author',
				align: 'center',
				dataIndex: 'review_author',
			},
			{
				title: 'review_date',
				dataIndex: 'review_date',
				width: 160,
				align: 'center',
				render: text => (
					<span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>
				),
			},
			{
				title: 'review_title',
				dataIndex: 'review_title',
				width: 300,
				align: 'center',
				render: text => <span title={text}>{text}</span>,
			},
			{
				title: <div align="center">review_body</div>,
				dataIndex: 'review_body',
				render: text => <span title={text}>{text}</span>,
				// render: text => <a href={text.url}>{text}</a>,
			},
			{
				title: '操作',
				align: 'center',
				width: 80,
				dataIndex: '',
				key: 'x',
				render: () => (
					<a href="javascript:;" onClick={this.handleModify.bind(this)}>
						修改
					</a>
				),
			},
		]

		const rowSelection = {
			selectedRowKeys: this.state.selectedRowKeys,
			onChange: this.onSelectChange.bind(this),
			hideDefaultSelections: false,
			onSelection: this.onSelection.bind(this),
		}
		// const columns = this.columns.map((col) => {
		// 	if (!col.editable) {
		// 		return col;
		// 	}
		// 	return {
		// 		...col,
		// 		onCell: record => ({
		// 			record,
		// 			editable: col.editable,
		// 			dataIndex: col.dataIndex,
		// 			title: col.title,
		// 			handleSave: this.handleSave,
		// 		}),
		// 	};
		// });
		return (
			<div className={styles['padContent']}>
				<div className={styles['btn-content']}>
					<Button
						type="primary"
						onClick={this.addModalShow.bind(this)}
						style={{ marginBottom: 16, width: 80 }}
					>
						新增
					</Button>
					<Popconfirm
						title="   确定要删除吗？ "
						visible={this.state.visible}
						onCancel={this.handlePopconfirmCancel}
						onVisibleChange={this.handleVisibleChange}
						placement="top"
						onConfirm={this.deleteConfirm}
						okText="确定"
						cancelText="取消"
					>
						<Button
							type="danger"
							disabled={this.state.isDeleteNotEnable}
							style={{ marginBottom: 16, marginLeft: 20, width: 80 }}
						>
							删除
						</Button>
					</Popconfirm>
				</div>
				<div className={styles['table-content']}>
					<Table
						rowSelection={rowSelection}
						pagination={{
							position: 'top',
							showSizeChanger: true,
							size: '',
							showQuickJumper: true,
							defaultCurrent: 1,
							onChange: this.handlePageSizeChange.bind(this),
						}}
						// scroll={{ x: 2000, y: 1000 }}
						rowClassName="table-row"
						className={styles['table']}
						bordered
						size="middle"
						rowKey={(record, index) => `${index}`}
						columns={columns}
						dataSource={this.state.data}
					/>
					<AddModal
						onClose={this.handleAddModalClose.bind(this)}
						show={this.state.addModalShow}
					/>
					<ModifyModal
						onClose={this.handleModifyModalClose.bind(this)}
						show={this.state.modifyMdelShow}
					/>
				</div>
			</div>
		)
	}
}

export default coolpadList
