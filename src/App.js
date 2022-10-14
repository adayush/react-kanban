import { Routes, Route } from 'react-router-dom';

import Kanban from "./components/kanban";
import Page from "./components/page"
import "./data.json"
import "./index.css"

function App() {
  if (!localStorage.getItem('data')) {
    const data = {}
    localStorage.setItem('data', JSON.stringify(data))
  }

  return <Routes>
    <Route path='/' element={<Kanban />} />
    <Route path='/edit/:id' element={<Page />} />
  </Routes>
}

export default App;
