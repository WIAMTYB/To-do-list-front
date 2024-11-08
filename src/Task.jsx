import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import { URL } from "./data";
import Popup from "./Popup";
export default function Task({ task, setCounter, counter }) {
  const [isChecked, setIsChecked] = useState(task.completed);
  const [popup, setPopup] = useState(false);
  const handleChecked = () => {
    axios
      .put(`${URL}/api/todos/${task._id}`, { completed: !isChecked })
      .then((res) => {
        console.log(res.data);
        setIsChecked(res.data.completed);
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  };
  const handleDeleteTask = () => {
    axios
      .delete(`${URL}/api/todos/${task._id}`)
      .then((res) => {
        console.log(res.data);
        setCounter(counter + 1);
      })
      .catch((err) => {
        console.error("Error ", err);
      });
  };
  return (
    <div
      className={`flex justify-between border-b border-b-gray-300 px-2 ${
        isChecked && "bg-gray-300"
      } ${popup && "relative"}`}
    >
      {popup && <Popup task={task} setPopup={setPopup} counter={counter} setCounter={setCounter}/>}
      <div className="flex gap-x-3">
        <input type="checkbox" checked={isChecked} onChange={handleChecked} />
        <div className="flex flex-col gap-y-1">
          <p
            className={`text-lg font-semibold w-fit ${isChecked && "relative"}`}
          >
            {task.title}
            {isChecked && (
              <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gray-800"></span>
            )}
          </p>
          <p className="text-sm text-gray-500">
            {moment(task.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <div className="flex gap-x-3">
        <button onClick={()=> setPopup(true)} className="p-1 text-green-600">
          <MdEdit size={24} />
        </button>
        <button onClick={handleDeleteTask} className="p-1 text-red-600">
          <MdDelete size={24} />
        </button>
      </div>
    </div>
  );
}
