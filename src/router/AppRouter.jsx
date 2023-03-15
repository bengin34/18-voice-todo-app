import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Navbar from '../components/Navbar'
import Login from '../pages/Login'
const AppRouter = () => {
  return (
    <>
     <Navbar />
     <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/login' element={<Login />}  />
     </Routes> 
    </>
  )
}

export default AppRouter
