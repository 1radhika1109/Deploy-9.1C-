import React, { useEffect, useState } from 'react';
import Login from './Login'
import SignUp from './Signup';
import NavigationBar from './NavBar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import {auth } from './utils/firebase';
import "./App.css";


function App() {
  const [user, setUser] = useState();
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      setUser(user);
    });
  });

  return (
    <Router>
      <div className='container'>
        <NavigationBar />
        <div className='app'>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<SignUp/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;