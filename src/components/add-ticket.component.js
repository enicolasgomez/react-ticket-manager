import React, { Component } from "react";
import Form from "react-validation/build/form";
import UserCombo from "./user-combo.component"
import TicketService from "../services/ticket.service";

export default class CrudTicket extends Component {
  constructor(props) {
    super(props);
    this.handleTicket = this.handleTicket.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);

    this.state = {
      userId: "",
      ticket_pedido: false,
      id : null
    };
  }

  handleUserChange(e) {
    this.setState(
      Object.assign(this.state, e)
    );
  }

  handleTicket(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    TicketService.createTicket(this.state).then( //in case we want to support server side pagination
      response => {
        this.setState({
          message: response.data,
          successful: true
        });
      },
      error => {
        const resMessage =
          (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
              <img
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                alt="profile-img"
                className="profile-img-card"
              />

              <Form onSubmit={this.handleTicket}             
              ref={c => {
                this.form = c;
              }} >
              <div>
                <div className="form-group">
                  <label htmlFor="userId">User ID</label>
                  <UserCombo 
                    action={this.handleUserChange}
                  />
                  <label htmlFor="requested">Requested (should be edited by user)</label>
                  <input
                    name="isGoing"
                    disabled
                    type="checkbox" />
                </div>
                <div className="form-group">
                  <input type="submit" value="Create Ticket" />
                </div>          
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
