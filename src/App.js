import React, { Component } from "react";
import "./App.css";
import Chatkit from "@pusher/chatkit";
import { instanceLocator, tokenUrl } from "./config";

// components
import MessageList from "./components/MessageList";
import SendMessagesForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
  }
  currentUser;

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "harshith",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;

      this.currentUser
        .getJoinableRooms()
        .then(joinableRooms => {
          this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
          });
        })
        .catch(err => console.log(`Error on joined Rooms ` + err));
      this.currentUser.subscribeToRoom({
        roomId: 18215009,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }
  sendMessage = text => {
    this.currentUser.sendMessage({
      text,
      roomId: 18215009
    });
  };
  render() {
    return (
      <div className="app">
        <RoomList
          rooms={[...this.state.joinedRooms, this.state.joinableRooms]}
        />
        <MessageList messages={this.state.messages} />
        <SendMessagesForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
