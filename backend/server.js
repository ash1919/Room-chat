const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());

const http = require("http");
const formatMessage = require("./utils/messages");
const server = http.createServer(app);
const botName = "ChatCord Bot";

// Pass the server instance to Socket.io and configure CORS for Socket.io
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000", // Specify the allowed origin
    methods: ["GET", "POST"], // Specify the allowed HTTP methods
  },
});

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

io.on("connection", (socket) => {
  console.log("Connection done");
  //welcome current users
  socket.emit("message", formatMessage(botName, "Welcome to Chat Cord"));

  //Broadcast when user connects
  socket.broadcast.emit(
    "message",
    formatMessage(botName, "A User has joined the chat")
  );

  //listen client messages
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", formatMessage("USER", data));
  });

  //client disconnects
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A User has left the chat"));
  });
});

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
