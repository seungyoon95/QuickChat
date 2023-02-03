import React, { useEffect, useState, useRef } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { Form, Button } from "react-bootstrap";
import "./css/Chat.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ChatRoom({ socket, userName, roomName }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const ref = useRef();

  const reset = () => {
    ref.current.value = "";
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        roomName: roomName,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      reset();
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="ChatWindow">
      <div className="chat-header">
        <h3>
          Room: <strong>{roomName}</strong>
        </h3>
      </div>

      <div className="ChatBody">
        <ScrollToBottom className="MessageContainer">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={userName === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="MessageContent">
                    <b>{messageContent.message}</b>
                  </div>
                  <div className="MessageMeta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>

      <div className="ChatFooter">
        <Form.Control
          size="lg"
          type="text"
          placeholder="Large text"
          className="messageBox"
          ref={ref}
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            e.key === "Enter" && sendMessage();
          }}
        />
        <Button variant="primary" id="button-addon2" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default ChatRoom;
