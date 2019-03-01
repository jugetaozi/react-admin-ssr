import React, { Component } from 'react';
import { Modal, Form, Input, TimePicker, Switch } from 'antd';
import styles from "./addModal.less";


const FormItem = Form.Item;

const addModal = Form.create()(
	class extends React.Component {
		state = {
			visible: false,
			confirmLoading: false,
		}

		handleOk = () => {
			this.setState({
				confirmLoading: true
			});
			setTimeout(() => {
				this.setState({
					visible: false,
					confirmLoading: false,
				});
				this.props.onClose(false)
			}, 2000);
		}

		handleCancel = () => {
			console.log('Clicked cancel button');
			this.setState({
				visible: false,
			});
			this.props.onClose(false)
		}

		render () {
			const { form } = this.props;
			const { getFieldDecorator } = form;
			const formItemLayout = {
				labelCol: {
					xs: { span: 24 },
					sm: { span: 4 },
				},
				wrapperCol: {
					xs: { span: 24 },
					sm: { span: 20 },
				},
			};
			return (
				<div className="addModal">
					<Modal title="添加信息"
						width="900px"
						wrapClassName={'addModalContent'}
						maskClosable={false}
						cancelText={'取消'}
						okText={'确定'}
						visible={this.props.show}
						onOk={this.handleOk}
						confirmLoading={this.state.confirmLoading}
						onCancel={this.handleCancel}
					>
						{/* <div className="warn"><span style={{ color: 'red' }}>* </span>
							提示提示提示提示提示提示提示提示提示提示
            </div> */}
						<Form>
							<FormItem
								{...formItemLayout}
								label="用户名：">
								{(
									<Input style={{ width: 300 }}></Input>
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="宇龙编码">
								{(
									<Input style={{ width: 300 }}></Input>
								)}
							</FormItem>
							<FormItem
								{...formItemLayout}
								label="ASIN：">
								{(
									<Input style={{ width: 300 }}></Input>
								)}
							</FormItem>
						</Form>
					</Modal>
				</div>
			);
		}
	}
)

export default addModal;