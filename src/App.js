// import Todo from "./components/Todo";
// import alanBtn from "@alan-ai/alan-sdk-web";
// import { useEffect, useState } from "react";
// import { app, database } from "./firebase-config";
// import { collection, addDoc } from "firebase/firestore";
import AppRouter from "./router/AppRouter";

function App() {
  // const [update, setUpdate] = useState(false);

  // const databaseRef = collection(database, "todo-list");
  // useEffect(() => {
  //   alanBtn({
  //     key: process.env.REACT_APP_ALAN_KEY,
  //     onCommand: (commandData) => {
  //       addDoc(databaseRef, { item: commandData.data }).then(() => {
  //         setUpdate(true);
  //       });
  //     },
  //   });
  // }, []);

  return (
    <div>
      {/* <Todo databaseRef={databaseRef} update={update} setUpdate={setUpdate} /> */}
      <AppRouter/>
    </div>
  );
}

export default App;
