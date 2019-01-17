import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form, Input, Radio, Select, Mention, Icon, TimePicker, Switch} from 'antd';
import './mdcConfigStyle/mdcAddModal.less'

const Option = Select.Option;
const FormItem = Form.Item;
const {toString} = Mention;

const configAddModal = Form.create()(
  class extends React.Component {
    state = {
      visible: false,
      confirmLoading: false,
      timeRange: [null, null]
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
    timeStartChange = (time) => {
      let _temp = this.state.timeRange.concat([])
      _temp[0] = time
      this.setState({timeRange: _temp});
    }
    timeEndChange = (time) => {
      let _temp = this.state.timeRange.concat([])
      _temp[1] = time
      this.setState({timeRange: _temp});
    }

    render() {
      const {form} = this.props;
      const {getFieldDecorator} = form;
      const formItemLayout = {
        labelCol: {
          xs: {span: 24},
          sm: {span: 4},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 20},
        },
      };
      return (
        <div className="configAddModal">
          <Modal title="添加MDC"
                 width="900px"
                 wrapClassName={'mdcAddModalContent'}
                 maskClosable={false}
                 cancelText={'取消'}
                 okText={'确定'}
                 visible={this.props.show}
                 onOk={this.handleOk}
                 confirmLoading={this.state.confirmLoading}
                 onCancel={this.handleCancel}
          >
            <div className="warn"><span style={{color: 'red'}}>* </span>
              在工作时间段内，MDC进程退出后，Daemon重启MDC；在工作时间段外，MDC进程退出后，Daemon不会重启MDC；
            </div>
            <Form>
              <FormItem
                {...formItemLayout}
                label="MDC实例名：">
                {(
                  <Input style={{width: 300}}></Input>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="是否启用：">
                <Switch className="isEnable" checkedChildren="启用" unCheckedChildren="停用" defaultChecked />
              </FormItem>
              <FormItem {...formItemLayout}
                        label="工作时间段：">
                {(<div>
                    <TimePicker
                      style={{width: 140}}
                      placeholder={'start'}
                      value={this.state.timeRange[0]}
                      onChange={this.timeStartChange}
                    />
                    <span style={{color: 'rgba(0,0,0,.25)', margin: '0 10px'}}>至</span>
                    <TimePicker
                      style={{width: 140}}
                      placeholder={'end'}
                      value={this.state.timeRange[1]}
                      onChange={this.timeEndChange}
                    />
                  </div>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="用户名：">
                {(
                  <Input style={{width: 300}}></Input>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="密码：">
                {(
                  <Input style={{width: 300}}></Input>
                )}
              </FormItem>
            </Form>
          </Modal>
        </div>
      );
    }
  }
)

export default configAddModal;