import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Navbar from '../components/Navbar'
import Login from '../pages/Login'
import Footer from '../components/Footer'
const AppRouter = () => {
  return (
    <>
     <Navbar />
     <Routes>
        <Route path='/' element={<Home />}  />
        <Route path='/login' element={<Login />}  />
     </Routes> 
     <Footer />
    </>
  )
}

export default AppRouter
