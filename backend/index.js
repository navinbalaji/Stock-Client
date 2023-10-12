const WebSocket = require("ws");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send(`You sent: ${message}`);
  });
  ws.emit("stocks", 1, 2, 3, 4, 5);
  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

//Generate Random Number

const randomNumber = () => Math.floor(Math.random() * 100);

// Function to broadcast random numbers to all connected clients
function sendRandomNumber() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ tesla: randomNumber(), microsoft: randomNumber(), apple: randomNumber() }));
    }
  });
}

server.listen(8080, () => {
  console.log("WebSocket server is running on port 8080");
  // Emit random numbers every second
  setInterval(sendRandomNumber, 1000);
});
