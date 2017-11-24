import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { socket, socketInit} from './socket/socket';
import LoadingPage from './components/LoadingPage';

const store = configureStore();

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);
let hasRendered = false;
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true;
	}
};
socket.on('loginWithCookie', (res) => {
	console.log('response: ', res);
	store.dispatch({
		type: 'LOGIN',
		uid: res.uid
	});
	renderApp();
	history.push('/');
});

socketInit(store.dispatch, socket);

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

//renderApp();
//history.push('/');
