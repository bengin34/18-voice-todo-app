import React from "react";
import { FiX } from "react-icons/fi";
const Todo = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="text-2xl font- text-center mt-6">
        Voice-based Todo Application
      </h2>
      <div className="border-dashed border-2 mt-5 border-gray-300 w-[50vh] h-[50vh] rounded-2xl ">
        <div className=" flex justify-center items-center text-center mt-5">
          <h3>Wash the Clothes</h3>
          <FiX className="mx-3" />
        </div>
        <div className="flex justify-center items-center text-center mt-5">
          <h3>Cook dinner</h3>
          <FiX className="mx-3" />
        </div>
        <div className="flex justify-center items-center text-center mt-5">
          <h3>Code more code</h3>
          <FiX className="mx-3" />
        </div>
      </div>
    </div>
  );
};

export default Todo;
