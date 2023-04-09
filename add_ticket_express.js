var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://user:pass@avengerscluster.2s0a1da.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/QuestionForm.html')
  })
  
app.use(express.static(__dirname));

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

app.listen(3000, () => {
    console.log('Running on port 3000!')
  })

