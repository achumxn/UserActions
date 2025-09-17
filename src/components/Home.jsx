import React from 'react'
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

const Home = () => {
    const { user, logout } = useAuth();
    return (
        <div>
            <Navbar/>
            <div className="welcome">
                <h1>Welcome, {user?.userName || "Guest"} </h1>
                <p>Explore our freshly brewed coffee collection.</p>
            </div>
        </div>
    )
}

export default Home
