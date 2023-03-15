import React, { useContext } from "react";
import  {BiHomeSmile} from 'react-icons/bi'
import {BiLogIn} from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";


const Navbar = () => {

  const navigate = useNavigate();
const {currentUser, logOut} = useContext(AuthContext)
console.log(currentUser)
  
const handleLogin = () => {
  navigate("/login")
}
const handleLogout = () => {
logOut()
navigate("/login")

}
  return (
    <>
      <nav className="bg-gray-200 ">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-500">Voi Todo</h1>
          <div className="flex space-x-10">
          {currentUser && (
              <h5 className="mr-2 text-xl text-black capitalize">{currentUser.displayName}</h5>
            )}
            <button onClick={currentUser ? handleLogout : handleLogin } className="flex items-center space-x-2">
              <span><BiLogIn className="text-2xl" /> </span>
              <span className="text-black pr-7">{currentUser ? 'Logout' : 'Login'}</span>

              
            </button>
          </div>
         
        </div>
      </nav>
    </>
  );
};

export default Navbar;
