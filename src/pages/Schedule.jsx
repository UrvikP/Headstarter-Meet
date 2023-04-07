import React from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import "./Schedule.css";


const Schedule = () => {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send("service_boqxtij","template_ksuoxyq",{
        message: message,
        subject: subject,
        email: email,
        }, "4jG-pY2QT7n7S8m1j");

    setEmail("");
    setSubject("");
    setMessage("");
};
  return(
    <div className="wrapper-center">
        <form onSubmit={sendEmail} className="form-style">
            <h1>Send Email</h1>
            <input type="text" placeholder="Subject" value={subject} onChange={(e) => {setSubject(e.target.value)}} />
            <br></br>
            <input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => {setEmail(e.target.value)}} />
            <br></br>
            <textarea type="message" placeholder="Type your message here" value={message} onChange={(e) => {setMessage(e.target.value)}} />
            <br></br>
            <button type="submit" className="btn">Send Email</button>
        </form>
    </div>
  )
};

export default Schedule;