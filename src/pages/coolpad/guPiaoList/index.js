import React, { Component } from 'react'
import { Modal, Form, Table, Divider, Tag } from 'antd'
import { getGPinfo } from 'api/keyword'
import styles from './guPiaoList.less'
import axios from 'axios'

const FormItem = Form.Item

const guPiaoList = Form.create()(
	class extends React.Component {
		state = {
			data: [],
			addGroupResponseFlag: false,
		}

		async componentDidMount() {
			console.log(this.props, 'this.props componentDidMount')
			await get().then(res => {})
		}
		async componentDidUpdate() {
			console.log(this.props, 'this.props.componentDidUpdate')
			if (this.state.addGroupResponseFlag) {
				return
			}
			await getGPinfo({
				gpList: this.props.gpInfo,
			}).then(res => {
				let GP_Arr = res.data.split(';')
				let _Arr = []
				GP_Arr.forEach((item, k) => {
					let index = item.indexOf('="')
					if (index !== -1) {
						//过滤空元素
						let _arr = item.slice(index + 2, -1).split(',')
						console.log(_arr)
						let _zdmArr
						if (item.indexOf('hq_str_hk') > -1) {
							//港股
							_arr.push('HK')
							_zdmArr = [
								'name', //0
								'securityName', //1
								'openingPrice', //2
								'yesterdayClosingPrice', //3
								'topPrice', //4
								'lowestPrice', //5
								'price', //6
								'priceChange', //7
								'percentChange', //8
								'aaa', //9
								'aaa', //10
								'aaa', //11
								'vol', //12
								'pe', //13
								'aaa', //14
								'52weekCeilPrice', //15
								'52weekFloorPrice', //16
								'date', //17
								'time', //18
								'market',
							]
						} else if (item.indexOf('hq_str_gb') > -1) {
							//美股
							_arr.push('US')
							_zdmArr = [
								'securityName', //0
								'price', //1
								'percentChange', //2
								'time', //3
								'priceChange', //4
								'openingPrice', //5
								'topPrice', //6
								'lowestPrice', //7
								'52weekCeilPrice', //8
								'52weekFloorPrice', //9
								'vol', //10
								'10dayAverage', //11
								'marketValue', //12
								'earnings', //13
								'pe', //14
								'aaa', //15
								'aaa', //16
								'aaa', //17
								'aaa', //18
								'aaa', //19
								'aaa', //20
								'panClosingPrice', //21  盘前价格
								'panPercentChange', //22   盘前涨跌幅
								'panPriceChange', //23   盘前涨跌值
								'aaa', //24
								'aaa', //25
								'yesterdayClosingPrice', //26  昨日收盘价
								'aaa', //27
								'aaa', //28
								'aaa', //29
								'aaa', //30
								'market',
							]
						}
						let _obj = {}
						_zdmArr.forEach((item, index) => {
							_obj[item] = _arr[index]
						})
						_Arr.push(_obj)
					}
				})

				// 0: "����Ͱ�"  //证券名称
				// 1: "270.1100"    //当前价
				// 2: "-0.23"       //涨跌幅
				// 3: "2020-11-24 20:02:39" //数据时间
				// 4: "-0.6300"    //涨跌值
				// 5: "274.7500"   //今日开盘价
				// 6: "275.7300"   //今日最高价
				// 7: "266.4110"   //今日最低价
				// 8: "319.3200"   //52周最高
				// 9: "169.9500"   //52周最低
				// 10: "18968620"  //成交量
				// 11: "28376768"  //10日均量
				// 12: "730819502026" //市值
				// 13: "7.02"    //每股收益
				// 14: "38.480000" //市盈率
				// 15: "0.00"
				// 16: "0.00"
				// 17: "0.00"
				// 18: "0.00"
				// 19: "2705636600"
				// 20: "40"
				// 21: "275.7000"   //盘前实时价格
				// 22: "2.07"       //盘前实时涨跌幅
				// 23: "5.59"       //盘前实时涨跌值
				// 24: "Nov 24 07:02AM EST"  //美东时间
				// 25: "Nov 23 04:01PM EST"  //美东时间
				// 26: "270.7400"
				// 27: "182320"
				// 28: "1"
				// 29: "2020"
				// 30: "5140460000.000000"
				console.log(_Arr)
				this.setState({
					data: _Arr,
					addGroupResponseFlag: true,
				})
			})
		}

		handleOk = () => {}

		handleCancel = () => {}

		render() {
			const textChuli = function(text) {
				if (+text > 0) {
					return <span className={styles['redColor']}>{text}</span>
				} else if (+text === 0) {
					return <span className={styles['grayColor']}>0</span>
				} else {
					return <span className={styles['greenColor']}>{text}</span>
				}
			}
			const columns = [
				{
					title: '证券名称',
					dataIndex: 'securityName',
					key: 'securityName',
				},
				{
					title: '交易所',
					dataIndex: 'market',
					key: 'market',
				},
				{
					title: '昨日收盘价',
					dataIndex: 'yesterdayClosingPrice',
					key: 'yesterdayClosingPrice',
				},
				{
					title: '今日价格',
					dataIndex: 'price',
					key: 'price',
				},
				{
					title: '涨跌值',
					dataIndex: 'priceChange',
					key: 'priceChange',
					render: (text, record) => textChuli(text),
				},
				{
					title: '涨跌幅',
					dataIndex: 'percentChange',
					key: 'percentChange',
					render: (text, record) => textChuli(text),
				},
				{
					title: '权重涨幅1',
					key: 'quanzhongzhangfu1',
					render: (text, record) => {
						// if (+text > 0) {
						// 	return <span style={{ 'color': 'red','fontSize':'18','fontWeight':'bolder'}}>{text}</span>
						// } else {
						// 	return <span style={{ 'color': 'green','fontSize':'18','fontWeight':'bolder'}}>{text}</span>
						// }
					},
				},
				{
					title: '实时价格/盘前盘后',
					dataIndex: 'panClosingPrice',
					key: 'panClosingPrice',
				},
				{
					title: '盘前/后涨跌值',
					dataIndex: 'panPriceChange',
					key: 'panPriceChange',
					render: (text, record) => textChuli(text),
				},
				{
					title: '盘前/后涨跌幅',
					dataIndex: 'panPercentChange',
					key: 'panPercentChange',
					render: (text, record) => textChuli(text),
				},
				{
					title: '权重涨幅2',
					key: 'quanzhongzhangfu2',
				},
			]
			return (
				<div className={styles['guPiaoListContent']}>
					<Table columns={columns} dataSource={this.state.data} />
				</div>
			)
		}
	}
)

export default guPiaoList
