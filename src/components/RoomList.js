import React from "react";

class RoomList extends React.Component {
  render() {
    return (
      <div className="rooms-list">
        <h1>Your Rooms</h1>
        {this.props.rooms.map(room => {
          return (
            <li key={room.id} className="room">
              <a href="#"># {room.name}</a>
            </li>
          );
        })}
      </div>
    );
  }
}

export default RoomList;
