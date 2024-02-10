const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('<h1>Hello, World!</h1>');
});

io.on('connection', (socket) => {
  console.log('A user connected');


  app.get('/codeblocks', async (req, res) => {
    try {
      // Fetch code block titles from the database
      const titles = await CodeBlock.find().distinct('title');
      res.json(titles);
    } catch (error) {
      console.error('Error fetching code block titles:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

  
  socket.on('text', (data) => {
    console.log('Received text:', data);

    // Broadcast the 'textReceived' event to all connected clients
    io.emit('textReceived', { status: 'received', originalText: data });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});