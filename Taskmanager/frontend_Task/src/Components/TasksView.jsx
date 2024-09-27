import styles from './TaskView.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, updateStatus } from '../reducers/taskReducer'

const Task = ({ task, handleDelete, handleStatus }) => {
  return (
    <li className={styles.taskItem}>
      <div className={styles.taskText}>
        {task.done ? <s>{task.text}</s> : task.text}
      </div>

      <div className={styles.taskStatus}>
        <strong>{task.done ? 'task done' : 'task active'}</strong>
      </div>

      <div className={styles.taskActions}>
        <span
          className={`${styles.icons} material-icons`}
          onClick={() =>
            task.done ? handleDelete(task._id) : handleStatus(task._id)
          }
        >
          {task.done ? 'delete' : 'check_circle_outline'}
        </span>
      </div>
    </li>
  )
}

const TasksView = () => {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => {
    return state.tasks
  })

  const handleDelete = async (id) => {
    dispatch(deleteTask(id))
  }

  const handleStatus = async (id) => {
    dispatch(updateStatus(id))
  }
  if (!tasks) {
    return <h2>Loading tasks...</h2>
  }

  return (
    <div className={styles.wrapper}>
      {tasks && (
        <ol className={styles.gridList}>
          {tasks.map((task) => {
            return (
              <Task
                key={task._id}
                task={task}
                handleDelete={handleDelete}
                handleStatus={handleStatus}
              />
            )
          })}
        </ol>
      )}
    </div>
  )
}

export default TasksView
