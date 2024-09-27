import { useState, useEffect } from 'react'
import service from './service/holidays'
import HolidayList from './Components/HolidayList'
import Holiday from './Components/Holiday'
import HolidayForm from './Components/HolidayForm'
import User from './Components/User'
import About from './Components/About'
import Menu from './Components/Menu'
import { Routes, Route, useParams } from 'react-router-dom'
import './App.css'

function App() {
  const [holidays, setHolidays] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allHolidays = await service.getAll()
        setHolidays(allHolidays)
      } catch (error) {
        console.error('error while fetching inital data', error)
      }
    }
    fetchData()
  }, [])

  if (!holidays) {
    return <h1>no holidays at the moment</h1>
  }

  return (
    <div>
      <h1>Discover your next holiday with : Holi-dise</h1>
      <Menu />
      <Routes>
        <Route path="/" element={<HolidayList holidays={holidays} />} />
        <Route path="/:id" element={<HolidayWrapper holiday={holiday} />} />
        <Route path="/create_holiday" element={<HolidayForm />} />
        <Route path="/user" element={<User />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

const HolidayWrapper = ({ holidays }) => {
  const { id } = useParams() // Use useParams to get the ID from the URL
  const holiday = holidays.find((h) => h._id === id) // Find the holiday based on the ID

  if (!holiday) {
    return <h1>Holiday not found</h1> // Handle the case where no holiday is found
  }

  return <Holiday holiday={holiday} />
}
export default App
