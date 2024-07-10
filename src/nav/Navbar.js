import { NavLink} from 'react-router-dom'
import React, {useContext} from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const {user, logout} = useContext(UserContext);
    const navigate = useNavigate()

    const handleLogout = async (e) =>  {
        logout();
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
