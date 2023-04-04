import React from 'react'
import { Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext.js'

const Navbar = () => {

    const { logOut, user } = UserAuth();

    const handleSignOut = async () => {
        try{
            await logOut()
        }
        catch(error){
            console.log("error");
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#333' }}>
            <div>
                {
                    user?.displayName ?
                    (<Link onClick={ handleSignOut } style={{ color: '#fff', marginLeft: '20px' }}>Log Out</Link>)
                    :
                    (<Link to='/' style={{ color: '#fff', marginLeft: '20px' }}>Sign In</Link>)
                }
            </div>
            <Link to='/dashboard' style={{ color: '#fff', marginLeft: '40px' }}>Dashboard</Link>
            <h1 style={{ color: '#fff', backgroundColor: '#222', padding: '10px', margin: '0 auto', textAlign: 'center' }}>
                Headstarter-Meet
            </h1>
            <Link to='/meeting' style={{ color: '#fff', marginLeft: '40px' }}>Meeting</Link>
            <Link to='/schedule' style={{ color: '#fff', marginLeft: '40px' }}>Schedule</Link>
        </div>
    )
}

export default Navbar