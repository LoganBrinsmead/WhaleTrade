import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Body from './component/Body'
import Login from './component/Login';
import SignUp from './component/SignUp';


function Home() {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='signUp' element={<SignUp/>} />
      </Routes>
    </Router>
  );
}

export default App;
