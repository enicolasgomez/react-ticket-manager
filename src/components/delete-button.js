import React, { Component } from "react";

export default class DeleteButton extends Component {
  render() {
      return (
          <span><button onClick={() => this.buttonClick(this.props.node)}>X</button></span>
      );
  }
}