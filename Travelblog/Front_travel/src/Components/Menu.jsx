import { Link } from 'react-router-dom'

const Menu = () => {
  return (
    <div className="menu">
      <div>
        <Link to="/">Holidays</Link>
      </div>
      <div>
        <Link to="/create_holiday">Add</Link>
      </div>
      <div>
        <Link to="user">User</Link>
      </div>
      <div>
        <Link to="about">about</Link>
      </div>
    </div>
  )
}

export default Menu
