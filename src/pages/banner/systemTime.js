import React, { Component } from 'react'
import { Table, Button, Popconfirm, Alert } from 'antd'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styles from './index.less'
import moment from 'moment'
import { getSystemTime, establishEvtSource } from 'store/reducers/getSystemInfo'
// import { } from 'utils/utils'
// import { } from 'api/keyword'
// import { } from 'store/reducers/userReducer'

@connect(
	state => {
		return {
			getSystemInfo: state.getSystemInfo,
		}
	},
	{
		getSystemTime,
		establishEvtSource,
	}
)
class SystemTime extends Component {
	// static propTypes = {
	// 	//JS类型  isRequired为必须
	// 	string: PropTypes.string,
	// 	object: PropTypes.object,
	// 	bool: PropTypes.bool,
	// 	array: PropTypes.array.isRequired,
	// 	number: PropTypes.number,
	// 	symbol: PropTypes.symbol,
	// 	func: PropTypes.func.isRequired,
	// 	//指定类型为：任何可以被渲染的元素，包括数字，字符串，react 元素，数组，fragment。
	// 	node: PropTypes.node,
	// 	// 指定类型为：一个react 元素
	// 	reactElement: PropTypes.element,
	// 	//你可以类型为某个类的实例，这里使用JS的instanceOf操作符实现
	// 	optionalMessage: PropTypes.instanceOf(Message),
	// 	// 指定多个类型：你也可以把属性类型限制在某些指定的类型范围内
	// 	optionalUnion: PropTypes.oneOfType([
	// 		PropTypes.string,
	// 		PropTypes.number,
	// 		PropTypes.instanceOf(Message),
	// 	]),
	// 	// 指定某个类型的数组
	// 	optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
	// 	// 指定类型为对象，且对象属性值是特定的类型
	// 	optionalObjectOf: PropTypes.objectOf(PropTypes.number),
	// }
	// static defaultProps = {}
	constructor(props) {
		super(props)
		this.state = {}
	}

	componentDidMount = () => {}
	// getSnapshotBeforeUpdate = (prevProps, prevState) => {}
	// componentDidUpdate(e1, e2) {
	// 	console.log(this.props, '更新啦更新啦')
	// }

	static getDerivedStateFromProps(props, state) {
		return null
	}

	render() {
		const systemInfo = this.props.getSystemInfo || {
			systemTime: '2019-04-01 15:20:20',
			evtSourceExist: false,
			evtSource: null,
		}
		return (
			<div>
				<div className={styles['serverTime']}>Server Time ：</div>
				<div className={styles['systemTime']}>
					{moment(systemInfo['systemTime']).format('YYYY-MM-DD HH:mm:ss')}
				</div>
			</div>
		)
	}
}
export default SystemTime
