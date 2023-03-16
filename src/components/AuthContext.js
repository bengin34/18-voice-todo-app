import { auth } from "../firebase-config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
} from "firebase/auth";
import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || false
  );

  useEffect(() => {
    userObserver();
  }, []);

  const signUpProvider = (providerName, navigate) => {
    let provider;
    if (providerName === "google") {
      provider = new GoogleAuthProvider();
    } else if (providerName === "github") {
      provider = new GithubAuthProvider();
    }

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
    setCurrentUser(null);
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
      }
    });
  };

  const signUpWithGoogle = (navigate) => {
    signUpProvider("google", navigate);
  };

  const signUpWithGithub = (navigate) => {
    signUpProvider("github", navigate);
  };

  const values = {
    signUpProvider,
    currentUser,
    signOut,
    userObserver,
    logOut,
    signUpWithGoogle,
    signUpWithGithub,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
