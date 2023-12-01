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

/**
* @description This is a higher-order function that creates an authentication context
* provider using the `auth` object from the Google Authentication API.
* 
* @returns { object } This function defines an authentication context provider for
* a React application using Firebase Auth.
*/
const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || false
  );

  useEffect(() => {
    userObserver();
  }, []);

/**
* @description This function sets up a popup window to sign the user up with a social
* media provider (either Google or Github).
* 
* @param { string } providerName - The `providerName` input parameter determines
* which authentication provider to use based on its string value:
* 
* 	- "google" for Google Auth Provider
* 	- "github" for GitHub Auth Provider
* 
* @param {  } navigate - The `navigate` parameter is a function that will be called
* after the authentication process is completed with a successful result. It takes
* the providerName as an argument and redirects to a specific URL or route.
* 
* @returns { Promise } The `signUpProvider` function takes two arguments: `providerName`
* and `navigate`. It returns a Promise that resolves with the result of signing up
* with the chosen authentication provider (either Google or GitHub).
*/
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

/**
* @description The `logOut` function signs the user out of the application by calling
* the `signOut` function with the `auth` object as a parameter.
* 
* @returns { any } The function `logOut` returns nothing (undefined) because it does
* not return a value from its implementation. The function simply calls two other
* functions: `signOut(auth)` and `setCurrentUser(null)`, without returning any value
* from those calls.
*/
  const logOut = () => {
    signOut(auth);
    setCurrentUser(null);
  };

/**
* @description This function sets up an observer for changes to the authentication
* state and updates the current user information based on the authenticated user.
* 
* @returns { object } The `userObserver` function is an anonymous function that
* updates the `currentUser` state and stores it locally using `sessionStorage`
* whenever the authentication state changes.
*/
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

/**
* @description This function registers a user using Google as the provider and
* navigates to the next page upon successful registration.
* 
* @param {  } navigate - The `navigate` input parameter is used to pass the redirect
* URI for the Google OAuth2 authorization flow.
* 
* @returns {  } The function `signUpWithGoogle` takes one argument `navigate`, and
* returns nothing (i.e., `undefined`).
*/
  const signUpWithGoogle = (navigate) => {
    signUpProvider("google", navigate);
  };

/**
* @description This function signs up the user with GitHub.
* 
* @param {  } navigate - The `navigate` parameter is a function that is called after
* the sign-up process is complete.
* 
* @returns { Promise } The function `signUpWithGithub` takes one argument `navigate`,
* and it returns nothing (`undefined`).
*/
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
