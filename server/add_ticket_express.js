var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://naras004:zEE367%40&GxpL8Av@avengerscluster.2s0a1da.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
const app = express()
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/ID_index.html')
})

app.use(express.static(__dirname));

const database = client.db('TicketDataCollection');
const TicketItself = database.collection('TicketData');


var userID = null;
app.post('/submitID', (req, res) => {
  userID = req.body.input;
  console.log("logged in userid: ", userID);
  res.redirect('QuestionForm.html');
});

app.post('/newTicket', (req, res) => {
  const userInput = req.body.input;
  console.log(userInput); // Output the user's input to the console

  var ticketID = Math.floor(Math.random() * 1000000000); // Generate a random 9-digit number for the ticketID field

  var data = {
    "ticketdata": userInput,
    "color": null,
    "status": "open",
    "ticketID": ticketID,
    "issuerID": userID,
    "responderID": null
  }

  TicketItself.insertOne(data);
  // You can now use the userInput variable to process the user's input
  res.redirect('QuestionForm.html');
});

const { ObjectId } = require('mongodb'); // import the ObjectId function

app.post('/searchTicket', (req, res) => {
  const inputticketID = parseInt(req.body.input);
  console.log(inputticketID); // Output the user's input to the console

  TicketItself.findOne({ ticketID: inputticketID })
    .then(ticket => {
      if (ticket) {
        console.log(ticket.ticketdata);
        res.json(ticket); // Send the ticket data as a JSON response
      } else {
        console.log('Ticket not found');
        res.status(404).send('Ticket not found'); // Return a 404 status if the ticket is not found
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error'); // Return a 500 status if there's an error
    });
});
app.post('/listTickets', (req, res) => {

  TicketItself.find({ responderID: null })
    .toArray()
    .then(tickets => {
      if (tickets.length > 0) {
        const ticketIDs = tickets.map(ticket => ticket.ticketID);
        console.log(ticketIDs);
        res.redirect('QuestionForm.html');
      } else {
        console.log('No tickets found');
        res.redirect('QuestionForm.html');
      }
    })
    .catch(err => {
      console.error(err);
      res.redirect('QuestionForm.html');
    });
});

app.listen(3000, () => {
  console.log('Running on port 3000!')
})


app.get('/tickets', async (req, res) => {
  const tickets = await TicketItself.distinct('ticketID');
  console.log("Called /tickets");
  res.json(tickets);
});

/*
app.post('/sendticket', function (req, res) {
        let output = req.body.user_input;
        var data = {
            "user_input": output,
            "priority": 1,
            "color": 3
        }
        const database = client.db('TicketDataCollection');
        const TicketItself = database.collection('TicketData');
        TicketItself.insertOne(data);
        res.redirect('QuestionForm.html');
        //res.send('Data received:\n' + JSON.stringify(req.body));
        
});

app.post('/viewticket', function (req, res) {
  const database = client.db('TicketDataCollection');
  const TicketItself = database.collection('TicketData');
  const query = { id: userid };
  const cursor = TicketItself.find(query);
  document.write(cursor);
});
*/