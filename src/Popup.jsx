import axios from "axios";
import React, { useState } from "react";
import { URL } from "./data";
import { MdClose } from "react-icons/md";

export default function Popup({ setPopup, task, setCounter, counter }) {
  const [updatedTitle, setUpdatedTitle] = useState(task.title);
  const handleEditTitle = () => {
    if (updatedTitle) {
      axios
        .put(`${URL}/api/todos/${task._id}`, { title: updatedTitle })
        .then((res) => {
          console.log(res.data);
          setCounter(counter + 1);
          setPopup(false);
        });
    }
  };
  return (
    <div className="absolute inset-0 bg-gray-900 flex justify-center items-center">
      <span
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-red-500 rounded-full p-1"
        onClick={() => setPopup(false)}
      >
        <MdClose size={24} />
      </span>
      <div>
        <input
          className="flex-1 rounded-l-lg py-2 px-3 outline-none caret-blue-600"
          type="text"
          placeholder="Add a task"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
        />
        <button
          onClick={handleEditTitle}
          className={`rounded-r-lg py-2 px-3 duration-200 text-white ${
            updatedTitle === ""
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-800 cursor-pointer"
          }`}
        >
          Update
        </button>
      </div>
    </div>
  );
}
