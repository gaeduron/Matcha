import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { batch, batching } from 'redux-batch-middleware';
import thunk from 'redux-thunk';

import { socketIoMiddleware } from '../socket/socket';

import auth from '../reducers/auth';
import notif from '../reducers/notification';
import onboarding from '../reducers/onboarding';
import user from '../reducers/user';
import search from '../reducers/search';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk, batch, socketIoMiddleware];
const enhancers = composeEnhancers(applyMiddleware(...middleware));
const rootReducer = combineReducers({
	auth,
	notif,
	onboarding,
	user,
	search,
});

export default () => {
	return createStore(batching(rootReducer), enhancers);
};
