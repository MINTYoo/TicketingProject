import React from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
export default function Navbar() {
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light" >
       <NavLink className="navbar-brand" to="/">
        <h1>Ticketing System</h1>       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
 
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           <li className="nav-item">
             <NavLink className="nav-link" to="/create">
               Add Ticket
             </NavLink>
           </li>
           <li className="nav-item">
            <NavLink className="nav-link" to="/issuer">
              Issuer
            </NavLink>
           </li>
           <li className="nav-item">
            <NavLink className = "nav-link" to="/responder">
              Responder
            </NavLink>
            </li>
            
         </ul>
       </div>
       <div  >
          <h6 className="nav-item ml-auto" style={{ color: 'black', position: 'absolute', bottom: 0, right: 0 }}>
            Made By CS Avengers: Nick Naras, Don Tran, Ruben Cerda, Kevin Anderson.
          </h6>
        </div>
     </nav>
   </div>
 );
}