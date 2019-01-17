import React, {Component} from 'react';
import {Menu, Icon, Alert, Tabs, Button, Table} from 'antd';
import './mdcMonitor.less'

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
    render: () => <a href="javascript:;">action</a>,
  },
];
const columns2 = [
  {title: 'Column 4', dataIndex: 'address', key: '4', width: 90},
  {title: 'Column 5', dataIndex: 'address', key: '5', width: 70},
  {title: 'Column 8', dataIndex: 'address', key: '8', width: 70}
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `Londo ${i}`,
  });
}

function callback(key) {
  console.log(key);
}

class mdcMonitor extends Component {
  state = {
    mode: 'inline',
    theme: 'light',
  }

  handleClick = (e) => {
    console.log(e);
  }

  onChange = (e) => {
    console.log(e);
  }

  render() {
    return (
      <div className="mdcMonitor" style={{height: '100%'}}>
        <div className="sideBar">
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
        <div className="right_content">
          <div className="card-container" style={{height: '100%'}}>
            <Tabs onChange={this.onChange} type="card" className="card">
              <TabPane tab={<span><span className="runningDot"></span>Tab 1</span>}
                       key="1">
              </TabPane>
              <TabPane tab="Tab Title 2" key="2">
              </TabPane>
              <TabPane tab="Tab Title 3" key="3">
              </TabPane>
            </Tabs>
            <div className="panel">
              <div className="warn"><span style={{color: 'red'}}>* </span> MDC实例运行中标识：<span className="runningDot"></span>；MDC实例停止标识：<span className="stopDot"></span></div>
              <div className="versionInfo">
                <span className="v_num">版本号：V1.0.0</span>
                <span className="userName">用户名：XXXXXXXXXXXXXXXXXXXXXX</span>
                <span className="time">工作时间段：09:00:00 -18:00:00</span>
              </div>
              <div className="flowMonitorTitle">
                <p>流行情源配置：</p>
              </div>
              <div className="flowMonitor">
                <div className="flowLeft">
                  <Table columns={columns}
                         className="flowTable"
                         rowSelection={rowSelection}
                         pagination={false}
                         scroll={{x: 1500, y: 240}}
                         footer={() => '共 3 条'}
                         dataSource={data}/>
                </div>
                <div className="flowRight">
                  <Table columns={columns2}
                         className="vssTable"
                         pagination={false}
                         scroll={{x: 380, y: 214}}
                         title={() => 'VSS连接MDC 1-1-1-1情况：'}
                         footer={() => '共 3 条'}
                         dataSource={data}/>
                </div>
              </div>
              <Table columns={columns}
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
      </div>
    );
  }
}

export default mdcMonitor;