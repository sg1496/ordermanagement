import './App.css';
import React, { useState, useEffect } from 'react';

import Main from './Components/Main/Main'

import Navbar from './Components/Navbar/Navbar'

import Loginimg from './Components/SignIn/Loginimg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import verifyToken from './Components/SignIn/VerifyToken'
import verifyToken from './Components/SignIn/verifyToken';


function App() {
  const navigate = useNavigate()
  const isLogin = useSelector(st => st.LoginSlices.data)
  const [isUser, setisUser] = useState(false)
  const loginToken= verifyToken()


  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const decodedToken = verifyToken(token)
    // const expired = isTokenExpired(token);

    console.log('Decoded Token:-', decodedToken);
    if (decodedToken) {
      console.log('Token is not expired');
    } else {
      // Token is invalid or expired
      console.log('Invalid Token');
      console.log('Token has expired');
      // Handle invalid token scenario here
    }

   
  }, []);

  useEffect(() => {
    if (loginToken && localStorage.getItem('token')) {
      setisUser(true)
    } else {
      setisUser(false)
    }

  }, [localStorage.getItem('token'), isUser, setisUser])

  // console.log('isUser', isLogin);

  return (
    <div className='mainDiv'>

      {(isUser) ? <>
        <Navbar />
        <Main />
      </> : <Loginimg />
      }

    </div>
  )
}

export default App




