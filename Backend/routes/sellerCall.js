// server.js

const socketIO = require('socket.io');
const users={};
function initializeSocket(server) {
const io = socketIO(server);

// Socket.io events for WebRTC signaling
io.on('connection', (socket) => {
  try {
    socket.on('join', (userId) => {
      users[userId] = socket.id;
    });

    socket.on('offer', (data) => {
      io.to(users[data.callee]).emit('offer', { offer: data.offer, caller: data.caller });
    });

    socket.on('answer', (data) => {
      io.to(users[data.caller]).emit('answer', { answer: data.answer });
    });

    socket.on('ice-candidate', (data) => {
      io.to(users[data.target]).emit('ice-candidate', { candidate: data.candidate });
    });

   
  } catch (error) {
    console.error('Socket event error:', error);
  }

  return io;
  });

}

module.exports = initializeSocket;
