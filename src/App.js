import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Kanban from "./components/kanban";
import Page from "./components/page"
import "./index.css"

function App() {
  //const file = require("./data.json")
  if (!localStorage.getItem('data')) {
    console.log('Data not found, setting blank string')
    localStorage.setItem('data', JSON.stringify([]))
  }
  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')))

  return <Routes>
    <Route path='/' element={<Kanban data={data} setData={setData} />} />
    <Route path='/edit/:pageId/:taskId' element={<Page />} />
  </Routes>
}

export default App;
