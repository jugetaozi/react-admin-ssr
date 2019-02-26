import React from 'react';
import ReactDOM from 'react-dom';
import Index from './layouts/index.js';
import './index.less';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Index />,
	document.getElementById('root'));
registerServiceWorker();
