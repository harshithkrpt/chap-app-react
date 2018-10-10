import React from "react";
import Message from "./Message";

const MessageList = props => {
  return (
    <div className="message-list">
      {props.messages.map((message, index) => {
        return (
          <Message
            key={index}
            username={message.senderId}
            text={message.text}
          />
        );
      })}
    </div>
  );
};

export default MessageList;
