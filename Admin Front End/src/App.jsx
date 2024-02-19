import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './components/Landing'
import Login from './components/Login'
import Appbar from './components/Appbar'
import Register from './components/Register'
import Dashboard from './components/Dashboard'

function App() {

  const [loggedIn, setLoggedIn] = useState(false);


  // Probably not required
  useEffect(() => {
    window.localStorage.getItem('token') && fetch("http://localhost:3000/admin/loggedIn", {
      method: 'GET',
      headers: {
        'authorization': 'bearer ' + window.localStorage.getItem('token'),
      }
    }).then(res => {
      if (res.status == 200) setLoggedIn(true);
    })
  }, [loggedIn])

  return (
    <>
      <Appbar loggedIn={loggedIn} setLoggedIn={(x) => setLoggedIn(x)} />
      <Router>
        <Routes>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/login"} element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path={"/register"} element={<Register />} />
          <Route path={"/dashboard"} element={<Dashboard />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
