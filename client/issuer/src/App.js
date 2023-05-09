import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import Create from "./components/create";
import Issuer from "./components/issuer";
import Responder from "./components/responder.js";
import Intro from "./components/intro";
import "./issuer.css";
const App = () => {
 return (
   <div className="background">
     <Navbar />
     <Routes>
       <Route path="/create" element={<Create />} />
       <Route path="/issuer" element={<Issuer />} />
       <Route path="/responder" element={<Responder />}/>
     </Routes>
     <Intro/>
   </div>

   
 );
};
 
export default App;