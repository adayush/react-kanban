import NewButton from "./newButton"
import style from "./kanban.module.css"
import { useEffect, useState } from "react"

const Status = ({ i, status, data, setData }) => {
  const [title, setTitle] = useState(status.title)
  const [target, setTarget] = useState({
    task_ID: "",
    status_ID: "",
  })

  const handleDragEnd = (taskId, statusId) => {
    console.log('drag ended', taskId, statusId, target)
    let s_taskIndex, s_statusIndex, t_taskIndex, t_statusIndex

    s_statusIndex = data.findIndex(status => status.id === statusId)
    if(s_statusIndex<0) return

    s_taskIndex = data[s_statusIndex].tasks?.findIndex(task => task.id === taskId)
    if(s_taskIndex<0) return

    t_statusIndex = data.findIndex(status => status.id === target.status_ID)
    if(t_statusIndex<0) return
    //console.log(t_statusIndex, data)

    t_taskIndex = data[t_statusIndex].tasks?.findIndex(task => task.id === target.task_ID
)
    if(t_taskIndex<0) return

    const tmp_data=[...data]
    const tmp_task=tmp_data[s_statusIndex].tasks[s_taskIndex]

    // remove task from source status
    tmp_data[s_statusIndex].tasks.splice(s_taskIndex,1)
    // add task to target status
    tmp_data[t_statusIndex].tasks.splice(t_taskIndex,0,tmp_task)

    setData(tmp_data)
  }

  const handleDragEnter = (taskId, statusId) => {
    console.log('drag began', taskId, statusId)
    setTarget({
      task_ID: taskId,
      status_ID: statusId
    })
  }

  const handleChange = (e) => {
    setTitle(e.target.value)
  }

  useEffect(() => {
    //console.log('changed')
    const newData = [...data]
    newData[i].title = title
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
      <div className={style.tasks}>
        {/* Tasks */}
        {status?.tasks.map(task => (
          <div key={task.id} className={style.task} draggable
          onClick={() => window.open(`/edit/${status.id}/${task.id}`,
            '_blank', 'noopen,noreferrer')}
          onDragEnd={() => handleDragEnd(task.id, status.id)}
          onDragEnter={() => handleDragEnter(task.id, status.id)}
          >
            <span>{task.title}</span>
          </div>
        ))}
        <NewButton type="task" data={data} statusId={status.id} setData={setData} />
      </div>
    </div>
  )
}

const Kanban = ({ data, setData }) => {
  return (
    <div className={style.container}>
      <h1>Kanban Board - React.js</h1>
      <div className={style.divider}></div>
      <div className={style.kanban}>
        {data?.map((status, index) => <Status key={status.id} i={index} status={status} data={data} setData={setData} />)}
        <div className={style.status}>
          <NewButton type="status" data={data} setData={setData} />
        </div>
      </div>
    </div>
  )
}

export default Kanban