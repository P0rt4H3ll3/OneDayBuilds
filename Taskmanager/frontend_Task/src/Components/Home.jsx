import TasksView from './TasksView'
import TasksForm from './TasksForm'
import styles from './Home.module.css'

const Home = () => {
  return (
    <>
      <div className={styles.homeContainer}>
        <TasksView />
        <TasksForm />
      </div>
    </>
  )
}

export default Home
