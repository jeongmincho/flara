const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 10
    }
  }
})

module.exports = ProductOrder
