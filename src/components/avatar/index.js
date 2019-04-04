import React, { Component } from 'react'
import { Avatar, Popover, Button } from 'antd'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './index.less'
import { hashTo, removeStorage } from 'utils/utils'
import config from '~/config.js'
import { connect } from 'react-redux'
import { getUserInfo } from 'store/reducers/getUserInfoReducer'

const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#cccccc']
@connect(
	state => {
		return {
			userInfoReducer: state.getUserInfoReducer,
		}
	},
	{
		getUserInfo,
	}
)
class AvatarInfo extends Component {
	static propTypes = {
		className: PropTypes.string,
	}
	static defaultProps = {}
	constructor(props) {
		super(props)
		this.state = {
			hasAuth: false,
			userName: 'admin',
			color: colorList[0],
		}
	}

	componentDidMount = () => {
		console.log(this.context, 'this.context')
		this.props.getUserInfo() //引起更新
	}

	static getDerivedStateFromProps(nextProps, state) {
		const _UI = nextProps.userInfoReducer.userInfo
		if (_UI && (_UI.level === 0 || _UI.level > 0)) {
			return {
				userName: nextProps.userInfoReducer.userInfo.nick,
				color: colorList[_UI.level],
			}
		} else {
			return null
		}
	}

	onHandleLogout = () => {
		removeStorage('_token')
		hashTo('/login')
	}

	render() {
		const userInfo = this.props.userInfoReducer.userInfo || {
			nick: 'someone',
			email: '',
			level: 4, //0:超级管理员
			role: 4, //0:超级管理员
		}
		const content = (
			<div className={styles['content']}>
				<p>昵称：{userInfo['nick']}</p>
				<p>email：{userInfo['email']}</p>
				<p>
					当前角色：{config.roleNameArr[userInfo['role']]};权限:
					{userInfo['level']}
				</p>
				<Button
					onClick={this.onHandleLogout.bind(this)}
					// type="primary"
					className={styles['logoutBtn']}
					block
				>
					退出登录
				</Button>
			</div>
		)
		return (
			<div
				className={classnames(styles['avatarContent'], this.props.className)}
			>
				<Popover placement="bottomRight" content={content} trigger="hover">
					<Avatar
						className={styles['avatar']}
						style={{ backgroundColor: this.state.color }}
						size="large"
					>
						{this.state.userName}
					</Avatar>
					
				</Popover>
			</div>
		)
	}
}
export default AvatarInfo
