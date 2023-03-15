import React from "react";
import { FiX } from "react-icons/fi";
import { getDocs, doc, collection, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../firebase-config";

const Todo = ({ databaseRef, update, setUpdate }) => {
  const [todoList, setTodoList] = useState([]);
  const getData = async () => {
    let data = await getDocs(databaseRef);
    setTodoList(data.docs.map((item) => ({ ...item.data(), id: item.id })));
  };

  useEffect(() => {
    getData();
    setUpdate(false);
  }, [update]);

  const deleteItems = (id) => {
    const data = doc(database, "todo-list", id);
    deleteDoc(data).then(() => {
      getData();
    });
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-2xl font- text-center mt-6">
        Voice-based Todo Application
      </h2>
      <div className="border-dashed border-2 mt-5 border-gray-300 w-[50vh] h-[50vh] rounded-2xl ">
        {todoList.map((todo) => {
          return (
            <div
              key={todo.id}
              className=" flex justify-center items-center text-center mt-5"
            >
              <h3>{todo.item}</h3>
              <FiX className="mx-3" onClick={() => deleteItems(todo.id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
