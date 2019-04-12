import React, { Component } from 'react'
import { Table, Button, Popconfirm, Alert } from 'antd'
import classnames from 'classnames'
import PropTypes from 'prop-types'
// import styles from './index.less'
// import { } from 'utils/utils'
// import { } from 'api/keyword'
// import { } from 'store/reducers/userReducer'

class Controlled extends Component {
	static propTypes = {}
	static defaultProps = {}
	constructor(props) {
		super(props)
		this.state = {
			hasAuth: false,
			inputValue: '',
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
	inputChange(e) {
		this.setState({
			inputValue: e.target.value,
		})
	}

	render() {
		return (
			<div>
				<label>受控组件: </label>
				<input
					value={this.state.inputValue}
					onChange={this.inputChange.bind(this)}
				/>
				<i>this.state.value: {this.state.inputValue}</i>
			</div>
		)
	}
}
export default Controlled
