import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useSearchParams } from "react-router-dom";

// const socket = io("http://localhost:4000");

const Chat = () => {
  const [roomDetails, setRoomDetails] = useState({});
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [query, setQuery] = useState("");
  const [socket, setSocket] = useState("");
  const chatMessagesRef = useRef();
  const chatInputRef = useRef();
  const [searchParams] = useSearchParams();

  const sendMessage = (event) => {
    event.preventDefault();
    socket.emit("send_message", message);
    setMessage("");
  };

  useEffect(() => {
    const socket = io("http://localhost:4000");
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    // get new values on change
    setQuery({ username: currentParams.username, room: currentParams.room });
  }, [searchParams]);

  useEffect(() => {
    if (!socket) return;
    //join chatroom
    socket.emit("joinRoom", query);

    //get room users
    socket.on("room_users", ({ room, users }) => {
      setRoomDetails({
        room: room,
        users: users,
      });
    });
    socket.on("message", (data) => {
      setMessageReceived((prevMessages) => [...prevMessages, data]);
      setTimeout(() => {
        chatMessagesRef.current.scrollTop =
          chatMessagesRef.current.scrollHeight;
      }, 0);
    });

    socket.on("receive_message", (data) => {
      setMessageReceived((prevMessages) => [...prevMessages, data]);
      setTimeout(() => {
        chatMessagesRef.current.scrollTop =
          chatMessagesRef.current.scrollHeight;
      }, 0);
    });
  }, [socket]);

  console.log(roomDetails);
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
          <h2 id="room-name">{roomDetails.room}</h2>
          <h3>
            <i className="fas fa-users"></i> Users
          </h3>
          <ul id="users">
            {roomDetails?.users?.map((user) => (
              <li key={user.id} style={{ textTransform: "capitalize" }}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
        <div ref={chatMessagesRef} className="chat-messages">
          {messageReceived &&
            messageReceived?.map((msg, index) => (
              <div className="message" key={`${index}${msg}`}>
                <p className="meta">
                  {query.username} <span>{msg.time}</span>
                </p>
                <p className="text">{msg.text}</p>
              </div>
            ))}
        </div>
      </main>
      <div className="chat-form-container">
        <form onSubmit={(event) => sendMessage(event)} id="chat-form">
          <input
            ref={chatInputRef}
            id="msg"
            type="text"
            value={message}
            placeholder="Enter Message"
            required
            autoComplete="off"
            onChange={(event) => {
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
