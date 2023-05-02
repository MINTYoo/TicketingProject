import React, { useState } from "react";
import axios from "axios";

// '/searchIssuer'
const Issuer = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
  /*
    const handleSearch = async () => {
      try {
        //const client = await MongoClient.connect("mongodb://localhost:27017");
       // const db = client.db("myDatabase");
        //const collection = db.collection("myCollection");
  
        /*const results = await collection.find({
          $text: { $search: searchQuery }
        }).toArray();
  
        //setSearchResults(results);
      } catch (error) {
        console.error(error);
      } finally {
        //mongoose.disconnect();
      }
    };
  */
    const handleSearch = async () => {
        try {
          const response = await axios.post("http://localhost:3000/searchIssuer", {
            searchQuery
          });
          setSearchResults(response.data.issuerID);
          console.log();
        } catch (error) {
          console.error(error);
        }
      };
    return (
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />
        <button onClick={handleSearch}>Issuer ID</button>
        {searchResults.map(result => (
          <div key={result.issuerID}>{result.ticketdata}</div>
        ))}
      </div>
    );
  };
  
  export default Issuer;