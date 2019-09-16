import React, { Component } from 'react'
import {
	Form,
	Select,
	InputNumber,
	TreeSelect,
	Table,
	Button,
	DatePicker,
} from 'antd'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './lottery.less'
// import { } from 'utils/utils'
import { queryLotteryData } from 'api/keyword'
import moment from 'moment'
// import { } from 'store/reducers/userReducer'
const { Option } = Select
const { SHOW_PARENT } = TreeSelect
const { MonthPicker, RangePicker, WeekPicker } = DatePicker

const treeData = [
	{
		title: 'blue',
		value: 'blue',
		key: '0-0',
		children: [
			{
				title: 'blue',
				value: 'blue',
				key: '0-0-0',
			},
		],
	},
	{
		title: 'red',
		value: 'red',
		key: '0-1',
		children: [
			{
				title: 'red1',
				value: 'red1',
				key: '0-1-1',
			},
			{
				title: 'red2',
				value: 'red2',
				key: '0-1-2',
			},
			{
				title: 'red3',
				value: 'red3',
				key: '0-1-3',
			},
			{
				title: 'red4',
				value: 'red4',
				key: '0-1-4',
			},
			{
				title: 'red5',
				value: 'red5',
				key: '0-1-5',
			},
			{
				title: 'red6',
				value: 'red6',
				key: '0-1-6',
			},
		],
	},
]
const Lottery = Form.create()(
	@connect(
		state => ({}), //mapStateToProps
		{} //mapDispatchToProps
	)
	class extends Component {
		static propTypes = {
			//JS类型  isRequired为必须
			// string: PropTypes.string,
			// object: PropTypes.object,
			// bool: PropTypes.bool,
			// array: PropTypes.array.isRequired,
			// number: PropTypes.number,
			// symbol: PropTypes.symbol,
			// func: PropTypes.func.isRequired,
			// //指定类型为：任何可以被渲染的元素，包括数字，字符串，react 元素，数组，fragment。
			// node: PropTypes.node,
			// // 指定类型为：一个react 元素
			// reactElement: PropTypes.element,
			// //你可以类型为某个类的实例，这里使用JS的instanceOf操作符实现
			// optionalMessage: PropTypes.instanceOf(Message),
			// // 指定多个类型：你也可以把属性类型限制在某些指定的类型范围内
			// optionalUnion: PropTypes.oneOfType([
			// 	PropTypes.string,
			// 	PropTypes.number,
			// 	PropTypes.instanceOf(Message),
			// ]),
			// // 指定某个类型的数组
			// optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
			// // 指定类型为对象，且对象属性值是特定的类型
			// optionalObjectOf: PropTypes.objectOf(PropTypes.number),
		}
		static defaultProps = {}
		constructor(props) {
			super(props)
			this.state = {
				selcetList: [],
				red1Disabled: true,
				red2Disabled: true,
				red3Disabled: true,
				red4Disabled: true,
				red5Disabled: true,
				red6Disabled: true,
				blueDisabled: true,
				data: [],
				isDeleteNotEnable: true,
				visible: false,
				selectedRowKeys: [],
			}
		}

		componentDidMount = () => {}
		// getSnapshotBeforeUpdate = (prevProps, prevState) => {}
		// componentDidUpdate(e1, e2) {
		// 	console.log(this.props, '更新啦更新啦')
		// }

		static getDerivedStateFromProps(props, state) {
			return null
		}

		handleSubmit = e => {
			e.preventDefault()
			this.props.form.validateFields((err, values) => {
				if (!values['selectlist'] || !values['selectlist'].length) {
					return
				}
				if (!err) {
					let _obj = {}
					let _temp = values['selectlist'].concat([])
					_temp.indexOf('red') >= 0 &&
						_temp.splice(
							_temp.indexOf('red'),
							1,
							'red1',
							'red2',
							'red3',
							'red4',
							'red5',
							'red6'
						)
					_temp.forEach(k => {
						_obj[k] = values[k]
					})

					if (values.dateRange && values.dateRange.length === 2) {
						_obj['dateRange'] = [
							moment(values.dateRange[0]).format('YYYY-MM-DD'),
							moment(values.dateRange[1]).format('YYYY-MM-DD'),
						]
						console.log('moment(values.dateRange[1]).format()', _obj)
					}
					queryLotteryData(_obj)
						.then(dataObj => {
							this.setState({ data: dataObj.data })
						})
						.catch(err => {
							alert(err)
						})
					console.log('Received values of form: ', _obj)
				}
			})
		}

		handleDateRangeChange = (date, dateString) => {
			console.log(date, dateString, 'date, dateString')
		}

		handlePageSizeChange() {
			this.setState({ selectedRowKeys: [], isDeleteNotEnable: true })
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

		onChange = value => {
			console.log('onChange ', value)
			const resetList = []
			resetList.push('red1', 'red2', 'red3', 'red4', 'red5', 'red6', 'blue')
			this.props.form.resetFields(resetList)

			value.indexOf('red') >= 0
				? this.setState({
						selcetList: value,
						blueDisabled: value.indexOf('blue') >= 0 ? false : true,
						red1Disabled: false,
						red2Disabled: false,
						red3Disabled: false,
						red4Disabled: false,
						red5Disabled: false,
						red6Disabled: false,
				  })
				: this.setState({
						selcetList: value,
						blueDisabled: value.indexOf('blue') >= 0 ? false : true,
						red1Disabled: value.indexOf('red1') >= 0 ? false : true,
						red2Disabled: value.indexOf('red2') >= 0 ? false : true,
						red3Disabled: value.indexOf('red3') >= 0 ? false : true,
						red4Disabled: value.indexOf('red4') >= 0 ? false : true,
						red5Disabled: value.indexOf('red5') >= 0 ? false : true,
						red6Disabled: value.indexOf('red6') >= 0 ? false : true,
				  })
		}

		render() {
			const columns = [
				{
					title: 'date',
					dataIndex: 'date',
					key: '1',
					align: 'center',
				},
				{
					title: 'red1',
					align: 'center',
					key: '2',
					dataIndex: 'red1',
				},
				{
					title: 'red2',
					align: 'center',
					key: '3',
					dataIndex: 'red3',
				},
				{
					title: 'red3',
					align: 'center',
					key: '4',
					dataIndex: 'red3',
				},
				{
					title: 'red4',
					align: 'center',
					key: '5',
					dataIndex: 'red4',
				},
				{
					title: 'red5',
					align: 'center',
					key: '6',
					dataIndex: 'red5',
				},
				{
					title: 'red6',
					align: 'center',
					key: '7',
					dataIndex: 'red6',
				},
				{
					title: 'blue',
					align: 'center',
					key: 'dateNumber',
					dataIndex: 'blue',
				},
			]
			const rowSelection = {
				selectedRowKeys: this.state.selectedRowKeys,
				onChange: this.onSelectChange.bind(this),
				hideDefaultSelections: false,
				onSelection: this.onSelection.bind(this),
			}
			const { getFieldDecorator } = this.props.form
			const formItemLayout = {
				labelCol: { span: 6 },
				wrapperCol: { span: 18 },
				layout: 'inline',
			}
			const tProps = {
				treeData,
				selcetList: this.state.selcetList,
				onChange: this.onChange,
				treeCheckable: true,
				showCheckedStrategy: SHOW_PARENT,
				searchPlaceholder: 'Please select',
				style: {
					width: 300,
				},
			}
			const {
				red1Disabled,
				red2Disabled,
				red3Disabled,
				red4Disabled,
				red5Disabled,
				red6Disabled,
				blueDisabled,
			} = this.state
			return (
				<div className={styles['lotteryContent']}>
					<Form {...formItemLayout} onSubmit={this.handleSubmit}>
						<Form.Item label="日期范围">
							{getFieldDecorator('dateRange')(
								<RangePicker onChange={this.handleDateRangeChange.bind(this)} />
							)}
						</Form.Item>
						<Form.Item label="selectList">
							{getFieldDecorator('selectlist')(<TreeSelect {...tProps} />)}
						</Form.Item>
						<br />
						<Form.Item label="red1">
							{getFieldDecorator('red1')(
								<InputNumber disabled={red1Disabled} min={1} max={33} />
							)}
							{/* <span className="ant-form-text"> red1</span> */}
						</Form.Item>
						<Form.Item label="red2">
							{getFieldDecorator('red2')(
								<InputNumber disabled={red2Disabled} min={1} max={33} />
							)}
							{/* <span className="ant-form-text"> red2</span> */}
						</Form.Item>
						<Form.Item label="red3">
							{getFieldDecorator('red3')(
								<InputNumber disabled={red3Disabled} min={1} max={33} />
							)}
							{/* <span className="ant-form-text"> red3</span> */}
						</Form.Item>
						<br />
						<Form.Item label="red4">
							{getFieldDecorator('red4')(
								<InputNumber disabled={red4Disabled} min={1} max={33} />
							)}
							{/* <span className="ant-form-text"> red4</span> */}
						</Form.Item>
						<Form.Item label="red5">
							{getFieldDecorator('red5')(
								<InputNumber disabled={red5Disabled} min={1} max={33} />
							)}
							{/* <span className="ant-form-text"> red5</span> */}
						</Form.Item>
						<Form.Item label="red6">
							{getFieldDecorator('red6')(
								<InputNumber disabled={red6Disabled} min={1} max={33} />
							)}
							{/* <span className="ant-form-text"> red6</span> */}
						</Form.Item>
						<Form.Item label="blue">
							{getFieldDecorator('blue')(
								<InputNumber disabled={blueDisabled} min={1} max={16} />
							)}
							{/* <span className="ant-form-text"> blue</span> */}
						</Form.Item>
						<Form.Item wrapperCol={{ span: 12, offset: 6 }}>
							<Button type="primary" htmlType="submit">
								查询
							</Button>
						</Form.Item>
					</Form>
					<div>共计{this.state.data.length}条数据</div>
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
					</div>
				</div>
			)
		}
	}
)
export default Lottery
