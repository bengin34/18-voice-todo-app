import React from "react";
import Todo from "../components/Todo";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect, useState } from "react";
import { app, database } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";

const Home = () => {
  const [update, setUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);
console.log(currentUser)
  const databaseRef = collection(database, "todo-list");
  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: (commandData) => {
        addDoc(databaseRef, { item: commandData.data }).then(() => {
          setUpdate(true);
        });
      },
    });
  }, []);
  return (
    <div>
      {currentUser ? (
        <Todo databaseRef={databaseRef} update={update} setUpdate={setUpdate} />
      ) : (
        "Please Login to see your todos"
      )}
    </div>
  );
};

export default Home;
