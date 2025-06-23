export default function TodoInputSection({ setNewTask, addTask }) {
  return (
    <div className="flex flex-col sm:flex-row mb-6 group w-full">
      <input
        id="taskInput"
        type="text"
        placeholder="Add a new task..."
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
        className="flex-1 px-4 py-3 rounded-t-lg sm:rounded-l-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all duration-300 group-hover:shadow-neon-sm w-full sm:w-auto"
      />
      <button
        id="addTaskBtn"
        onClick={addTask}
        className="mt-2 sm:mt-0 sm:ml-2 px-5 py-3 rounded-b-lg sm:rounded-r-lg bg-gradient-to-r from-purple-500 to-blue-500 font-medium hover:shadow-neon transition-all duration-300 w-full sm:w-auto"
      >
        Add
      </button>
    </div>
  );
}
