import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#333' }}>
            <Link to='/' style={{ color: '#fff', marginLeft: '20px' }}>Sign In</Link>
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