const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
app.use(express.static('public'));

wss.on('connection', (ws) => {
    console.log('A new WebSocket connection established.');
  
    // Handle messages from clients
    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
      //message from websocket as buffer
      console.log(message);
      //convert buffer to string
      const text = message.toString('ascii');
      //console.log string
      console.log(text);
      // Broadcast the message to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(text);
        }
      });
    });
  
    // Handle WebSocket connection close
    ws.on('close', () => {
      console.log('WebSocket connection closed.');
    });
  });

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
