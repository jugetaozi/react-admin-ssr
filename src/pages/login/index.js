import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import classnames from 'classnames';
import styles from './login.less';
import { login } from 'api/keyword'
import canvasJS from '../../libs/canvasJs/zhihu-like'

const Login = Form.create()(class extends Component {
	state = {
		loginInfo: ''
	}
	handleSubmit = (e) => {
		this.setState({
			loginInfo: ''
		})
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log(values);
				login(values).then(() => {
					this.props.history.push('/')
				}).catch((err) => {
					console.log(err, err.data.message);
					this.setState({
						loginInfo: err.data.message
					})
				})
			}
		});
	}
	componentDidMount = () => {
		console.log('mount');
		canvasJS(window)//加载粒子效果
	}

	render () {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className={styles['login-content']}>
				<canvas id="Mycanvas"></canvas>
				<Form onSubmit={this.handleSubmit} className={classnames(styles['login-form'])}>
					<Form.Item>
						{getFieldDecorator('name', {
							rules: [{ required: true, message: '请输入用户名!' }],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码!' }],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
						)}
					</Form.Item>
					<Form.Item className={styles['bottom-form']} extra={this.state.loginInfo}>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(
							<Checkbox>Remember me</Checkbox>
						)}
						{/* <a className={styles['login-form-forgot']} href="">Forgot password</a> */}
						<Button type="primary" htmlType="submit" className={styles['login-form-button']}>
							Log in
          </Button>
						{/* Or <a href="">register now!</a> */}
					</Form.Item>
				</Form>
			</div>
		);
	}
})

export default Login;
