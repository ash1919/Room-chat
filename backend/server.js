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
  console.log(socket.id);
  console.log("client connected");

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + JSON.stringify(msg));
  });
});

server.listen(port, () => {
  console.log(`server running on ${port}`);
});
