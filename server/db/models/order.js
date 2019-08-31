const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  totalPrice: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
