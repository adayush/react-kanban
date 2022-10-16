import style from "./newButton.module.css"

const NewButton = ({ data, setData, type, statusIndex }) => {
  const newTask = () => {
    let taskId = ""
    const newData = [...data]
    newData[statusIndex].tasks.push({
      id: Date.now().toString(),
      title: "Untitled",
      date: new Date().toString(),
      status: data[statusIndex].id,
      description: ""
    })

    localStorage.setItem("data", JSON.stringify(newData));
    setData(newData)
    window.open(`/edit/${statusIndex}/${newData[statusIndex].tasks.length -1}`, '_blank', 'noopen,noreferrer')
  }

  const newStatus = () => {
    const newData = data.concat({
      id: Date.now().toString(),
      title: "Untitled",
      tasks: []
    })
    localStorage.setItem("data", JSON.stringify(newData));
    setData(newData)
    //console.log(data)
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
