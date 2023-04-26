import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


var globalTicketID = 0;
var localResponderID = 999999;

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [responseText, setResponseText] = useState('');

  const handleButtonClick = () => {
    axios.get('http://localhost:3000/tickets').then((response) => {
      setTickets(response.data);
    });
  };

  const handleTicketClick = (ticket) => {
    axios.post('http://localhost:3000/searchTicket', { input: ticket }).then((response) => {
      setSelectedTicket(response.data);
      globalTicketID = ticket;
    });
  };

  const handleFormSubmit = (globalTicketID, responseString) => {
    axios.post('http://localhost:3000/respondTicket', {
      input: globalTicketID,
      responsestr: responseString, // change key name to match server-side handler
      response: localResponderID

    })
      .then((response) => {
        setResponseText(response.data.message);
        handleTicketClick(globalTicketID); // call handleTicketClick after successful response
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
    setResponseText('');
  };

  return (
    <div className="ticket-list-container">
      <h2 className="ticket-list-header">Ticket List</h2>
      <button className="ticket-list-button" onClick={handleButtonClick}>Fetch Tickets</button>
      <br></br>
      Ticket IDs:
      <ul className="ticket-list">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            onClick={() => handleTicketClick(ticket)}
            style={{
              backgroundColor: ticket.color,
              color: 'white'
            }}
          >
            {ticket}
          </li>
        ))}

      </ul>
      {selectedTicket && (
        <div className="selected-ticket-container" style={{ backgroundColor: selectedTicket.color }}>
          <div className="selected-ticket-content">
            <div className="selected-ticket-issuerid">
              <span>Issuer ID: {selectedTicket.issuerID}</span>
              <span>Ticket ID: {globalTicketID}</span>
            </div>
            <textarea className="selected-ticket-textarea" value={selectedTicket.ticketdata} readOnly />
            <form>
              <div>
                <label htmlFor="response">Response:</label>
                <textarea id="response" value={responseText} onChange={(e) => setResponseText(e.target.value)} />
              </div>
            </form>
            <button type="button" id="submitbutton" onClick={() => handleFormSubmit(globalTicketID, responseText)}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketList;