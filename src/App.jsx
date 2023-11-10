import './App.css';
import React, {useState, useEffect} from 'react';

import Main from './Components/Main/Main'

import Navbar from './Components/Navbar/Navbar'

import Loginimg from './Components/SignIn/Loginimg';


function App() {
  const { loggedIn, setLoggedIn } = useState(false)

  return (
    <div className='mainDiv'>
      {loggedIn ? <Loginimg />
        : <>
          <Navbar />
          <Main />
        </>
      }

    </div>
  )
}

export default App
