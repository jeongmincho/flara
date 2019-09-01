const router = require('express').Router()
const {Product} = require('../../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    let bookList
    if (!req.query.id) {
      // cater towards pagination queries
      const {limit, offset} = req.query
      bookList = await Product.findAll({
        order: [['id', 'ASC']],
        limit,
        offset
      })
    } else {
      // cater towards array queries
      bookList = await Product.findAll({
        where: {
          id: req.query.id
        }
      })
    }
    res.json(bookList)
  } catch (err) {
    next(err)
  }
})

router.get('/count', async (req, res, next) => {
  try {
    const bookCount = await Product.count()
    res.json(bookCount)
  } catch (err) {
    next(err)
  }
})
