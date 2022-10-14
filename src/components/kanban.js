import style from "./kanban.module.css"

const Status = ({title}) => (
  <div className={style.status}>
    <div className={style.header}>
      <div className={style.title}>
        <div>{title}</div>
        <span>2</span>
      </div>
      <div>
        <div>•••</div>
        <div>+</div>
      </div>
    </div>
    <div className={style.tasks}>
      {/* Tasks */}
      <div className={style.task}>
        <span>Task 1</span>
      </div>
      <div className={style.task}>
        <span>Task 2</span>
      </div>
      <div className={style.task}>
        <span>Task 3</span>
      </div>
    </div>
  </div>
)

const Kanban = () => {
  return (
    <div>
      <div className={style.kanban}>
        <Status title="Not started" />
        <Status title="In progress" />
        <Status title="Completed" />
      </div>
      <br />
      <br />
      <img src={require('./kanban.png')} />
    </div>
    
  )
}

export default Kanban