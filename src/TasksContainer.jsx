import React from "react";
import Task from "./Task";

export default function TasksContainer({ tasks,setCounter, counter }) {
  return (
    <div className="flex flex-col">
      {tasks.map((task) => (
        <Task setCounter={setCounter} counter={counter} key={task._id} task={task} />
      ))}
    </div>
  );
}
