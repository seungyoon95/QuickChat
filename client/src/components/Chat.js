import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import io from "socket.io-client";
import ChatRoom from "./ChatRoom";
import { auth } from "../firebase";
import "./css/Chat.css";
import "bootstrap/dist/css/bootstrap.min.css";

// const socket = io.connect("http://localhost:3001");
const socket = io.connect("https://quickchatapi.onrender.com");


function Chat() {
  const [roomName, setRoomName] = useState("");
  const [showChat, setShowChat] = useState(false);

  const userName = auth.currentUser.displayName;

  const joinRoom = () => {
    if (roomName !== "") {
      socket.emit("join_chat", roomName);
      setShowChat(true);
    }
  };

  return (
    <div id="Chat">
      {!showChat ? (
        <div id="ChatPage">
          <h2>Join Chat Room</h2>

          <Form.Control
            id="roomName"
            type="text"
            placeholder="Room Name"
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
            onKeyPress={(e) => {
              e.key === "Enter" && joinRoom();
            }}
          />

          <Button
            variant="primary"
            id="button-addon2 joinButton"
            onClick={joinRoom}
          >
            Join!
          </Button>
        </div>
      ) : (
        <ChatRoom socket={socket} userName={userName} roomName={roomName} />
      )}
    </div>
  );
}

export default Chat;
