const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://USER:PASS@avengerscluster.2s0a1da.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('TicketDataCollection');
    const TicketItself = database.collection('TicketData');

    // Query for a tickets
    const query = { title: 'Help please' };
    const ticket = await TicketItself.findOne(query);

    console.log(ticket);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);