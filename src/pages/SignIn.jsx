import React, { useEffect }from "react";
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext.js'
import { useNavigate } from 'react-router-dom';


const SignIn = () => {

    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () =>{
        try{
            await googleSignIn();
        } 
        catch(error){
            console.log(error)
        }
    };

    useEffect(() => {
        if(user != null){
            navigate('/dashboard');
        }
    }, [user]);


    return (
        <div>
            <h1>Sign In</h1>
            <div>
                <GoogleButton style={{ margin: "auto" }}onClick = {handleGoogleSignIn}/>
            </div>
        </div>
    );
};

export default SignIn;