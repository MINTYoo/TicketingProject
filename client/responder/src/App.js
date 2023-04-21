import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleButtonClick = () => {
    axios.get('http://localhost:3000/tickets').then((response) => {
      setTickets(response.data);
    });
  };

  const handleTicketClick = (ticketID) => {
    axios.post('http://localhost:3000/searchTicket', { input: ticketID }).then((response) => {
      const { ticketdata, issuerID, color } = response.data;
      setSelectedTicket({ ticketdata, issuerID, color });
    });
  };

  return (
    <div className="ticket-list-container">
      <h2 className="ticket-list-header">Ticket List</h2>
      <button className="ticket-list-button" onClick={handleButtonClick}>Fetch Tickets</button>
      <ul className="ticket-list">
        {tickets.map((ticket) => (
          <li
            key={ticket}
            onClick={() => handleTicketClick(ticket)}
            style={{ backgroundColor: ticket.color, color: 'white' }}
          >
            {ticket}
          </li>
        ))}
      </ul>
      {selectedTicket && (
        <div className="selected-ticket-container" style={{ backgroundColor: selectedTicket.color }}>
          <h3>Ticket Data:</h3>
          <div className="selected-ticket-content">
            <div className="selected-ticket-issuerid">
              <span>Issuer ID:</span>
              <span>{selectedTicket.issuerID}</span>
            </div>
            <textarea className="selected-ticket-textarea" value={selectedTicket.ticketdata} readOnly />
          </div>
        </div>
      )}
    </div>
  );
}



export default TicketList;
