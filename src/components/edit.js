import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import style from "./edit.module.css"

const Page = ({ data, setData }) => {
  const { statusId, taskId } = useParams()
  const status = data?.findIndex(status => status.id === parseInt(statusId))
  const task = data[status].tasks?.findIndex(t => t.id === parseInt(taskId))

  const [values, setValues] = useState({
    title: data[status].tasks[task].title,
    status: data[status].title,
    description: data[status].tasks[task].description
  })
  console.log(values)
  useEffect(() => {
    console.log('changed')
    const newData = [...data]
    newData[status].tasks[task].title = values.title
    newData[status].tasks[task].description = values.description
    setData(newData)
    localStorage.setItem('data', JSON.stringify(data))
    // newData[status]
  }, [values, status, task])

  const handleChange = (event, type) => {
    if (type === 'title') {
      setValues({
        ...values,
        [type]: event.target.value
      })
    } else if (type === 'description') {
      console.log(event)
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
          <h1><input value={values.title} onChange={(e) => handleChange(e, 'title')} /></h1>
          <span>{data[status].tasks[task].date}</span>
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
            onChange={(e) => handleChange(e, 'description')}>
            {values.description}
          </textarea>
        </div>
      </div>
      
    </div>
  )
}

export default Page
