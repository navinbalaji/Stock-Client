import React, { useState, useEffect } from "react";
import "./App.css";
import StockDisplay from "./StockDisplay";
const socket = new WebSocket("ws://localhost:8080");

const App = () => {
  const [receivedMessage, setReceivedMessage] = useState("");

  useEffect(() => {
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      setReceivedMessage(JSON.parse(event.data));
    };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      socket.send(message);
    }
  };

  return (
    <div className="App">
      <h1 style={{textAlign:"center"}}>Stock Client</h1>
      <div className="stockContainer">
        {Object.entries(receivedMessage).map((stock) => (
          <StockDisplay key={stock[0]} stockName={stock[0]} stockValue={stock[1]} />
        ))}
      </div>
    </div>
  );
};

export default App;
