import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import style from "./edit.module.css"

const Page = ({ data, setData, deleteTask }) => {
  const { statusIndex, taskIndex } = useParams()
  console.log(statusIndex, taskIndex)
  const [values, setValues] = useState({
    title: data[statusIndex].tasks[taskIndex].title,
    status: data[statusIndex].title,
    description: data[statusIndex].tasks[taskIndex].description
  })
  //console.log(values)
  useEffect(() => {
    //console.log('changed')
    const newData = [...data]
    newData[statusIndex].tasks[taskIndex].title = values.title
    newData[statusIndex].tasks[taskIndex].description = values.description
    setData(newData)
    localStorage.setItem('data', JSON.stringify(data))
    // newData[status]
  }, [values, statusIndex, taskIndex])

  const handleChange = (event, type) => {
    if (type === 'title') {
      setValues({
        ...values,
        [type]: event.target.value
      })
    } else if (type === 'description') {
      //console.log(event)
      setValues({
        ...values,
        [type]: event.target.value
      })
    }
  }

  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.title}>
          <div>
            <h1><input value={values.title} onChange={(e) => handleChange(e, 'title')} /></h1>
            <p onClick={() => {
              console.log('clicked')
              deleteTask(statusIndex, taskIndex);
              window.close()
            }}>Delete</p>
          </div>
          <span>{data[statusIndex].tasks[taskIndex].date}</span>
        </div>
        <br />
        <div className={style.status}>
          <p>{values.status}</p>
        </div>
        <div className={style.divider}></div>
        <div className={style.description}>
          {/* <span
            className={style.textarea}
            role="textbox"
            suppressContentEditableWarning={true}
            contentEditable
            onInput={(e) => handleChange(e, 'description')}>

            {values.description}
          </span> */}
          <textarea className={style.textarea}
            onChange={(e) => handleChange(e, 'description')} value={values.description} />
        </div>
      </div>
      
    </div>
  )
}

export default Page
