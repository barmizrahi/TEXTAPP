import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] });

const sendTextToServer = (text) => {
    socket.emit('text', { title: 'Student code', code: text });
    console.log('Sent text to server:', text);
  };

export { sendTextToServer, socket }; // Exporting the socket instance