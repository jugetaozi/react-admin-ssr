import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";
import LayoutIndex from './layoutIndex.js'
import styles from './index.less'
import store from '../store/store';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import NProgress from 'nprogress';


moment.locale('zh-cn');
class Index extends Component {
	render () {
		return (
			<Provider store={store}>
				<LocaleProvider locale={zh_CN}>
					<Router>
						<LayoutIndex />
					</Router>
				</LocaleProvider>
			</Provider>
		);
	}
}

export default Index;//分离router 以便增加withRouter
