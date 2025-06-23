"use client";
import { use, useState } from "react";
import TodoInputSection from "./componet/todoInputSection";
import { useEffect } from "react";
export default function Home() {
  const [newTask, setNewTask] = useState(null);
  const [task, addNewTaskFromBtn] = useState([]);

  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem("tasks")) || [];
    addNewTaskFromBtn(savedTask);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  function addTask() {
    console.log(newTask);
    if (newTask !== null) {
      const addNewTask = { id: task.length + 1, task: newTask };
      addNewTaskFromBtn((task) => [...task, addNewTask]);
    } else {
      alert("You didnt input anything");
    }
  }

  function checkId(id) {
    const specifyId = id;
    addNewTaskFromBtn((task) => {
      return task.map((user) => {
        if (user.id === specifyId) {
          return { ...user, checked: !user.checked };
        }
        return user;
      });
    });
  }

  function checkIfItsChecked() {
    const numberDone = task.filter((user) => user.checked === true);
    return numberDone.length;
  }

  function deleteElement(id) {
    const updatedTask = task.filter((user) => user.id !== id);
    addNewTaskFromBtn(updatedTask);
  }

  return (
    <div className="border border-gray-300 dark:border-gray-700 shadow-md max-w-2xl w-full p-6 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-300">
      <h1 className="text-4xl font-mono font-extrabold text-center py-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
        ✨ TODO-List
      </h1>

      <TodoInputSection setNewTask={setNewTask} addTask={addTask} />

      <div id="taskList" className="space-y-3 mb-6">
        {task.map(({ id, task, checked }) => {
          return (
            <div
              key={id}
              className="flex items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:border-blue-400 transition-all duration-300"
            >
              <div className="flex items-center flex-1">
                <input
                  id={id}
                  onClick={() => {
                    checkId(id);
                  }}
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 text-pink-500 focus:ring-pink-500 mr-3"
                />
                <span className={checked ? "text-lg line-through" : "text-lg"}>
                  {task}
                </span>
              </div>
              <button
                id={id}
                onClick={() => {
                  deleteElement(id);
                }}
                className="text-gray-500 dark:text-gray-400 hover:text-pink-500 ml-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border border-gray-300 dark:border-gray-600">
        <div className="flex justify-between text-sm">
          <div className="text-center">
            <div id="pendingCount" className="text-2xl font-bold text-pink-500">
              {task.length - checkIfItsChecked()}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Pending</div>
          </div>
          <div className="text-center">
            <div
              id="completedCount"
              className="text-2xl font-bold text-blue-500"
            >
              {checkIfItsChecked()}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Completed</div>
          </div>
          <div className="text-center">
            <div id="totalCount" className="text-2xl font-bold text-purple-500">
              {task.length}
            </div>
            <div className="text-gray-500 dark:text-gray-400">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
}
