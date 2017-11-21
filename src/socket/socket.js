import io from 'socket.io-client';
import initListeners from './listeners/initialisation';

const socket = io();
const socketInit = initListeners;

socket.open();
//initListeners(socket);

export { socket, socketInit };
