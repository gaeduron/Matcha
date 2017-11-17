import io from 'socket.io-client';
import initListeners from './listeners/initialisation';

const socket = io();

socket.open();
initListeners(socket);

export { socket };
