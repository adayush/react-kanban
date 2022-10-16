import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import style from "./edit.module.css"

const Page = ({ data, setData, deleteTask }) => {
  const { statusIndex, taskIndex } = useParams()
  const navigate = useNavigate()

  // console.log(statusIndex, taskIndex)

  const [values, setValues] = useState({
    title: data[statusIndex].tasks[taskIndex].title,
    status: data[statusIndex].id,
    description: data[statusIndex].tasks[taskIndex].description,
    source: undefined,
    target: undefined
  })

  useEffect(() => {
    // console.log(values)
    let flag = false
    
    const newData = [...data]
    const tmpTask = newData[statusIndex].tasks[taskIndex]
    tmpTask.title = values.title
    tmpTask.description = values.description
    newData[statusIndex].tasks[taskIndex] = tmpTask

    if (values.target && (statusIndex !== values.target)) {
      newData[statusIndex].tasks.splice(taskIndex, 1)
      newData[values.target].tasks.push(tmpTask)
      flag = true
    }

    setData(newData)
    localStorage.setItem('data', JSON.stringify(data))

    if (flag)
      navigate(`/edit/${values.target}/${newData[values.target].tasks.length-1}`)
    // newData[status]
  }, [values, statusIndex, taskIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = ({target}, type) => {
    if (type !== 'status') {
      setValues({
        ...values,
        [type]: target.value,
        target: undefined
      })
    } else {
      setValues({
        ...values,
        [type]: target.value,
        target: target.options[target.options.selectedIndex].getAttribute('target')
      })
    }
    // if (type === 'title') {
    //   setValues({
    //     ...values,
    //     [type]: event.target.value
    //   })
    // } else if (type === 'description') {
    //   setValues({
    //     ...values,
    //     [type]: event.target.value
    //   })
    // } else if (type === "status") {
    //   setValues({
    //     ...values,
    //     [type]: event.target.value
    //   })
    // }
  }

  return (
    <div className={style.container}>
      <div className={style.main}>
        <div className={style.nav}>
          <img
            className={style.backsvg}
            src={require("../images/larrow.svg").default}
            alt="left arrow"
            onClick={() => navigate('/')
            }
          />
          <img
            className={style.binsvg}
            src={require('../images/bin.svg').default}
            alt="delete bin"
            onClick={() => {
              deleteTask(statusIndex, taskIndex);
              navigate('/');
              //window.close()
            }}
          />
        </div>
        <div className={style.title}>
          <h1><input value={values.title} onChange={(e) => handleChange(e, 'title')} /></h1>
          <span>{data[statusIndex].tasks[taskIndex].date}</span>
        </div>
        <br />
        <div className={style.status}>
          <select value={values.status} onChange={(e) => handleChange(e, 'status')}>
            {data.map((status, i) => (
              <option key={i} value={status.id} target={i}>{status.title}</option>
            ))}
          </select>
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
