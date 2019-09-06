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

router.post('/create', async (req, res, next) => {
  try {
    console.log('reached create cart, req.user.id: ', req.user.id)
    const userCart = await Order.create({
      userId: req.user.id,
      isCart: true
    })
    res.json(userCart)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const userCart = await Order.findOrCreate({
      where: {
        userId: req.user.id,
        isCart: true
      }
    })
    const newProductOrder = {
      quantity: req.body.quantity,
      productId: req.body.productId,
      orderId: userCart[0].id
    }
    const addedProductOrder = await ProductOrder.create(newProductOrder)
    const addedProduct = await Product.findByPk(req.body.productId)
    const response = {
      cart: userCart[0],
      addedProduct,
      addedProductOrder
    }
    res.json(response)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      where: {
        userId: req.user.id,
        isCart: true
      }
    })
    const productOrders = await ProductOrder.findAll({
      where: {
        orderId: userCart.id
      }
    })
    await Promise.all(
      productOrders.map(async productOrder => {
        const {price} = await Product.findByPk(productOrder.productId)
        productOrder.price = price
        productOrder.save()
      })
    )
    let totalPrice = 0
    productOrders.map(productOrder => {
      totalPrice += productOrder.price * productOrder.quantity
    })
    userCart.totalPrice = totalPrice
    userCart.isCart = false
    await userCart.save()
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const userCart = await Order.findOne({
      where: {
        userId: req.user.id,
        isCart: true
      }
    })
    await ProductOrder.destroy({
      where: {
        productId: req.body.productId,
        orderId: userCart.id
      }
    })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/edit', async (req, res, next) => {
  try {
    const data = await ProductOrder.findOne({
      where: {
        productId: req.body.productId,
        orderId: req.body.orderId
      }
    })
    data.quantity = req.body.quantity
    await data.save()
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})
