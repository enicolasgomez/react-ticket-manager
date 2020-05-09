import React, { Component } from "react";
import User from "../services/user.service";

export default class UsersCombo extends Component {
  constructor(props) {
    super(props);
    this.validateChange = this.validateChange.bind(this);

    this.state = {
      users: [],
      selectedUser: "",
      validationError: ""
    };
  }

  componentDidMount() {
    User.getUserList()
    .then(r => {
      let usersFromRequest = r.data.map(user => {
        return { value: user.id, display: user.email };
      });
      this.setState({
        users: [
          {
            value: "",
            display: "(Select User)"
          }
        ].concat(usersFromRequest)
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  validateChange(e) {
    this.setState({
      selectedUser: e.target.value,
      validationError: e.target.value === "" ? "You must select a User" : ""
    });
    this.props.action({ userId: parseInt(e.target.value) });
  }

  render() {
    return (
      <div>
        <select
          value={this.state.selectedUser}
          onChange={this.validateChange}
        >
          {this.state.users.map(user => (
            <option
              key={user.value}
              value={user.value}
            >
              {user.display}
            </option>
          ))}
        </select>
        <div
          style={{
            color: "red",
            marginTop: "5px"
          }}
        >
          {this.state.validationError}
        </div>
      </div>
    );
  }
}