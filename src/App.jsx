import React from "react";
import { useState, useEffect } from "react";
import "tailwindcss";

function App(){
    const [todos, setTodos] = useState(() => {
       const saved = localStorage.getItem("todos");
       return saved ? JSON.parse(saved) : [];
    });
    const [inputText, setInputText] = useState("");
    const [inputTag, setInputTag] = useState("")
    const [selectedTag, setSelectedTag] = useState("All")
    const [completedTodos, setCompletedTodos] = useState(() => {
       const saved = localStorage.getItem("completedTodos");
       return saved ? JSON.parse(saved) : [];
    })
   const[deletedTodoTab, setDeletedTodoTab] = useState(() => {
      const saved = localStorage.getItem("deletedTodos");
      return saved ? JSON.parse(saved) : [];
   })


   // To DELETE SAVED DATA
  //  useEffect(() => {
  //   localStorage.removeItem("todos");
  //   localStorage.removeItem("completedTodos");
  //   localStorage.removeItem("deletedTodos");
  // }, []);


   // TO SAVE THE DATA
     useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
  }, [completedTodos]);

  useEffect(() => {
    localStorage.setItem("deletedTodos", JSON.stringify(deletedTodoTab));
  }, [deletedTodoTab]);


// STATE AND FUNCTION HANDLERS
  const handleInput = (e) => {
   const valued = e.target.value
  //  console.log(valued);
   setInputText(valued)
  }   

   const options = ["Work", "Home", "Education", "Skill"]

  const handleInputTag = (e) => {
    const values = e.target.value
    // console.log(values)
    setInputTag(values)
  }
  
  const handleAddTodo = () => {
    if(!inputText.trim()) return;

    const newTodo = {
      id: crypto.randomUUID(),
      text: inputText,
      tag: inputTag,
      timestamp: new Date().toLocaleString(),
      completed: false,
    };

    setTodos([newTodo, ...todos])
    setInputText("");
    setInputTag("");
    console.log([newTodo, ...todos])

  }

  const filteredTodos = 
    selectedTag === "All"
    ? todos : todos.filter((todo) => todo.tag === selectedTag)


  const handletodoCompleted = (id) => {
  //   const updatedTodos = todos.map((todo) =>
  //   todo.id === id ? {...todo, completed: !todo.completed} : todo);
  //   setTodos(updatedTodos)
const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  const updatedTodos = todos.filter((t) => t.id !== id);
  const updatedCompleted = [{ ...todo, completed: true }, ...completedTodos].slice(0, 5);

  setTodos(updatedTodos);
  setCompletedTodos(updatedCompleted);
}  
  
  
  const handleDelete = (id) => {
  //  const deletedTodo = todos.find((todo) => todo.id === id);
  // console.log("Deleted Todo:", deletedTodo);

  //   const updatedTodo = todos.filter((todo) => todo.id !== id);
  //   console.log(updatedTodo)
  //   setTodos(updatedTodo)
    const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  const updatedTodos = todos.filter((t) => t.id !== id);
  const updatedDeleted = [{ ...todo, deleted: true }, ...deletedTodoTab].slice(0, 5);

  setTodos(updatedTodos);
  setDeletedTodoTab(updatedDeleted); 
  console.log("Deleted Todo:", todo);
  }  

  
    
  return(
<div className="min-h-screen bg-gradient-to-br from-[#2E8B57] via-[#3CB371] to-[#FFD700]/40 text-white flex flex-col items-center p-6">

  <h1 className="text-4xl font-extrabold mb-6 text-center text-[#14532d] text-outline-white">
    TASK MANAGER
  </h1>

  <div className="flex w-full max-w-6xl bg-[#222222] rounded-2xl shadow-2xl overflow-hidden">

    {/* Main Section */}
    <div className="flex-1 p-6">
      {/* Input & Filter */}
      <div className="bg-[#2E8B57]/30 p-4 rounded-xl mb-6 shadow-lg flex flex-wrap gap-4 items-center justify-center border border-white">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your Tasks..."
          className="px-4 py-2 rounded-lg border border-[#FFD700] 
                     focus:outline-none focus:ring-2 focus:ring-[#2E8B57] 
                     bg-[#262626] text-white font-bold placeholder-gray-400"
        />
        <select
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          className="px-4 py-2 rounded-lg border border-[#FFD700] 
                     focus:outline-none focus:ring-2 focus:ring-[#FFD700] 
                     bg-[#262626] text-white"
        >
          <option value="" disabled>Select Tag...</option>
          {options.map((list) => (
            <option key={list} value={list}>
              {list}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddTodo}
          className="bg-[#FFD700] hover:bg-[#2E8B57] text-black hover:text-white font-bold
                     px-5 py-2 rounded-lg shadow-md transition transform hover:scale-105"
        >
          Add Task
        </button>

        {/* Filter */}
        <div className="flex items-center gap-2 ml-auto">
          <strong>Filter:</strong>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-2 rounded-full bg-[#FFD700] text-black 
                       font-extrabold shadow-lg hover:shadow-[#FFD700]/50 transition"
          >
            <option value="All">All</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredTodos.length === 0 ? (
          <div className="col-span-full text-center text-gray-400">
            NO TASKS TO VIEW
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="bg-[#0d0d0d] rounded-xl p-4 shadow-lg 
                         hover:shadow-[#FFD700]/50 transition transform hover:scale-105 border border-white"
            >
              <strong className="block text-lg text-white">{todo.text}</strong>
              <span className="block text-sm text-[#FFD700] font-bold">{todo.tag}</span>
              <small className="block mt-1 text-gray-400 font-bold">
                {todo.timestamp}
              </small>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 font-bold text-white rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => handletodoCompleted(todo.id)}
                  className="bg-[#2E8B57] hover:bg-[#3CB371] px-3 py-1 rounded-lg font-bold text-white"
                >
                  {todo.completed ? "Undo" : "Complete"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    {/* Sidebar */}
    <div className="w-80 bg-[#222222] border-l border-[#FFD700]/50 p-6 flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold mb-3 text-[#3CB371]">
          ✔ Completed Tasks
        </h2>
        <ul className="space-y-2">
          {completedTodos.length === 0 ? (
            <li className="text-gray-400">No completed tasks</li>
          ) : (
            completedTodos.map((todo) => (
              <li
                key={todo.id}
                className="bg-[#0d0d0d] p-3 rounded-lg shadow hover:shadow-[0_0_25px_5px_#3CB371] transition border border-white"
              >
                <strong className="text-white">{todo.text}</strong>
                <br />
                <small className="text-gray-400">{todo.timestamp}</small>
              </li>
            ))
          )}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3 text-red-500">
          🗑 Deleted Tasks
        </h2>
        <ul className="space-y-2">
          {deletedTodoTab.length === 0 ? (
            <li className="text-gray-400">No deleted tasks</li>
          ) : (
            deletedTodoTab.map((todo) => (
              <li
                key={todo.id}
                className="bg-[#0d0d0d] p-3 rounded-lg shadow hover:shadow-[0_0_25px_5px_#f87171] transition border border-white"
              >
                <strong className="text-white">{todo.text}</strong>
                <br />
                <small className="text-gray-400">{todo.timestamp}</small>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  </div>
</div>

  );
}

export default App
