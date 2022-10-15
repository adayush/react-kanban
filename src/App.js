import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Kanban from "./components/kanban";
import Page from "./components/edit"
import "./index.css"

function App() {
  //const file = require("./data.json")
  if (!localStorage.getItem('data')) {
    console.log('Data not found, setting blank string')
    localStorage.setItem('data', JSON.stringify([]))
  }
  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')))

  const deleteTask = (statusId, taskId) => {
    const tmp_data = [...data]
    const s_index = tmp_data.findIndex(s => s.id == statusId)
    const t_index = tmp_data[s_index].tasks.findIndex(task => task.id === taskId)
    console.log(tmp_data[s_index].tasks)
    tmp_data[s_index].tasks.splice(t_index, 1)
    console.log(tmp_data[s_index].tasks)
    setData(tmp_data)
    localStorage.setItem('data', JSON.stringify(tmp_data))
  }
  return <Routes>
    <Route path='/' element={<Kanban data={data} setData={setData} />} />
    <Route path='/edit/:statusId/:taskId' element={<Page data={data} setData={setData} deleteTask={deleteTask} />} />
  </Routes>
}

export default App;
