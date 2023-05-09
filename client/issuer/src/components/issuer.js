import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../issuer.css';

var globalTicketID = 0;

//Temporarily hard coded... 
//CHANGE THIS 
//This will be the issuer's ID
var localIssuerID = 999;


function Issuer() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [number, setNumber] = useState(0);
  const [issuertickets, issuersetTickets] = useState([]);
  const [color] = useState("white");

  // Function to handle clicking the number button with an input value
  function handleSearchClick(inputNumber) {
    axios.post('http://localhost:3000/searchTicket', { input: inputNumber }).then((response) => {
      setSelectedTicket(response.data);
      globalTicketID = inputNumber;
    });
  }

  const handleButtonClick = () => {
    axios.get(`http://localhost:3000/issuertickets?inputIssuerID=${localIssuerID}`).then((response) => {
      setTickets(response.data);
    });
  };

  const handleIssuerClick = async () => {
    axios.get(`http://localhost:3000/issuertickets?inputIssuerID=${localIssuerID}`).then((response) => {
      issuersetTickets(response.data);
    });
  };

  const handleTicketClick = (ticket) => {
    axios.post('http://localhost:3000/searchTicket', { input: ticket }).then((response) => {
      setSelectedTicket(response.data);
      globalTicketID = ticket;
    });
  };


  //will get back to later :skull:
  const handleFormSubmit = (globalTicketID, responseString) => {
    axios.post('http://localhost:3000/respondIssuer', {
      input: globalTicketID,
      responsestr: responseString, // change key name to match server-side handler
      responseIssuerID: localIssuerID
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



  useEffect(() => {
    const interval = setInterval(() => {
      handleTicketClick(globalTicketID);
      handleButtonClick();
      handleIssuerClick();



    }, 1000);
    // clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const setIssuerID = (inputNumber) => {
    localIssuerID = inputNumber;
    const ticketListContainer = document.querySelector('.ticket-list-container');
    const loginContainer = document.querySelector('.loginContainer');
    ticketListContainer.style.display = 'block';
    loginContainer.style.display = 'none';
  };

  return (
    <div className="background">
      <div className="loginContainer">
        Issuer Login:
        <p></p>
        <input type="number" id="idInput" onChange={(e) => setNumber(parseInt(e.target.value))} />
        <p></p>
        <button type="button" id="loginButton" onClick={() => setIssuerID(number)}>Login</button>

 
      </div>


      <div className="ticket-list-container">
        Issuer ID: {localIssuerID}
        <div className="searchcontainer">
          <div className="searchtitle">Ticket ID:</div>
          <div>
            <input type="number" id="numberInput" onChange={(e) => setNumber(parseInt(e.target.value))} />
          </div>
          <button type="button" id="submitbutton" onClick={() => handleSearchClick(number)}>Search</button>
        </div>
        
        
        <h2 className="ticket-list-header">Ticket List</h2>
        <button className="ticket-list-button" onClick={handleButtonClick}>Refresh</button>
        <br></br>
        Your Tickets:
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

 

          </div>
        )}
      </div>
    </div>
  );
}

export default Issuer;