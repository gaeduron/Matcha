import io from 'socket.io-client';
import initListeners from './listeners/initialisation';
import createSocketIoMiddleware from 'redux-socket.io';

const socket = io();
const socketInit = initListeners;
const socketIoMiddleware = createSocketIoMiddleware(socket, "SERVER/");

socket.open();

export { socket, socketInit, socketIoMiddleware };
