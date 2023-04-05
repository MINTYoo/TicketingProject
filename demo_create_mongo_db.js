
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://dontrand:123@test.ifummiy.mongodb.net/test";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
