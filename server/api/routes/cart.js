const router = require('express').Router()
const {Product, Order, ProductOrder} = require('../../db/models')
// const {
//   authorizeAdmin,
//   authorizeCorrectUser,
//   authorizeMyCart
// } = require('../utils/authorize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      include: [{model: Product}],
      where: {
        userId: req.user.id,
        isCart: true
      }
    })
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

// give me my cart
// router.get('/', async (req, res, next) => {
//   try {
//     const userCartID = await Order.findOne({
//       where: {
//         userId: req.user.id,
//         isCart: true
//       },
//       attributes: ['id']
//     })
//     res.json(userCartID.id)
//   } catch (err) {
//     next(err)
//   }
// })

// router.post('/', authorizeMyCart, async (req, res, next) => {
//   try {
//     const userCart = await Order.findOrCreate({
//       where: {
//         userId: req.body.userId,
//         isCart: true
//       }
//     })
//     const newProductOrder = {
//       quantity: req.body.quantity,
//       productId: req.body.productId,
//       orderId: userCart[0].id
//     }
//     const addedProductOrder = await ProductOrder.create(newProductOrder)
//     const addedProduct = await Product.findByPk(req.body.productId)
//     const response = {
//       cart: userCart[0],
//       addedProduct,
//       addedProductOrder
//     }
//     res.json(response)
//   } catch (err) {
//     next(err)
//   }
// })

// router.put('/', authorizeMyCart, async (req, res, next) => {
//   try {
//     const userCart = await Order.findByPk(req.body.orderId)
//     userCart.totalPrice = req.body.totalPrice
//     userCart.isCart = false
//     await userCart.save()
//     const productOrders = await ProductOrder.findAll({
//       where: {
//         orderId: req.body.orderId
//       }
//     })
//     await Promise.all(
//       productOrders.map(async productOrder => {
//         const {price} = await Product.findByPk(productOrder.productId)
//         productOrder.price = price
//         productOrder.save()
//       })
//     )
//     res.sendStatus(201)
//   } catch (err) {
//     next(err)
//   }
// })

// router.delete('/', authorizeMyCart, async (req, res, next) => {
//   try {
//     await ProductOrder.destroy({
//       where: {
//         productId: req.body.productId,
//         orderId: req.body.orderId
//       }
//     })
//     res.sendStatus(204)
//   } catch (err) {
//     next(err)
//   }
// })

// router.put('/edit', authorizeMyCart, async (req, res, next) => {
//   try {
//     const data = await ProductOrder.findOne({
//       where: {
//         productId: req.body.productId,
//         orderId: req.body.orderId
//       }
//     })
//     data.quantity = req.body.quantity
//     await data.save()
//     res.sendStatus(201)
//   } catch (error) {
//     next(error)
//   }
// })
