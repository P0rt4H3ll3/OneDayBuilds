const Holiday = ({ holiday }) => {
  if (!holiday) {
    return <h1>Could not find content</h1>
  }
  return (
    <div>
      <div>
        <strong>{holiday.title}</strong>
      </div>
      <div>{holiday.content}</div>
    </div>
  )
}

export default Holiday
