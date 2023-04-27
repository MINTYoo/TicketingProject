
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://naras004:zEE367%40&GxpL8Av@avengerscluster.2s0a1da.mongodb.net/?retryWrites=true&w=majority"

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

app.post('/respondTicket', async (req, res) => {
  const inputticketID = parseInt(req.body.input);
  const inputresponderID = parseInt(req.body.responseResponderID);
  var inputresponsestr = req.body.responsestr;
  console.log(inputresponderID);
  const existingTicket = await TicketItself.findOne({ ticketID: inputticketID });
  inputresponsestr = existingTicket.ticketdata + "\n---\nResponder: " + inputresponderID + "\n" + inputresponsestr;

  // Update the ticket with the new ticketdata value and responderID value
  const updatedTicket = await TicketItself.findOneAndUpdate(
    { ticketID: inputticketID },
    { $set: { ticketdata: inputresponsestr, responderID: inputresponderID } },
    { new: true }
  );

  res.send(updatedTicket);
});


const { ObjectId } = require('mongodb'); // import the ObjectId function

app.post('/searchTicket', (req, res) => {
  const inputticketID = parseInt(req.body.input);
  //console.log(inputticketID); // Output the user's input to the console

  TicketItself.findOne({ ticketID: inputticketID })
    .then(ticket => {
      if (ticket) {
        res.json({
          issuerID: ticket.issuerID,
          ticketdata: ticket.ticketdata,
          color: ticket.color // Include the 'color' field in the response
        });
      } else {
        console.log('Ticket not found');
        res.status(404).send('Ticket not found');
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(3000, () => {
  console.log('Running on port 3000!')
})


app.get('/tickets', async (req, res) => {
  const tickets = await TicketItself.distinct('ticketID');
  res.json(tickets);
});
