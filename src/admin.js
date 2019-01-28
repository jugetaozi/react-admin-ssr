import React from 'react';
import ReactDOM from 'react-dom';
import Admin from './layouts/admin.js';
import './index.less';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Admin />, document.getElementById('root'));
registerServiceWorker();
