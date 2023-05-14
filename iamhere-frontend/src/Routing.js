import React from 'react';
import Register from './Register/Register.js';
import Login from './Login/Login.js';


import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import NotFound from './NotFound/NotFound.js';

const Routing = () => (

  <main>
    <Router>
    <Routes>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='*' element={<NotFound/>}/>
      <Route exact path='/login' element={<Login/>}/>
    </Routes>
    </Router>
  </main>

)

export default Routing;