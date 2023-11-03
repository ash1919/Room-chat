import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:4000");

const Chat = () => {
  const [welcomeMessage, setWelcomeMessage] = useState([]);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socket = io("http://localhost:4000");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (message) => {
      console.log(message);
    });
  }, [socket]);

  const sendMessage = (event) => {
    event.preventDefault();
    console.log("hi", message);

    socket.emit("send_message", { message });
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
        <a href="/" className="btn">
          Leave Room
        </a>
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>
            <i className="fas fa-comments"></i> Room Name:
          </h3>
          <h2 id="room-name">JavaScript</h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users">
            <li>Brad</li>
            <li>John</li>
            <li>Mary</li>
            <li>Paul</li>
            <li>Mike</li>
          </ul>
        </div>
        <div className="chat-messages">
          <div className="message">
            <p className="meta">
              Brad <span>9:12pm</span>
            </p>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
          <div className="message">
            <p className="meta">
              Mary <span>9:15pm</span>
            </p>
            <p className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
        </div>
      </main>
      <div className="chat-form-container">
        <form onSubmit={(event) => sendMessage(event)} id="chat-form">
          <input
            id="msg"
            type="text"
            value={message}
            placeholder="Enter Message"
            required
            autoComplete="off"
            onChange={(event) => {
              event.preventDefault();
              setMessage(event.target.value);
            }}
          />
          <button type="submit" className="btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
