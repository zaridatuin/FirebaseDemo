import './App.css';
//import Modal from './components/Modal';
//import ReminderList from './components/ReminderList';
import { BrowserRouter, Route, NavLink, Routes,Navigate , Link} from 'react-router-dom'

import React, {useState} from 'react';

import About from './pages/About'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Article from './pages/Article'
import FormArticle from './pages/FormArticle'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Navbar from './Navbar'
import { UserContext } from './context/UserContext';

function App() {

  const [user, setUser] = useState('')

  return (
    <UserContext.Provider value={{ user, setUser }}>
    <div className="App">
      <BrowserRouter>
        <Navbar />


        <Routes>
          <Route path="/" element={user ? <Home/> : <Login />}/>
          <Route path="/about" element={user ?<About /> : <Login />}/>
          <Route path="/contact" element={user ?<Contact />  : <Login />}/>
          <Route path="/articles/:urlId" element={user ?<Article/> : <Login />}/>
          <Route path="/edit/:urlId" element={user ?<FormArticle /> : <Login />}/>
          <Route path="/new" element={user ?<FormArticle /> : <Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup /> }/>
          <Route path="/*" element={<Navigate to="/"/> }/>
        </Routes>

      </BrowserRouter>
    </div>
    </UserContext.Provider>
  );
}

export default App;
