import React, {Component} from 'react';
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  Input,
  Radio,
  Select,
  Mention,
  Icon,
  TimePicker,
  Switch
} from 'antd';
import './mdcConfigStyle/srcAddModal.less'

const Option = Select.Option;
const FormItem = Form.Item;
const {toString} = Mention;


const srcAddModal = Form.create()(
  class extends React.Component {
    state = {
      visible: false,
      confirmLoading: false,
      currency: 'rmb',
      fileInput: '',
      fileList: [],
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

    configListAdd = (e) => {
      // if (this.state.fileInput.trim()) {
      //   let _temp = this.state.fileList.concat([])
      //   _temp.push(this.state.fileInput)
      //   this.setState({
      //     /*方法一：推荐使用*/
      //     fileList: _temp
      //   });
      // }
    }
    configListDelete = (index) => {
      // let _temp = this.state.fileList.concat([])
      // _temp.splice(index, 1)
      // this.setState({
      //   /*方法一：推荐使用*/
      //   fileList: _temp
      // });
    }
    fileInputChange = (e) => {
      this.setState({
        /*方法一：推荐使用*/
        fileInput: this.refs.myInput.input.value
      });
    }
    fileListAdd = (e) => {
      if (this.state.fileInput.trim()) {
        let _temp = this.state.fileList.concat([])
        _temp.push(this.state.fileInput)
        this.setState({
          /*方法一：推荐使用*/
          fileList: _temp
        });
      }
    }
    fileListDelete = (index) => {
      let _temp = this.state.fileList.concat([])
      _temp.splice(index, 1)
      this.setState({
        /*方法一：推荐使用*/
        fileList: _temp
      });
    }

    render() {
      const {form} = this.props;
      const {getFieldDecorator} = form;
      const fileListItems = this.state.fileList.map((item, index) => {
        return <li key={index}>{item}<Icon className="closeIcon"
                                           onClick={this.fileListDelete.bind(this, index)}
                                           type="close"/></li>
      })
      return (
        <div className="srcAddModal">
          <Modal title="添加输出行情源"
                 width="900px"
                 wrapClassName={'srcAddModalContent'}
                 maskClosable={false}
                 cancelText={'取消'}
                 okText={'确定'}
                 visible={this.props.show}
                 onOk={this.handleOk}
                 confirmLoading={this.state.confirmLoading}
                 onCancel={this.handleCancel}
          >
            <Form layout="inline">
              <FormItem
                label="实例名：">{<p>MDC_1_1_1</p>}</FormItem>
              <br/>
              <FormItem
                label="输出行情源：">
                {(
                  <Select
                    value={this.state.currency}
                    style={{width: 300}}
                    onChange={this.handleCurrencyChange}
                  >
                    <Option value="rmb">RMB</Option>
                    <Option value="dollar">Dollar</Option>
                  </Select>
                )}
              </FormItem>
              <FormItem
                style={{marginLeft: '20px'}}
                label="是否启用：">
                <Switch className="isEnable" checkedChildren="启用" unCheckedChildren="停用" defaultChecked/>
              </FormItem>
              <br/>
              <FormItem
                label="流行情源："></FormItem>
              <br/>
              <div className="editTable">
                <table className="editTableHead">
                  <thead>
                  <tr>
                    <th style={{width: 120}}>IP地址</th>
                    <th style={{width: 60}}>实时端口</th>
                    <th style={{width: 60}}>重传端口</th>
                    <th style={{width: 90}}>VSS连接总数</th>
                    <th style={{width: 150}}>Send Componment ID</th>
                    <th style={{width: 150}}>Target Componment ID</th>
                    <th style={{width: 65}}>操作</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td><Input/></td>
                    <td><Input/></td>
                    <td><Input/></td>
                    <td><Input/></td>
                    <td><Input/></td>
                    <td><Input/></td>
                    <td><Icon className="plusIcon"
                              onClick={this.configListAdd}
                              type="plus-circle-o"/></td>
                  </tr>
                  </tbody>
                </table>
                <div className="configAddList">
                  <table>
                    <tbody>
                    <tr>
                      <td style={{width: 120}}>123</td>
                      <td style={{width: 60}}>123</td>
                      <td style={{width: 60}}>123</td>
                      <td style={{width: 90}}>123</td>
                      <td style={{width: 150}}>123</td>
                      <td style={{width: 150}}>123</td>
                      <td style={{width: 65}}><Icon className="closeIcon"
                                                    onClick={this.configListDelete.bind(this)}
                                                    type="close"/></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <FormItem
                className="myInputLabel"
                label="文件行情源：">
                <Input ref="myInput"
                       placeholder="请输入文件落地目录"
                       onChange={this.fileInputChange.bind(this)}
                       style={{width: 300}}></Input><Icon className="plusIcon"
                                                          onClick={this.fileListAdd}
                                                          type="plus-circle-o"/>
                <div className="fileList">
                  <ul>{fileListItems}</ul>
                </div>
              </FormItem>
            </Form>
          </Modal>
        </div>
      );
    }
  }
)

export default srcAddModal;