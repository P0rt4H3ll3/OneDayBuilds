import { Link } from 'react-router-dom'

const HolidayList = ({ holidays }) => {
  if (!holidays) {
    return <h1>no holidays at the moment</h1>
  }
  return (
    <div>
      {holidays.map((holiday) => (
        <div key={holiday._id}>
          <Link to={`/${holiday._id}`}>{holiday.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default HolidayList
