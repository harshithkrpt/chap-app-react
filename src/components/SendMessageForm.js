import React from "react";

class SendMessageForm extends React.Component {
  state = {
    message: ""
  };
  handleChange = e => {
    this.setState({ message: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  };
  render() {
    return (
      <form className="send-message-form" onSubmit={this.handleSubmit}>
        <input
          value={this.state.message}
          onChange={this.handleChange}
          placeholder="Type your message and hit Enter"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessageForm;
