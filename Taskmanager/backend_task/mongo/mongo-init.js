db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database'
    }
  ]
})

db.createCollection('tasks')

db.tasks.insert({ text: 'Write code', done: true })
db.tasks.insert({ text: 'Learn about containers', done: false })
