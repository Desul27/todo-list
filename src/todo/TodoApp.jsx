import { useState, useEffect } from "react"
import "./TodoApp.css";
export default function TodoApp() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState(() => {
  const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : []
  })
  const[darkMode, setDarkMode] = useState(false)
 
 useEffect(() => { 
  localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])//simpan data ke local storage saat tasks ada perubahan
  

  const handleAdd = () => {
  if (task.trim() === "") return
  setTasks([...tasks, { text: task, completed: false }])
  setTask("")
}

const handleClear = () => {
  const confirmClear = window.confirm("Yakin mau hapus semua task?")

  if (confirmClear) {
    setTasks([])
  }
}
const handleDelete = (indexToDelete) => {
  const newTasks = tasks.filter((_, index) => index !== indexToDelete)
  setTasks(newTasks)
}
const handleToggle = (indexToToggle) => {
  const newTasks = tasks.map((item, index) => {
    if (index === indexToToggle) {
      return {
        ...item,
        completed: !item.completed
      }
    }
    return item
  })
  setTasks(newTasks)
}
return (
<div className={darkMode ? "container dark" : "container"}>
  <div className="card">
      <h1>To-Do App</h1>
      
      <button onClick={() => setDarkMode(!darkMode)}>
           {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
     
    <div  className="input-group">
      <input 
      type="text"
      value={task}
      onChange={(e) => setTask(e.target.value)}
      placeholder="Tambah tugas..."
      onKeyDown={(e)=>{if (e.key === "Enter") handleAdd()}}
      />
      <button onClick={handleAdd}  disabled={!task.trim()}>
      ➕
     </button>
   </div>

    <ul>
      {tasks.map((item, index) => (
         <li key={index}>
     
            <div className="task-left">
             <input 
              type="checkbox"
              checked={item.completed}
              onChange={() => handleToggle(index)}
             />
             <span className={item.completed ? "completed" : ""}> 
                 {item.text}
             </span>
           </div>

              <button onClick={() => handleDelete(index)}>
                  ❌
              </button>

         </li>
       ))}
   </ul>   
       <div className="clear-container">
           <button className="clear-btn" onClick={handleClear} disabled={tasks.length === 0}>
           Clear All
           </button>
       </div>
    </div>
</div>
  )
}

