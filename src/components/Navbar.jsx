import React, { useContext } from "react";
import { BiHomeSmile } from "react-icons/bi";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logOut } = useContext(AuthContext);

  const handleLogin = () => {
    navigate("/login");
  };
  const handleLogout = () => {
    logOut();
    navigate("/login");
  };
  return (
    <>
      <nav className="bg-gray-200 flex  h-[8vh]">
        <div className="container mx-auto py-4 flex sm:py-2 justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-500 sm:ml-2">Voi Todo</h1>
          <div className="flex space-x-10 sm:space-x-10 ">
            {currentUser && (
              <div className="flex justify-center items-center ">
                <img
                  src={currentUser.photoURL}
                  className="w-12 h-12  mr-3 hidden sm:block rounded-3xl "
                />
                <h5 className="mr-2  text-sm sm:text-xl    text-black capitalize">
                  {currentUser.displayName}
                </h5>
              </div>
            )}
            <button
              onClick={currentUser ? handleLogout : handleLogin}
              className="flex items-center space-x-2"
            >
              <span>
                <BiLogIn className="text-2xl" />{" "}
              </span>
              <span className="text-black pr-7 text-sm sm:text-xl ">
                {currentUser ? "Logout" : "Login"}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
