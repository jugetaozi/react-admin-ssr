import React, { Component } from 'react'
import styles from './coolpad.less'
import classnames from 'classnames'
import moment from 'moment'
import { getList, newCustomer, getJiJinChiCang } from 'api/keyword'
import { Table, Button, Popconfirm, Alert } from 'antd'
import { connect } from 'react-redux'
// import { getUserInfo } from 'store/reducers/userReducer'
import GuPiaoList from './guPiaoList'
import AddModal from './addModal'
import ModifyModal from './modifyModal'
import axios from 'axios'

import {
	G2,
	Chart,
	Geom,
	Axis,
	Tooltip,
	Coord,
	Label,
	Legend,
	View,
	Guide,
	Shape,
	Facet,
	Util,
	Animate,
} from 'bizcharts'
import DataSet from '@antv/data-set'
@connect(
	state => ({
		userReducer: state.userReducer,
	})
	// { getUserInfo }
)
class coolpadList extends Component {
	state = {
		data: [],
		addModalShow: false,
		isDeleteNotEnable: true,
		visible: false,
		modifyMdelShow: false,
		selectedRowKeys: [],
		dv: null,
		data2: [
			{
				label: 'Monday',
				series1: 2800,
				series2: 2260,
			},
			{
				label: 'Tuesday',
				series1: 1800,
				series2: 1300,
			},
			{
				label: 'Wednesday',
				series1: 950,
				series2: 900,
			},
			{
				label: 'Thursday',
				series1: 500,
				series2: 390,
			},
			{
				label: 'Friday',
				series1: 170,
				series2: 100,
			},
		],
		bingtudata: [
			{
				item: '事例一',
				count: 40,
			},
			{
				item: '事例二',
				count: 21,
			},
			{
				item: '事例三',
				count: 17,
			},
			{
				item: '事例四',
				count: 13,
			},
			{
				item: '事例五',
				count: 9,
			},
		],
		gpInfo: [],
	}

	async componentDidMount() {
		// new Promise((resolve, reject) => {
		// 	axios.get(
		// 			'https://api.doctorxiong.club/v1/fund/position?code=513050')
		// 		.then(res => {
		// 			console.log(res, 'res')
		// 			resolve(res.data)
		// 		})
		// 		.catch(err => {
		// 			console.log(err, '失败')
		// 			reject(err)
		// 		})
		// }).then((res) => {
		// 	console.log('red',res);
		// })
		await getJiJinChiCang().then(res => {
			// console.log(res.data.stockList)
			let _arr = []
			let _tempStr = 0
			let gpInfo = []
			res.data.stockList.forEach(item => {
				let _obj = {}
				gpInfo.push({
					gpCode: item[0].split('.')[0].toLowerCase(),
					gpMarket: item[0].split('.')[1].toUpperCase(),
					chiCangPercent: item[2],
				})
				//港美股判断
				if (item[0].split('.')[1] === 'US') {
				} else if (item[0].split('.')[1] === 'HK') {
				}
				_obj.item = item[1]
				_obj.count = Number(item[2].replace('%', ''))
				_tempStr += Number(item[2].replace('%', ''))
				_arr.push(_obj)
			})
			// console.log(100 - _tempStr, _arr, gpInfo)
			if (_tempStr < 100) {
				_arr.push({
					item: '其他',
					count: 100 - _tempStr,
				})
			}
			const ds = new DataSet().createView()
			const dvTr = ds.source(this.state.data2)
			dvTr.transform({
				type: 'fold',
				fields: ['series1', 'series2'],
				// 展开字段集
				key: 'type',
				// key字段
				value: 'value', // value字段
			})
			this.setState({
				dv: dvTr,
				data2: _arr,
				bingtudata: _arr,
				gpInfo,
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
		if (this.chart1) {
			this.chart1.forceFit()
			//解决宽度超出容易问题
		}
		const { DataView } = DataSet
		const bingtuDV = new DataView()
		bingtuDV.source(this.state.bingtudata).transform({
			type: 'percent',
			field: 'count',
			dimension: 'item',
			as: 'percent',
		})
		const cols = {
			percent: {
				formatter: val => {
					val = val * 100 + '%'
					return val
				},
			},
		}

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
				{/* <div className={styles['btn-content']}>
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
				</div> */}
				<div className={styles['table-content']}>
					<GuPiaoList gpInfo={this.state.gpInfo} />
					{/* <Table
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
					/> */}
					{/* 饼图 */}
					<Chart
						height={window.innerHeight / 2}
						data={bingtuDV}
						scale={cols}
						padding={[80, 200, 80, 80]}
						forceFit
					>
						<Coord type="theta" radius={0.75} />
						<Axis name="percent" />
						<Legend position="right" offsetY={-100} />
						<Tooltip
							showTitle={false}
							itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
						/>
						<Geom
							type="intervalStack"
							position="percent"
							color="item"
							tooltip={[
								'item*percent',
								(item, percent) => {
									percent = percent * 100 + '%'
									return {
										name: item,
										value: percent,
									}
								},
							]}
							style={{
								lineWidth: 1,
								stroke: '#fff',
							}}
						>
							<Label
								content="percent"
								offset={-40}
								textStyle={{
									textAlign: 'center',
									shadowBlur: 2,
									shadowColor: 'rgba(0, 0, 0, .45)',
								}}
							/>
						</Geom>
					</Chart>

					{/* 柱状图 */}
					<h3 className={styles['title']}>柱状图</h3>
					<Chart
						height={400}
						data={this.state.dv}
						onGetG2Instance={chart => {
							this.chart1 = chart
						}}
						forceFit
					>
						<Legend />
						<Coord transpose scale={[1, -1]} />
						<Axis
							name="label"
							label={{
								offset: 12,
							}}
						/>
						<Axis name="value" position={'right'} />
						<Tooltip />
						<Geom
							type="interval"
							position="label*value"
							color={'type'}
							adjust={[
								{
									type: 'dodge',
									marginRatio: 1 / 32,
								},
							]}
						/>
					</Chart>
				</div>
			</div>
		)
	}
}

export default coolpadList
