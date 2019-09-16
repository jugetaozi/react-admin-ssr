import React, { Component } from 'react'
import { Menu, Icon, Tabs, Button, Upload, message } from 'antd'
import classnames from 'classnames'
import styles from './charts.less'
import { getList, newCustomer } from 'api/keyword'
import store from 'store/store'
import { open, getFileType } from 'utils/utils'
import { connect } from 'react-redux'

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
@connect(state => {
	return {
		getSystemInfo: state.getSystemInfo,
	}
})
class charts extends Component {
	constructor(props) {
		super(props)
		this.state = {
			dataDV: new DataSet().createView(),
			websocketMsg: '',
			fileList: [],
			uploading: false,
			data: [
				{
					month: '2019-01-01',
					acc: 84.0,
				},
				{
					month: '2019-02-01',
					acc: 14.9,
				},
				{
					month: '2019-03-01',
					acc: 17.0,
				},
				{
					month: '2019-04-01',
					acc: 20.2,
				},
				{
					month: '2019-05-01',
					acc: 55.6,
				},
				{
					month: '2019-06-01',
					acc: 56.7,
				},
				{
					month: '2019-07-01',
					acc: 30.6,
				},
				{
					month: '2019-08-01',
					acc: 63.2,
				},
				{
					month: '2019-09-01',
					acc: 24.6,
				},
				{
					month: '2019-10-01',
					acc: 14.0,
				},
				{
					month: '2019-11-01',
					acc: 9.4,
				},
				{
					month: '2019-12-01',
					acc: 6.3,
				},
			],
			cols: {
				month: {
					alias: '月份',
				},
				acc: {
					alias: '销量',
				},
			},
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
			dv: null,
		}
	}

	componentDidMount = async () => {
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
		})
		getList().then(res => {
			this.setState({
				listData: res.data,
			})
		})
	}
	render() {
		if (this.chart1 || this.chart2 || this.chart3 || this.chart4) {
			this.chart1.forceFit()
			this.chart2.forceFit()
			this.chart3.forceFit()
			this.chart4.forceFit()
			//解决宽度超出容易问题
		}
		const { chartData } = this.props.getSystemInfo.websocketMsg || {
			chartData: '',
		}
		return (
			<div className={styles['charts_content']}>
				<h3 className={styles['title']}>渐变色折线图</h3>
				<Chart
					height={400}
					data={chartData}
					onGetG2Instance={chart => {
						this.chart1 = chart
					}}
					scale={this.state.cols}
					forceFit
				>
					<Axis
						name="time"
						title={null}
						tickLine={null}
						line={{
							stroke: '#E6E6E6',
						}}
					/>
					<Axis
						name="number"
						line={false}
						tickLine={null}
						grid={null}
						title={null}
					/>
					<Tooltip />
					<Geom
						type="line"
						position="time*number"
						size={1}
						color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1) 1:rgba(215, 0, 255, 1)"
						shape="smooth"
						style={{
							shadowColor: 'l (270) 0:rgba(21, 146, 255, 0)',
							shadowBlur: 60,
							shadowOffsetY: 6,
						}}
						animate={{
							update: {
								animation: 'delayScaleInX',
							},
						}}
					/>
				</Chart>
				<h3 className={styles['title']}>柱状图</h3>
				<Chart
					height={400}
					data={this.state.dv}
					onGetG2Instance={chart => {
						this.chart2 = chart
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
				<h3 className={styles['title']}>柱状图</h3>
				<Chart
					height={400}
					data={this.state.dv}
					onGetG2Instance={chart => {
						this.chart3 = chart
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
				<h3 className={styles['title']}>柱状图</h3>
				<Chart
					height={400}
					data={this.state.dv}
					onGetG2Instance={chart => {
						this.chart4 = chart
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
		)
	}
}
export default charts
