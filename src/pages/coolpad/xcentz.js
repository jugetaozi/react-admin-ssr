import React, { Component } from 'react';
import { Menu, Icon, Tabs, Button, Upload, message } from 'antd';
import classnames from 'classnames'
import styles from './xcentz.less'
import { download } from "api/file";
import store from "../../store/store";
import { open } from 'utils/utils'

const TabPane = Tabs.TabPane;
const { SubMenu } = Menu;

class xcentZ extends Component {

	state = {
		fileList: [],
		uploading: false,
	}

	componentDidMount = () => {
		console.log(store, 'store.getState()');
	}

	handleUpload = () => {
		// const { fileList } = this.state;
		// const formData = new FormData();
		// fileList.forEach((file) => {
		// 	formData.append('files[]', file);
		// });

		// this.setState({
		// 	uploading: true,
		// });
		// You can use any AJAX library you like
		// download({
		// 	data: formData,
		// 	success: () => {
		// 		this.setState({
		// 			fileList: [],
		// 			uploading: false,
		// 		});
		// 		message.success('upload successfully.');
		// 	},
		// 	error: () => {
		// 		this.setState({
		// 			uploading: false,
		// 		});
		// 		message.error('upload failed.');
		// 	},
		// });
	}
	downloadClick () {
		download().then((item) => {
			open(`/download/${item.data.id}`)
		})
	}


	render () {
		const { uploading, fileList } = this.state;
		const props = {
			onRemove: (file) => {
				this.setState((state) => {
					const index = state.fileList.indexOf(file);
					const newFileList = state.fileList.slice();
					newFileList.splice(index, 1);
					return {
						fileList: newFileList,
					};
				});
			},
			beforeUpload: (file) => {
				this.setState(state => ({
					fileList: [...state.fileList, file],
				}));
				return false;
			},
			fileList,
		};
		return (
			<div className={styles['upload_content']}>
				<Button type="primary" onClick={this.downloadClick.bind(this)} className={classnames(styles['download'])} shape="round" icon="download" size="large">下载excel表格</Button>
				<Upload {...props}>
					<Button>
						<Icon type="upload" /> 选择上传文件
          </Button>
				</Upload>
				<Button
					type="primary"
					onClick={this.handleUpload}
					disabled={fileList.length === 0 || fileList.length > 1}
					loading={uploading}
					style={{ marginTop: 16 }}
				>
					{uploading ? 'Uploading' : '开始上传'}
				</Button>
			</div>
		)
	}
}
export default xcentZ
