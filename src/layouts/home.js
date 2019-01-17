import React, {Component} from 'react';
import {Layout, Menu, Icon, Avatar} from 'antd';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import './home.less';
import MdcConfig from '../pages/mdcConfig/mdcConfig.js'
import MdcMonitor from '../pages/mdcMonitor/mdcMonitor.js'
import imgSrc from "../assets/logo.png"

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

class Home extends Component {
  render() {
    return (
      <Router>
        <Layout className="layout">
          <Header className="Menu">
            <img className="logo" src={imgSrc} alt=""/>
            <p className="title">AMD</p>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{lineHeight: '64px'}}
            >
              <Menu.Item key="1"><Link to='/MdcMonitor'>MDC监控</Link></Menu.Item>
              <Menu.Item key="2"><Link to='/'>MDC配置</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{margin: '0 10px', backgroundColor: '#fff'}}>
            <Switch>
              <Route path="/" exact component={MdcConfig}/>
              <Route path="/MdcMonitor" component={MdcMonitor}/>
            </Switch>
          </Content>
        </Layout>
      </Router>
    );
  }
}

export default Home;