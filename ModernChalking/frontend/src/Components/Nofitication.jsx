import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.message)
  return <h2>{message}</h2>
}
export default Notification
