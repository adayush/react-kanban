import NewButton from "./newButton"
import style from "./kanban.module.css"
import { useEffect, useState } from "react"

const Status = ({ i, status, data, setData }) => {
  const [title, setTitle] = useState(status.title)

  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  useEffect(() => {
    console.log('changed')
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
        {status.tasks.map((task) => (
          <div key={task.id} className={style.task} onClick={() =>
            window.open(`/edit/${status.id}/${task.id}`, '_blank', 'noopen,noreferrer')}>

            <span>{task.title}</span>
          </div>
        ))}
        <NewButton type="task" data={data} statusId={status.id} setData={setData} />
      </div>
    </div>
  )
}

const Kanban = ({ data, setData }) => {
  console.log(typeof(data))
  return (
    <div>
      <div className={style.kanban}>
        {data?.map((status, index) => <Status key={status.id} i={index} status={status} data={data} setData={setData} />)}
        <div className={style.status}>
          <NewButton type="status" data={data} setData={setData} />
        </div>
      </div>
      <br />
      <br />
      <img className={style.temp} src={require('../images/kanban.png')} alt="temp" />
    </div>
  )
}

export default Kanban