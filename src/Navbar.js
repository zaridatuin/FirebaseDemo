
import './App.css';
//import Modal from './components/Modal';
//import ReminderList from './components/ReminderList';
import { BrowserRouter, Route, NavLink, Routes,Navigate , Link} from 'react-router-dom'

import React, {useState, useContext} from 'react';

import { UserContext } from './context/UserContext';

import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, confirmPasswordReset } from 'firebase/auth'


export default function Navbar() {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate()

    const handleLogout = (e) =>  {    
        const authentication = getAuth();      
        authentication.signOut();        
        setUser(null)
        navigate('/login')
      }

    return (
        <nav>
          <h1>My Articles</h1>          
          {user && (
          <>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/new">New Article</NavLink>
          </>
          )}
          {!user && (
            <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
            </>
          )
          
          }          

          {user && (
          <>
          hello, {user}
          <button className="btn" onClick={handleLogout}>Logout</button>
          </>
          )}

        </nav>    
    )
}
