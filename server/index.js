import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  // URLs allowed to make request
  cors: {
    origin: ["http://localhost:3000", "https://quick-chat.seungyoon-lee.com"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // logs userID on connect
  console.log(`User connected with ID: ${socket.id}`);

  // logs userID and roomName on joining a room
  socket.on("join_chat", (data) => {
    socket.join(data);
    console.log(`User: ${socket.id} joined room: ${data}`);
  });

  // logs message on message sent
  socket.on("send_message", (data) => {
    socket.to(data.roomName).emit("receive_message", data);
    console.log(data);
  });

  // logs userID on discconect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log("Server started at: ", PORT);
});
