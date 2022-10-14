import style from "./kanban.module.css"

const NewButton = ({ data, setData, type, statusId }) => {
  const newTask = () => {
    let taskId = ""
    const newData = data.map(status => {
      if (status.id === statusId) {
        status.tasks.push({
          id: Date.now(),
          title: "Untitled",
          date: new Date().toString(),
          status: statusId,
          description: ""
        })
        taskId = status.tasks[status.tasks.length -1].id
      }
      return status
    })
    localStorage.setItem("data", JSON.stringify(newData));
    setData(newData)
    window.open(`/edit/${statusId}/${taskId}`, '_blank', 'noopen,noreferrer')
  }

  const newStatus = () => {
    const newData = data.concat({
      id: Date.now(),
      title: "Untitled",
      tasks: []
    })
    localStorage.setItem("data", JSON.stringify(newData));
    setData(newData)
    console.log(data)
  }

  if (type === "status") {
    return (
      <div className={style.task + " " + style.empty} onClick={newStatus}>
        <span>+ Add status</span>
      </div>
    )
  }
  else if (type === "task") {
    return (
      <div className={style.task + " " + style.empty} onClick={newTask}>
        <span>+ New</span>
      </div>
    )
  }
}

export default NewButton
