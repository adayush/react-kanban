import { useState, useEffect } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"

import NewButton from "./newButton"
import style from "./status.module.css"

const Status = ({ statusIndex, status, data, setData }) => {
  const [title, setTitle] = useState(status.title)

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    //console.log('changed')
    const newData = [...data]
    newData[statusIndex].title = title
    setData(newData)
    localStorage.setItem('data', JSON.stringify(data))
    // newData[status]
  }, [title])

  return (
    <div className={style.status}>
      <div className={style.header}>
        <div className={style.title}>
          <div>
            <input value={title} onChange={(e) => handleChange(e)} />
          </div>
          <span>{status.tasks.length}</span>
        </div>
        <div>
          <img src={require("../images/dots.png")} alt="menu dots" />
          <img src={require("../images/plus.png")} alt="plus" />
        </div>
      </div>
      <Droppable droppableId={status.id}>
        {(provided) => (
          <div className={style.tasks}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {status?.tasks.map((task, taskIndex) => (
              <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                {(provided) => (
                  <div key={task.id} className={style.task}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => window.open(`/edit/${statusIndex}/${taskIndex}`,
                      '_blank', 'noopen,noreferrer')}
                  >
                    <span>{task.title}</span>
                  </div>
                )}
              </Draggable>
            ))}
            <NewButton
              type="task"
              data={data}
              statusIndex={statusIndex}
              setData={setData}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default Status
