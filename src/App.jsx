import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => setShowFinished(!showFinished);

  const handleEdit = (id) => {
    const selectedTodo = todos.find((t) => t.id === id);
    setTodo(selectedTodo.todo);
    setTodos(todos.filter((item) => item.id !== id));
    saveToLs();
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
    saveToLs();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLs();
  };

  const handleChange = (e) => setTodo(e.target.value);

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLs();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8 p-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-800 shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg tracking-tight">
          iTask: Organize Your Life
        </h1>

        <div className="addTodo mt-10">
          <h2 className="text-2xl font-semibold text-white mb-3">Add a New Task</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="What do you want to accomplish?"
              className="w-full md:w-3/4 p-4 text-lg bg-white/90 rounded-lg border-2 border-white focus:outline-none focus:ring-4 focus:ring-indigo-300"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95"
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="flex items-center mt-8 gap-2">
          <input
            type="checkbox"
            onChange={toggleFinished}
            checked={showFinished}
            className="rounded-full h-6 w-6 text-indigo-600 focus:ring-4 focus:ring-indigo-400 cursor-pointer"
          />
          <label className="text-white font-medium text-lg cursor-pointer">
            Show Completed Tasks
          </label>
        </div>

        <h2 className="text-2xl font-semibold text-white mt-10">Your Tasks</h2>
        <div className="grid gap-6 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {todos.length === 0 && (
            <div className="text-center text-gray-200 italic">
              No tasks to show. Get started by adding one!
            </div>
          )}
          {todos.map((item) => (
            (showFinished || !item.isCompleted) && (
              <div
                key={item.id}
                className={`flex justify-between items-center p-4 bg-white/90 rounded-xl shadow-lg transform transition duration-300 ${item.isCompleted ? "opacity-70 scale-95" : "scale-100"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="h-5 w-5 rounded text-indigo-600 focus:ring-4 focus:ring-indigo-300"
                  />
                  <span className={`text-lg ${item.isCompleted ? "line-through text-gray-500" : "text-gray-900"}`}>
                    {item.todo}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-indigo-500 hover:text-indigo-700 transition-colors duration-150"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-150"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
