import NewButton from "./newButton"
import style from "./kanban.module.css"

const Status = ({ id, title, tasks, data, setData }) => {
  return (
    <div className={style.status}>
      <div className={style.header}>
        <div className={style.title}>
          <div>{title}</div>
          <span>{tasks.length}</span>
        </div>
        <div>
          <img src={require("../images/dots.png")} alt="menu dots" />
          <img src={require("../images/plus.png")} alt="plus" />
        </div>
      </div>
      <div className={style.tasks}>
        {/* Tasks */}
        {tasks.map((task) => (
          <div key={task.id} className={style.task} onClick={() =>
            window.open(`/edit/${id}/${task.id}`, '_blank', 'noopen,noreferrer')}>

            <span>{task.title}</span>
          </div>
        ))}
        <NewButton type="task" data={data} statusId={id} setData={setData} />
      </div>
    </div>
  )
}

const Kanban = ({ data, setData }) => {
  console.log(typeof(data))
  return (
    <div>
      <div className={style.kanban}>
        {data?.map((status) => <Status key={status.id} id={status.id} title={status.title} tasks={status.tasks} data={data} setData={setData} />)}
        <div className={style.status}>
          <NewButton type="status" data={data} setData={setData} />
        </div>
      </div>
      <br />
      <br />
      <img className={style.temp} src={require('./kanban.png')} alt="temp" />
    </div>
  )
}

export default Kanban