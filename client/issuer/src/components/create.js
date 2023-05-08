import React, { useState } from "react";
import { useNavigate } from "react-router";
import '../issuer.css';

export default function Create() {
 const [form, setForm] = useState({
   IssuerID: "",
   ticketdata: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newTicket = { ...form };
 
   await fetch("http://localhost:3000/newTicket", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newTicket),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ IssuerID: "", ticketdata: "" });
   navigate("/issuer");
   alert("Message been sent!");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
  <div className="background">

   <div>
     <h3>Create New Ticket</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="name">issuerID</label>
         <input
           type="text"
           className="form-control"
           id="name"
           value={form.name}
           onChange={(e) => updateForm({ IssuerID: e.target.value })}
         />
         <label htmlFor="ticketData">Ticket Data</label>
         <input  
         type = "text" 
         className="form-control" 
         id = "ticketdata" 
         alue = {form.ticketdata}
         onChange={(e) => updateForm({ticketdata: e.target.value})}
         />
       </div>
       
      <br></br>
       <div className="form-group">
         <input
           type="submit"
           value="Create ticket"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
   </div>
 );
}