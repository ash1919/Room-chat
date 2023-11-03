const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());

const http = require("http");
const server = http.createServer(app);

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
  socket.emit("message", "Welcome to Chat Cord");

  //Broadcast when user connects
  socket.broadcast.emit("message", "A User has joined the chat");

  //client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A User has left the chat");
  });

  // console.log(socket.id);
  // console.log("client connected");

  // socket.on("disconnect", () => {
  //   console.log("client disconnected");
  // });

  // socket.on("chat message", (msg) => {
  //   console.log("message: " + JSON.stringify(msg));
  // });
});

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
