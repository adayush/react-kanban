import { useState, useEffect } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { useNavigate } from "react-router-dom";

import NewButton from "./newButton"
import style from "./status.module.css"

const Status = ({ statusIndex, status, data, setData }) => {
  const [title, setTitle] = useState(status.title)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  const showOptions = () => {
    return
  }

  const addStatus = () => {
    const tmpData = [...data]
    tmpData.splice(statusIndex+1, 0, {
      id: Date.now().toString(),
      title: `Status ${+tmpData.length+1}`,
      tasks: []
    })
    setData(tmpData)
    localStorage.setItem('data', JSON.stringify(tmpData))
  }

  useEffect(() => {
    //console.log('changed')
    const newData = [...data]
    newData[statusIndex].title = title
    setData(newData)
    localStorage.setItem('data', JSON.stringify(data))
  }, [title]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={style.status}>
      <div className={style.header}>
        <div className={style.title}>
          <div>
            <input value={title} onChange={(e) => handleChange(e)} />
          </div>
          <span>{status.tasks.length}</span>
        </div>
        <div className={style.buttons}>
          <img
            src={require("../images/dots.png")}
            alt="menu dots"
            onClick={showOptions}
          />
          <img
            src={require("../images/plus.png")}
            alt="plus"
            onClick={addStatus}
          />
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
                    onClick={() => navigate(`/edit/${statusIndex}/${taskIndex}`)}
                    // onClick={() => window.open(`/edit/${statusIndex}/${taskIndex}`,
                    //   '_blank', 'noopen,noreferrer')}
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
