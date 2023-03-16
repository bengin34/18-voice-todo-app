import React from "react";
import { FiX } from "react-icons/fi";
import { getDocs, doc, deleteDoc, collectionGroup } from "firebase/firestore";
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
    <div className="  flex justify-center h-[92vh]  bg-gray-800 items-center flex-col">
      <h2 className="text-3xl font- text-center mt-6 text-[#ff2625] opacitiy-5">
        Say "Add ..." ( e.g. "Add study React")
      </h2>
      <div className=" container mx-auto border-4 mt-5 border-red-700 bg-gray-300 p-5 rounded-2xl ">
        {todoList.map((todo) => {
          return (
            <div
              key={todo.id}
              className=" flex justify-between items-center text-center mx-1  w-[100%]  mt-5"
            >
              <div className="flex items-center">
                {" "}
                <img
                  src={todo.user?.photoURL}
                  className="rounded-[50%] w-12 h-12 mr-3"
                />
                <h3 className="text-lg">{todo.user?.displayName}</h3>
              </div>

              <h3 className="text-xl ml-5">{todo.item}</h3>
              <FiX
                className="mx-3 text-xl text-red-800 "
                onClick={() => deleteItems(todo.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
