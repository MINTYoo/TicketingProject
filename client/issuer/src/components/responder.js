import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../issuer.css';
var globalTicketID = 0;

//Temporarily hard coded... 
//CHANGE THIS 
//This will be the responder's ID
var localResponderID = 999;


function Responder() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [number, setNumber] = useState(0);
  const [respondertickets, respondersetTickets] = useState([]);
  const [color] = useState("white");

  // Function to handle clicking the number button with an input value
  function handleSearchClick(inputNumber) {
    axios.post('http://localhost:3000/searchTicket', { input: inputNumber }).then((response) => {
      setSelectedTicket(response.data);
      globalTicketID = inputNumber;
    });
  }

  const handleButtonClick = () => {
    axios.get(`http://localhost:3000/tickets?inputresponderID=${localResponderID}`).then((response) => {
      setTickets(response.data);
    });
  };

  const handleResponderClick = async () => {
    axios.get(`http://localhost:3000/respondertickets?inputresponderID=${localResponderID}`).then((response) => {
      respondersetTickets(response.data);
    });
  };

  const handleTicketClick = (ticket) => {
    axios.post('http://localhost:3000/searchTicket', { input: ticket }).then((response) => {
      setSelectedTicket(response.data);
      globalTicketID = ticket;
    });
  };

  const handleCloseSubmit = (globalTicketID, localResponderID) => {
    axios.post('http://localhost:3000/closeticket', {
      inputticketID: globalTicketID,
      responseResponderID: localResponderID
    });
    setResponseText('');
    handleTicketClick(globalTicketID);
  };

  const handleFormSubmit = (globalTicketID, responseString) => {
    axios.post('http://localhost:3000/respondTicket', {
      input: globalTicketID,
      responsestr: responseString, // change key name to match server-side handler
      responseResponderID: localResponderID
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

  const handleColorChange = (event) => {
    axios.post('http://localhost:3000/colorticket', {
      inputticketID: globalTicketID,
      inputcolor: event.target.value,
    });
    handleTicketClick(globalTicketID);
  };


  useEffect(() => {
    const interval = setInterval(() => {
      handleTicketClick(globalTicketID);
      handleButtonClick();
      handleResponderClick();



    }, 1000);
    // clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const setResponderID = (inputNumber) => {
    localResponderID = inputNumber;
    const ticketListContainer = document.querySelector('.ticket-list-container');
    const loginContainer = document.querySelector('.loginContainer');
    ticketListContainer.style.display = 'block';
    loginContainer.style.display = 'none';
  };

  return (
    <div className="background">
      <div className="loginContainer">
        Responder Login:
        <p></p>
        <input type="number" id="idInput" onChange={(e) => setNumber(parseInt(e.target.value))} />
        <p></p>
        <button type="button" id="loginButton" onClick={() => setResponderID(number)}>Login</button>

        <div className="betaTextContainer">
          Beta By 370 Avengers:<p></p>
          Nick Naras <p></p>
          Don Tran<p></p>
          Ruben Cerda<p></p>
          Kevin Anderson
        </div>
      </div>


      <div className="ticket-list-container">
        Responder ID: {localResponderID}
        <div className="searchcontainer">
          <div className="searchtitle">Ticket ID:</div>
          <div>
            <input type="number" id="numberInput" onChange={(e) => setNumber(parseInt(e.target.value))} />
          </div>
          <button type="button" id="submitbutton" onClick={() => handleSearchClick(number)}>Search</button>
        </div>
        <div className="responder-ticket-list-container">
          <h2 className="ticket-list-header">Your Tickets:</h2>
          <button className="ticket-list-button" onClick={handleResponderClick}>Refresh</button>
          <br></br>
          <ul className="ticket-list">
            {respondertickets.map((responderticket) => (
              <li
                key={responderticket.id}
                onClick={() => handleTicketClick(responderticket)}
                style={{
                  color: 'white'
                }}
              >
                {responderticket}
              </li>
            ))}
          </ul>
        </div>
        <h2 className="ticket-list-header">Ticket List</h2>
        <button className="ticket-list-button" onClick={handleButtonClick}>Refresh</button>
        <br></br>
        Open Tickets:
        <ul className="ticket-list">
          {tickets.map((ticket) => (
            <li
              key={ticket.id}
              onClick={() => handleTicketClick(ticket)}
              style={{
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
                  Response:
                  <textarea id="response" value={responseText} onChange={(e) => setResponseText(e.target.value)} />
                </div>
              </form>
            </div>
            <button type="button" id="submitbutton" onClick={() => handleFormSubmit(globalTicketID, responseText)}>Submit</button>
            <button type="button" id="submitbutton" onClick={() => handleCloseSubmit(globalTicketID, localResponderID)}>Close</button>

            <input
              type="color"
              id="colorpicker"
              value={color}
              onChange={handleColorChange}
            />

          </div>
        )}
      </div>
    </div>
  );
}

export default Responder;