import { useState } from 'react'

const HolidayForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [country, setCountry] = useState('')
  const [categroy, setCategory] = useState('')
  const [duration, setDuration] = useState('')
  const [price, setPrice] = useState('')

  return (
    <div>
      <form>
        <div>
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          >
            title
          </input>
          <div>
            <input
              type="text"
              value={content}
              onChange={({ target }) => setContent(target.value)}
            >
              Content
            </input>
          </div>
          <div>
            <input
              type="text"
              value={country}
              onChange={({ target }) => setCountry(target.value)}
            >
              country
            </input>
          </div>
          <div>
            <input
              type="text"
              value={categroy}
              onChange={({ target }) => setCategory(target.value)}
            >
              categroy
            </input>
          </div>
          <div>
            <input
              type="number"
              value={duration}
              onChange={({ target }) => setDuration(target.value)}
            >
              duration
            </input>
          </div>
          <div>
            <input
              type="number"
              value={price}
              onChange={({ target }) => setPrice(target.value)}
            >
              price
            </input>
          </div>
        </div>
      </form>
    </div>
  )
}

export default HolidayForm
