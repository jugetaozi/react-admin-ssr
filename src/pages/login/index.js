import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './login.less'
import canvasJS from '../../libs/canvasJs/zhihu-like'
import { login } from 'api/keyword'
import { aesEncrypt } from '../../utils/crypto'
import { removeStorage } from '../../utils/utils'
import { connect } from 'react-redux'
import { changeUserInfo } from 'store/reducers/getUserInfoReducer'

const Login = Form.create()(
	@connect(
		state => ({
			getUserInfoReducer: state.getUserInfoReducer,
		}),
		{ changeUserInfo }
	)
	class extends Component {
		static propTypes = {
			form: PropTypes.object.isRequired,
		}
		state = {
			loginInfo: '',
		}
		handleSubmit = async e => {
			this.setState({
				loginInfo: '',
			})
			e.preventDefault()
			this.props.form.validateFields((err, values) => {
				if (!err) {
					//本地加密
					values.name = aesEncrypt(values.name)
					values.password = aesEncrypt(values.password)
					login(values)
						.then(res => {
							if (res.data && res.data.token) {
								//如果有data token 则存到本地localStorage
								removeStorage('_token')
								if (values.remember) {
									//存进session
									window.localStorage.setItem('_token', res.data.token)
								} else {
									//存进localStorage
									window.sessionStorage.setItem('_token', res.data.token)
								}
							}
							this.props.changeUserInfo(res.data.userInfo)
							this.props.history.push('/')
						})
						.catch(err => {
							console.log(err, err.data.message)
							this.setState({
								loginInfo: err.data.message,
							})
						})
				}
			})
		}
		componentDidMount = () => {
			canvasJS(window) //加载粒子效果
		}

		render() {
			const { getFieldDecorator } = this.props.form
			return (
				<div className={styles['login-content']}>
					<canvas id="Mycanvas" />
					<Form
						onSubmit={this.handleSubmit}
						className={classnames(styles['login-form'])}
					>
						<Form.Item>
							{getFieldDecorator('name', {
								rules: [{ required: true, message: '请输入用户名!' }],
							})(
								<Input
									prefix={
										<Icon
											type="user"
											style={{ color: 'rgba(0,0,0,.25)' }}
										/>
									}
									autocomplete="on"
									placeholder="Username"
								/>
							)}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('password', {
								rules: [{ required: true, message: '请输入密码!' }],
							})(
								<Input
									prefix={
										<Icon
											type="lock"
											style={{ color: 'rgba(0,0,0,.25)' }}
										/>
									}
									autocomplete="current-password"
									type="password"
									placeholder="Password"
								/>
							)}
						</Form.Item>
						<Form.Item
							className={styles['bottom-form']}
							extra={this.state.loginInfo}
						>
							{getFieldDecorator('remember', {
								valuePropName: 'checked',
								initialValue: true,
							})(<Checkbox>Remember me</Checkbox>)}
							{/* <a className={styles['login-form-forgot']} href="">Forgot password</a> */}
							<Button
								type="primary"
								htmlType="submit"
								className={styles['login-form-button']}
							>
								Log in
							</Button>
							{/* Or <a href="">register now!</a> */}
						</Form.Item>
					</Form>
				</div>
			)
		}
	}
)

export default Login
