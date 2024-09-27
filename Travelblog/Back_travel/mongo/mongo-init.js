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

db.createCollection('holidays')

db.holidays.insert({
  country: 'germany',
  categroy: 'adventure',
  duration: 2,
  price: 2000
})
db.holidays.insert({
  country: 'spain',
  categroy: 'club',
  duration: 1,
  price: 1500
})
db.holidays.insert({
  country: 'newZealand',
  categroy: 'hiking',
  duration: 8,
  price: 10000
})
