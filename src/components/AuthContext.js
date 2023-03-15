import { auth } from "../firebase-config";
import { signInWithPopup, GoogleAuthProvider, signOut,onAuthStateChanged } from "firebase/auth";
import { useState,useEffect,createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState( JSON.parse(sessionStorage.getItem("user")) || false)

  useEffect(() => {
    userObserver();
  }, []);

   const signUpProvider = (navigate) => {
    const provider = new GoogleAuthProvider();
  
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  const logOut = () => {
    signOut(auth);
  };

  const userObserver = () => {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, photoURL } = user;
        setCurrentUser({ email, displayName, photoURL });
        sessionStorage.setItem(
          "user",
          JSON.stringify({ email, displayName, photoURL })
        );
      } else {
        setCurrentUser(false);
        sessionStorage.clear();
        // console.log("logged out");
      }
    });
  };
  
  const values = {
    signUpProvider,
    currentUser,
    signOut,
    userObserver,
    logOut
  }


  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider