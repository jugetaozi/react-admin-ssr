import React, { Component } from 'react'
import { Menu, Icon, Tabs, Button, Radio, Upload, message } from 'antd'
import classnames from 'classnames'
import styles from './upload.less'
import { download, uploadExcel } from 'api/file'
import store from '../../store/store'
import { open, getFileType } from 'utils/utils'

const TabPane = Tabs.TabPane
const { SubMenu } = Menu

class upload extends Component {
	state = {
		fileList: [],
		fileList2: [],
		fileList3: [],
		uploading: false,
		sheet: 'Pub_Ylnum_N',
	}

	componentDidMount = () => {}

	handleUpload = () => {
		const { fileList } = this.state
		const formData = new FormData()
		fileList.forEach(file => {
			formData.append('targetUploadFile', file)
		})
		this.setState({
			uploading: true,
		})
		uploadExcel(formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
			.then(item => {
				this.setState({
					uploading: false,
					fileList: [],
				})
				message.success('上传成功')
			})
			.catch(err => {
				this.setState({
					uploading: false,
				})
				message.error('上传失败')
			})

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
	downloadClick() {
		download({
			target: this.state.sheet,
		})
			.then(item => {
				open(`/download/${item.data.id}`)
			})
			.catch(err => {
				message.error('下载失败')
			})
	}
	onRadioChange(e, v) {
		this.setState({
			sheet: e.target.value,
		})
	}

	render() {
		const { uploading, fileList, sheet } = this.state
		const props = {
			onRemove: file => {
				this.setState(state => {
					const index = state.fileList.indexOf(file)
					const newFileList = state.fileList.slice()
					newFileList.splice(index, 1)
					return {
						fileList: newFileList,
					}
				})
			},
			beforeUpload: file => {
				if (getFileType(file.name) !== '.xlsx') {
					this.setState(state => ({
						fileList: [],
					}))
					message.error('仅支持.xlsx文件上传!')
				} else {
					this.setState(
						state => ({
							fileList: [...state.fileList, file],
						}),
						() => {
							if (this.state.fileList.length > 1) {
								message.info('一次只能上传一个文件!')
							}
						}
					)
				}
				return false
			},
			fileList,
		}
		return (
			<div className={styles['upload_C']}>
				<div className={styles['selection']}>
					<Radio.Group
						defaultValue="Pub_Ylnum_N"
						onChange={this.onRadioChange.bind(this)}
						buttonStyle="solid"
					>
						<Radio.Button value="Pub_Ylnum_N">Pub_Ylnum_N 表</Radio.Button>
						<Radio.Button value="Asc_Bussiness_Report_N">
							Asc_Bussiness_Report_N 表
						</Radio.Button>
						<Radio.Button value="Asc_Sponsored_Products_Advertised_N">
							Asc_Sponsored_Products_Advertised_N 表
						</Radio.Button>
					</Radio.Group>
				</div>
				<div className={styles['upload_content']}>
					<Button
						type="primary"
						onClick={this.downloadClick.bind(this, 'Pub_Ylnum_N')}
						className={classnames(styles['download'])}
						shape="round"
						icon="download"
						size="large"
					>
						下载excel表格
					</Button>
					<p className={styles['title']}>上传到{sheet}表</p>
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
			</div>
		)
	}
}
export default upload
