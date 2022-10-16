import { DragDropContext } from "react-beautiful-dnd"

import Status from "../components/status"
import NewButton from "../components/newButton"

import style from "./kanban.module.css"

const Kanban = ({ data, setData }) => {
  const clearAll = () => {
    localStorage.removeItem('data')
    setData([])
  }

  const onDragEnd = ({ source, destination, draggableId }) => {
    //console.log(source, destination, draggableId)
    if (!destination) return

    // if dropped at same position
    if (source.droppableId === destination.droppableId
      && source.index === destination.index) {
      return
    }

    const tmpData = [...data]
    const s_statusIndex = tmpData.findIndex(status => status.id === source.droppableId)
    const tmpTask = tmpData[s_statusIndex].tasks[source.index]
    // remove task from source
    tmpData[s_statusIndex].tasks.splice(source.index, 1)

    // if dropped in same status column
    if (source.droppableId === destination.droppableId) {
      tmpData[s_statusIndex].tasks.splice(destination.index, 0, tmpTask)
    } else {
      // if dropped in different column
      const d_statusIndex = tmpData.findIndex(status => status.id === destination.droppableId)
      tmpData[d_statusIndex].tasks.splice(destination.index, 0, tmpTask)
    }
    setData(tmpData)
    localStorage.setItem('data', JSON.stringify(tmpData))
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h1>Kanban Board - React.js</h1>
        <p onClick={clearAll}>Clear all and start again?</p>
      </div>
      <p>• <strong>Add status</strong> - adds a new status column</p>
      <p>• <strong>New</strong> - adds a new task and opens the edit page</p>
      <p>• Click on status name to edit it</p>
      <p>• Click on a task to edit or delete it</p>
      <div className={style.divider}></div>
      <div className={style.kanban}>
        <DragDropContext onDragEnd={onDragEnd}>
          {data?.map((status, statusIndex) => (
            <Status
              key={status.id}
              statusIndex={statusIndex}
              status={status}
              data={data}
              setData={setData}
            />
          ))}
        </DragDropContext>
        <div className={style.status}>
          <NewButton type="status" data={data} setData={setData} />
        </div>
      </div>
    </div>
  )
}

export default Kanban
