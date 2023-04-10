var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://naras004:zEE367%40&GxpL8Av@avengerscluster.2s0a1da.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/ID_index.html')
})

app.use(express.static(__dirname));

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
  const database = client.db('TicketDataCollection');
  const TicketItself = database.collection('TicketData');
  TicketItself.insertOne(data);
  // You can now use the userInput variable to process the user's input
  res.redirect('QuestionForm.html');
});

const { ObjectId } = require('mongodb'); // import the ObjectId function

app.post('/searchTicket', (req, res) => {
  const inputticketID = parseInt(req.body.input);
  console.log(inputticketID); // Output the user's input to the console

  const database = client.db('TicketDataCollection');
  const TicketItself = database.collection('TicketData');

  TicketItself.findOne({ _id: inputticketID }, (err, ticket) => {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    } else if (!ticket) {
      console.log(`Ticket with ID ${inputticketID} not found`);
      res.status(404).send('Ticket not found');
    } else {
      console.log(ticket.ticketdata); // Output the ticket data to the console
      res.redirect('QuestionForm.html');
    }
  });
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

*/


app.post('/viewticket', function (req, res) {
  const database = client.db('TicketDataCollection');
  const TicketItself = database.collection('TicketData');
  const query = { id: userid };
  const cursor = TicketItself.find(query);
  document.write(cursor);
});

app.listen(3000, () => {
  console.log('Running on port 3000!')
})

