import React from 'react'
import ReactDOM from 'react-dom'
import Index from './layouts/index.js'
import './index.less'
import 'nprogress/nprogress.css'
import { AppContainer } from 'react-hot-loader' //热加载插件
// import registerServiceWorker from './registerServiceWorker' //serviceWorker服务

const render = Component => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('root')
	)
}
render(Index)

// Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./layouts/index', () => {
		render(Index)
	})
}

// registerServiceWorker()
