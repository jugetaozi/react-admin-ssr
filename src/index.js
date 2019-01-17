import React from 'react';
import ReactDOM from 'react-dom';
import Home from './layouts/home.js';
import './index.less';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
