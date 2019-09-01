const router = require('express').Router()
const {Order} = require('../../db/models')
module.exports = router

// router.get('/', async (req, res, next) => {
//   try {
//     let orderList = await Order.findAll({
//       where: {
//         id: req.query.id
//       }
//     })
//     res.json(orderList)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/', async (req, res, next) => {
  try {
    let order = await Order.findByPk(1)
    const hello = await order.getProducts()
    console.log(hello)
    res.json(hello)
  } catch (err) {
    next(err)
  }
})
