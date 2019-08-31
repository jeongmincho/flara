'use strict'

const db = require('../server/db')
const {User, Product, Order, ProductOrder} = require('../server/db/models')
const books = require('./seedData/bookData')
const users = require('./seedData/userData')
const orders = require('./seedData/orderData')
const productOrders = require('./seedData/productOrderData')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    books.map(book => {
      return Product.create(book)
    })
  )
  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )
  await Promise.all(
    orders.map(order => {
      return Order.create(order)
    })
  )
  await Promise.all(
    productOrders.map(productOrder => {
      return ProductOrder.create(productOrder)
    })
  )
  console.log(`seeded ${books.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
