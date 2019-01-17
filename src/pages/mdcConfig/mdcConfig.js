import React, {Component} from 'react';
import {Menu, Icon, Alert, Tabs, Button, Table} from 'antd';
import './mdcConfigStyle/mdcConfig.less'
import ConfigModal from './configModal'
import MdcAddModal from './mdcAddModal'
import SrcAddModal from './srcAddModal'
import FlowModifyModal from './flowModifyModal'
import FileModifyModal from './fileModifyModal'

const TabPane = Tabs.TabPane;
const {SubMenu} = Menu;

//  rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

class mdcConfig extends Component {
  state = {
    mode: 'inline',
    theme: 'light',
    configModalShow: false,
    mdcModalShow: false,
    srcAddModalShow: false,
    flowModifyModalShow: false,
    fileModifyModalShow: false
  }

  handleClick = (e) => {
    console.log(e);
  }

  onChange = (e) => {
    console.log(e);
  }

  showConfigModal = () => {
    console.log(this.state.configModalShow);
    this.setState({
      configModalShow: true,
    });
  }
  configModalClose = (state) => {
    this.setState({
      configModalShow: state
    });
  }
  showMdcAddModal = () => {
    console.log(this.state.configModalShow);
    this.setState({
      mdcAddModalShow: true,
    });
  }
  mdcAddModalClose = (state) => {
    this.setState({
      mdcAddModalShow: state
    });
  }
  showSrcAddModal = () => {
    console.log(this.state.configModalShow);
    this.setState({
      srcAddModalShow: true,
    });
  }
  srcAddModalClose = (state) => {
    this.setState({
      srcAddModalShow: state
    });
  }
  showFlowModifyModal = () => {
    console.log("flowModifyModalShow");
    this.setState({
      flowModifyModalShow: true,
    });
  }
  flowModifyModalClose = (state) => {
    this.setState({
      flowModifyModalShow: state
    });
  }
  showFileModifyModal = () => {
    this.setState({
      fileModifyModalShow: true,
    });
  }
  fileModifyModalClose = (state) => {
    this.setState({
      fileModifyModalShow: state
    });
  }

  render() {
    const columns = [
      {title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left'},
      {title: 'Column 4', dataIndex: 'address', key: '4', width: 150},
      {title: 'Column 5', dataIndex: 'address', key: '5', width: 150},
      {title: 'Column 8', dataIndex: 'address', key: '8'},
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a onClick={this.showFlowModifyModal} href="javascript:;">FlowModify</a>,
      },
    ];
    const columns2 = [
      {title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left'},
      {title: 'Column 4', dataIndex: 'address', key: '4', width: 150},
      {title: 'Column 5', dataIndex: 'address', key: '5', width: 150},
      {title: 'Column 8', dataIndex: 'address', key: '8'},
      {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: () => <a onClick={this.showFileModifyModal} href="javascript:;">FileModify</a>,
      },
    ];


    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    return (
      <div className="mdcConfig" style={{height: '100%'}}>
        <div className="sideBar">
          <div className="menuContent">
            <Menu
              className="left_menu"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode={this.state.mode}
              theme={this.state.theme}
            >
              <Menu.Item key="1">
                <Icon type="mail"/>
                Navigation One
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="calendar"/>
                Navigation Two
              </Menu.Item>
            </Menu>
          </div>
          <Button type="primary" onClick={this.showConfigModal} className="configBtn">配置</Button>
        </div>
        <div className="right_content">
          <div className="card-container" style={{height: '100%'}}>
            <Tabs onChange={this.onChange} type="card" className="card">
              <TabPane tab={<span><Icon onClick={this.handleClick}
                                        className="iconHover"
                                        type="apple"/>Tab 1</span>}
                       key="1">
              </TabPane>
              <TabPane tab="Tab Title 2" key="2">
              </TabPane>
              <TabPane tab="Tab Title 3" key="3">
              </TabPane>
            </Tabs>
            <Icon className="mdcAddIcon" onClick={this.showMdcAddModal} type="plus"/>
            <div className="panel">
              <div className="warn"><span style={{color: 'red'}}>* </span>
                MDC实例运行中标识：<span className="runningDot"></span>；MDC实例停止标识：
                <span className="stopDot"></span>；MDC状态在停用状态或非工作时段，允许修改配置，其他情况不允许修改配置；
              </div>
              <div className="versionInfo">
                <span className="v_num">版本号：V1.0.0</span>
                <span className="userName">用户名：XXXXXXXXXXXXXXXXXXXXXX</span>
                <span className="time">工作时间段：09:00:00 -18:00:00</span>
              </div>
              <div className="operate">
                <Button type="primary" onClick={this.showSrcAddModal} className="operate_btn">添加输入行情源</Button>
                <Button type="primary" className="delete_btn">删除输入行情源</Button>
              </div>
              <Table columns={columns}
                     className="flowTable"
                     rowSelection={rowSelection}
                     pagination={false}
                     scroll={{x: 1500, y: 240}}
                     title={() => '流行情源配置：'}
                     footer={() => '共 3 条'}
                     dataSource={data}/>
              <Table columns={columns2}
                     className="fileTable"
                     rowSelection={rowSelection}
                     pagination={false}
                     scroll={{x: 1500, y: 240}}
                     title={() => '文件行情源配置：'}
                     footer={() => '共 3 条'}
                     dataSource={data}/>
            </div>
          </div>
        </div>
        <ConfigModal onClose={this.configModalClose}
                     show={this.state.configModalShow}></ConfigModal>
        <MdcAddModal onClose={this.mdcAddModalClose}
                     show={this.state.mdcAddModalShow}></MdcAddModal>
        <SrcAddModal onClose={this.srcAddModalClose}
                     show={this.state.srcAddModalShow}></SrcAddModal>
        <FlowModifyModal onClose={this.flowModifyModalClose}
                         show={this.state.flowModifyModalShow}></FlowModifyModal>
        <FileModifyModal onClose={this.fileModifyModalClose}
                         show={this.state.fileModifyModalShow}></FileModifyModal>
      </div>
    );
  }
}

export default mdcConfig;