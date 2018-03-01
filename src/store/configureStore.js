import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { batch, batching } from 'redux-batch-middleware';
import thunk from 'redux-thunk';

import { socketIoMiddleware } from '../socket/socket';

import auth from '../reducers/auth';
import notif from '../reducers/notification';
import onboarding from '../reducers/onboarding';
import user from '../reducers/user';
import search from '../reducers/search';
import interactions from '../reducers/interactions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk, batch, socketIoMiddleware];
const enhancers = composeEnhancers(applyMiddleware(...middleware));


const appReducer = combineReducers({
	auth,
	notif,
	onboarding,
	user,
	search,
	interactions,
});

const rootReducer = (state, action) => {
	if (action.type === 'LOGOUT') {
		state = undefined
	}

	return appReducer(state, action);
};

export default () => {
	return createStore(batching(rootReducer), enhancers);
};
