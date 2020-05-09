import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class TicketService {

  createTicket(o) {
    return axios.post(API_URL + 'createTicket', { headers: authHeader(), data: o  });
  }

  deleteTicket(o) {
    return axios.post(API_URL + 'deleteTicket', { headers: authHeader(), data: o });
  }

  listAllTickets() {
    return axios.get(API_URL + 'allTickets', { headers: authHeader() });
  }

  listUserTickets() {
    return axios.get(API_URL + 'userTickets', { headers: authHeader() });
  }

  updateTicketRequestStatus(o) {
    return axios.post(API_URL + 'updateTicketRequestStatus', { headers: authHeader(), data: o });
  }

}

export default new TicketService();
