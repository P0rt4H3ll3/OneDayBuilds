import { createTask } from '../reducers/taskReducer'
import { useDispatch } from 'react-redux'

import styles from './TaskForm.module.css'

const TasksForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const text = event.target.task.value
    event.target.task.value = ''
    dispatch(createTask({ text: text }))
  }
  return (
    <div className={styles.addTask}>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            placeholder="Write a Task"
            name="task"
            rows={5}
            cols={100}
          />
        </div>
        <button type="submit">create Task</button>
      </form>

      <span className={`${styles.icons} material-icons`}>add_box</span>
    </div>
  )
}

export default TasksForm
