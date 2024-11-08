import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { URL } from "./data";
import TasksContainer from "./TasksContainer";
export default function App() {
  const [addTask, setAddTask] = useState("");
  const [counter, setCounter] = useState(0);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios(`${URL}/api/todos`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [counter]);
  const handleAddTask = () => {
    if (addTask.trim() !== "") {
      axios
        .post(`${URL}/api/todos`, { title: addTask })
        .then((res) => {
          console.log(res.data)
          setAddTask("")
          setCounter(counter + 1)
        })
        .catch((err) => console.error("Error ", err));
    }
  };
  return (
    <div className="flex flex-col w-[800px] mx-auto gap-y-3 bg-gray-100 p-2 rounded-xl">
      <h1 className="text-5xl text-blue-600 text-center">To Do List</h1>
      <div className="border border-blue-600 rounded-lg flex flex-1 p-1">
        <input
          className="flex-1 rounded-l-lg py-2 px-3 outline-none caret-blue-600"
          type="text"
          placeholder="Add a task"
          value={addTask}
          onChange={(e) => setAddTask(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className={`rounded-r-lg py-2 px-3 duration-200 text-white ${
            addTask === ""
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-800 cursor-pointer"
          }`}
        >
          <IoMdAdd size={24} />
        </button>
      </div>
      <TasksContainer setCounter={setCounter} counter={counter} tasks={tasks}/>
    </div>
  );
}
