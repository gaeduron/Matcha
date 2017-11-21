import io from 'socket.io-client';
import initListeners from './listeners/initialisation';

const socket = io();
const socketInit = initListeners;

socket.open();

export { socket, socketInit };
