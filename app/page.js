"use client";
import { use, useState } from "react";
import TodoInputSection from "./componet/todoInputSection";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [newTask, setNewTask] = useState("");
  const [task, addNewTaskFromBtn] = useState([]);

  useEffect(() => {
    const savedTask = JSON.parse(localStorage.getItem("tasks")) || [];
    addNewTaskFromBtn(savedTask);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  function getCurrentTime() {
    const date = new Date().toLocaleString();
    return date;
  }

  function addTask() {
    toast.loading("Adding new Task");
    if (newTask !== "") {
      var taskId = 0;
      if (task.length == 0) {
        taskId = 1;
      } else {
        taskId = task[task.length - 1].id + 1;
      }
      const addNewTask = {
        id: taskId,
        task: newTask,
        checked: false,
        time: getCurrentTime(),
      };
      addNewTaskFromBtn((task) => [...task, addNewTask]);
      toast.dismiss();
      toast.success("Task sucessfully added.");
      setNewTask("");
    } else {
      toast.dismiss();
      toast.warning("Add a new task");
    }
  }

  function checkId({ id }) {
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
  
  function checkIftheIdISChecked(id) {
    const numberDone = task.find((user) => user.id === id);
    if (!numberDone.checked === true) {
      toast.success(`You finished your task at ${getCurrentTime()}`);
    }
  }

  function deleteElement(id) {
    const updatedTask = task.filter((user) => user.id !== id);
    addNewTaskFromBtn(updatedTask);
    toast.error("You have deleted this task");
  }

  return (
    <>
      <ToastContainer />
      <div className="max-w-2xl w-full p-6 mx-auto bg-gray-900 border  border-gray-700 rounded-2xl shadow-md transition-all duration-300">
        <h1 className="text-4xl font-mono font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
          ✨ TO-DO List
        </h1>

        <TodoInputSection
          setNewTask={setNewTask}
          addTask={addTask}
          newTask={newTask}
        />

        <div id="taskList" className="space-y-4 my-6">
          {task.map(({ id, task, checked, time }) => (
            <div
              key={id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-gray-800 border border-gray-700 hover:border-blue-400 transition-all duration-300"
            >
              <div className="flex items-start sm:items-center flex-1">
                <input
                  id={id}
                  onChange={() => {
                    checkId({ id });
                    checkIftheIdISChecked(id);
                  }}
                  defaultChecked={checked}
                  type="checkbox"
                  className="h-5 w-5 mt-1 sm:mt-0 mr-3 rounded border-gray-600 bg-gray-800 text-pink-500 focus:ring-pink-500"
                />
                <span
                  className={`text-lg ${
                    checked ? "line-through text-gray-300" : ""
                  }`}
                >
                  {task}
                </span>
              </div>

              <div className="flex justify-between items-center sm:justify-end sm:items-center w-full sm:w-auto">
                <span className="bg-gray-700 text-xs text-gray-300 px-3 py-1 rounded-full whitespace-nowrap">
                  {time}
                </span>

                <button
                  id={id}
                  onClick={() => deleteElement(id)}
                  className="ml-3 text-gray-400 hover:text-pink-500 transition"
                  title="Delete"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
            </div>
          ))}
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700">
          <div className="grid grid-cols-3 text-center gap-4 text-sm">
            <div>
              <div
                id="pendingCount"
                className="text-2xl font-bold text-pink-500"
              >
                {task.length - checkIfItsChecked()}
              </div>
              <div className="text-gray-400">Pending</div>
            </div>
            <div>
              <div
                id="completedCount"
                className="text-2xl font-bold text-blue-500"
              >
                {checkIfItsChecked()}
              </div>
              <div className="text-gray-400">Completed</div>
            </div>
            <div>
              <div
                id="totalCount"
                className="text-2xl font-bold text-purple-500"
              >
                {task.length}
              </div>
              <div className="text-gray-400">Total</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
