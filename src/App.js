import Todo from "./components/Todo";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useEffect } from "react";
import {app, database} from './firebase-config'
import { collection, addDoc } from 'firebase/firestore';


function App() {
  const databaseRef = collection(database, 'todo-list');
  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: (commandData) => {
        addDoc(databaseRef, { item: commandData.data })
      
      },
    });
  }, []);

  return (
    <div>
      <Todo databaseRef={databaseRef}/>
    </div>
  );
}

export default App;


