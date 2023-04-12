import React from "react";
import { useState } from "react";
import  Button  from "@mui/material/Button";
import VideoCall from "../components/VideoCall.js"

const Meeting = () => {
    const [inCall, setInCall] = useState(false);


    return (
        <div style = {{height: "100%"}}>
            <h1>Meeting</h1>
            <div style = {{height : "500px"}}>
                {inCall ? (<VideoCall setInCall = {setInCall} />) : (<Button variant = "contained" color ="primary" onClick ={() => setInCall(true)}>Join Call</Button>)}
            </div>
        </div>
    );
};

export default Meeting;