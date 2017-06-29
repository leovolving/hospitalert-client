import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Hospitalert from './components/hospitalert';
import store from './store';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
	<Provider store={store}>
	<Hospitalert />
	</Provider>, 
	document.getElementById('root'));
// registerServiceWorker();
//delete this