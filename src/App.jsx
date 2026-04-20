import { Routes, Route, Link } from 'react-router-dom'
import TodoApp from "./todo/TodoApp"

export default function App() {
  return (
    <div  className='background'>
      <Routes>
        <Route path="/" element={<TodoApp />} />
        <Route path="/todo" element={<TodoApp/>} />       
      </Routes>
   </div>
  )
}


