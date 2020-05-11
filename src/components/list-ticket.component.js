import React, { Component } from "react";
import TicketService from "../services/ticket.service";
import UserService from "../services/user.service";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import _ from 'lodash';

export default class ListTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowData : [],
      users: [],
      columnDefs : [
        { 
          field: 'id', 
          headerName: 'ID',
          maxWidth: 80,
          checkboxSelection: true 
        }
      ],
      login : JSON.parse(localStorage.getItem('user'))
    };
    if ( this.state.login.role == 2 )
    {
      // this.state.columnDefs.push({
      //   headerName: "Users", 
      //   field: "userId", 
      //   editable: true, 
      //   cellEditor: "agSelectCellEditor",
      //   cellEditorParams: this.usersData.bind(this)
      // });
      this.state.columnDefs.push({
        headerName: 'Pedido', 
        field: 'userId', 
        editable: false,
        cellRenderer: params => {
            return _.find(this.state.users, function(i) { return ( i.id == params.value  ) }).email;
        }
      });
    }
    this.state.columnDefs.push({
      headerName: 'Pedido', 
      field: 'ticket_pedido', 
      editable:false,
      maxWidth: 80,
      cellRenderer: params => {
          return `<input type='checkbox' ${params.value ? 'checked' : ''} disabled />`;
      }
    });
    this.state.columnDefs.push({
      headerName: 'Creado', 
      field: 'createdAt', 
      editable:false
    });
    this.state.columnDefs.push({
      headerName: 'Actualizado', 
      field: 'updatedAt', 
      editable:false
    });
  }

  usersData() {
    return {
      values : this.state.users
    }
  }

  refreshDataSource() {
    if ( this.state.login.role == 2 )
    {
      TicketService.listAllTickets()
      .then(r => {
        let data = [];
        if ( r.data && r.data.length > 0 )
        {
          r.data.forEach(function(row) {
            data.push({ id : row.id, userId: row.userId, ticket_pedido: row.ticket_pedido, createdAt: row.createdAt, updatedAt: row.updatedAt });
          });
        }
        this.setState({ rowData : data });
      });
    }
    else{
      TicketService.listUserTickets()
      .then(r => {
        let data = [];
        if ( r.data && r.data.length > 0 )
        {
          r.data.forEach(function(row) {
            data.push({ id : row.id, userId: row.userId, ticket_pedido: row.ticket_pedido });
          });
        }
        this.setState({ rowData : data });
      });
    }
  }

  componentWillMount() {
    if ( this.state.login.role == 2 ) {
      UserService.getUserList()
      .then( u => {
        this.setState({ users: u.data });
        this.refreshDataSource();
      });
    }
    else{
      this.refreshDataSource();
    }
  }

  render() {
    let button = null;
    if ( this.state.login.role == 2 ) {
      button  = <button onClick={this.onDeleteButtonClick}>Delete</button>;
    }
    else {
      button = <button onClick={this.onRequestToggleButtonClick}>Request</button>;
    }
    return (

      <div
        className="ag-theme-balham"
        style={{ height: '200px', width: '800px' }}
      >
        {button}
        <AgGridReact
            onGridReady={ params => this.gridApi = params.api }
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}>
        </AgGridReact>
      </div>
    );
  }

  onDeleteButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    TicketService.deleteTicket(selectedData[0])
    .then( d => {
      this.refreshDataSource()
    });
  }

  onRequestToggleButtonClick = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    selectedData[0].ticket_pedido = ! selectedData[0].ticket_pedido ; 
    TicketService.updateTicketRequestStatus(selectedData[0])
    .then( d => {
      this.refreshDataSource()
    });
  }
}