const productOrders = [
  {
    quantity: 3,
    orderId: 15,
    productId: 8
  },
  {
    quantity: 2,
    orderId: 28,
    productId: 14
  },
  {
    quantity: 3,
    orderId: 28,
    productId: 45
  },
  {
    quantity: 2,
    orderId: 25,
    productId: 21
  },
  {
    quantity: 1,
    orderId: 22,
    productId: 4
  },
  {
    quantity: 3,
    orderId: 22,
    productId: 6
  },
  {
    quantity: 2,
    orderId: 19,
    productId: 36
  },
  {
    quantity: 3,
    orderId: 30,
    productId: 32
  },
  {
    quantity: 2,
    orderId: 20,
    productId: 37
  },
  {
    quantity: 3,
    orderId: 17,
    productId: 22
  },
  {
    quantity: 3,
    orderId: 20,
    productId: 43
  },
  {
    quantity: 2,
    orderId: 8,
    productId: 7
  },
  {
    quantity: 3,
    orderId: 19,
    productId: 42
  },
  {
    quantity: 1,
    orderId: 15,
    productId: 7
  },
  {
    quantity: 3,
    orderId: 30,
    productId: 5
  },
  {
    quantity: 3,
    orderId: 28,
    productId: 5
  },
  {
    quantity: 3,
    orderId: 11,
    productId: 41
  },
  {
    quantity: 1,
    orderId: 15,
    productId: 45
  },
  {
    quantity: 3,
    orderId: 24,
    productId: 29
  },
  {
    quantity: 1,
    orderId: 16,
    productId: 15
  },
  {
    quantity: 1,
    orderId: 1,
    productId: 7
  },
  {
    quantity: 3,
    orderId: 8,
    productId: 32
  },
  {
    quantity: 1,
    orderId: 16,
    productId: 40
  },
  {
    quantity: 3,
    orderId: 9,
    productId: 7
  },
  {
    quantity: 1,
    orderId: 3,
    productId: 47
  },
  {
    quantity: 2,
    orderId: 27,
    productId: 21
  },
  {
    quantity: 1,
    orderId: 24,
    productId: 4
  },
  {
    quantity: 1,
    orderId: 4,
    productId: 25
  },
  {
    quantity: 2,
    orderId: 5,
    productId: 31
  },
  {
    quantity: 2,
    orderId: 4,
    productId: 24
  },
  {
    quantity: 2,
    orderId: 29,
    productId: 29
  },
  {
    quantity: 2,
    orderId: 13,
    productId: 22
  },
  {
    quantity: 3,
    orderId: 27,
    productId: 20
  },
  {
    quantity: 3,
    orderId: 5,
    productId: 19
  },
  {
    quantity: 1,
    orderId: 7,
    productId: 35
  },
  {
    quantity: 2,
    orderId: 10,
    productId: 23
  },
  {
    quantity: 2,
    orderId: 12,
    productId: 4
  },
  {
    quantity: 1,
    orderId: 20,
    productId: 38
  },
  {
    quantity: 1,
    orderId: 1,
    productId: 1
  },
  {
    quantity: 3,
    orderId: 3,
    productId: 13
  },
  {
    quantity: 3,
    orderId: 26,
    productId: 16
  },
  {
    quantity: 3,
    orderId: 23,
    productId: 21
  },
  {
    quantity: 2,
    orderId: 13,
    productId: 16
  },
  {
    quantity: 3,
    orderId: 17,
    productId: 4
  },
  {
    quantity: 2,
    orderId: 28,
    productId: 41
  },
  {
    quantity: 2,
    orderId: 29,
    productId: 4
  },
  {
    quantity: 2,
    orderId: 26,
    productId: 38
  },
  {
    quantity: 2,
    orderId: 1,
    productId: 25
  },
  {
    quantity: 3,
    orderId: 20,
    productId: 45
  },
  {
    quantity: 1,
    orderId: 17,
    productId: 29
  },
  {
    quantity: 2,
    orderId: 24,
    productId: 36
  },
  {
    quantity: 1,
    orderId: 20,
    productId: 32
  },
  {
    quantity: 3,
    orderId: 2,
    productId: 18
  },
  {
    quantity: 2,
    orderId: 28,
    productId: 15
  },
  {
    quantity: 1,
    orderId: 3,
    productId: 42
  },
  {
    quantity: 3,
    orderId: 1,
    productId: 34
  },
  {
    quantity: 2,
    orderId: 4,
    productId: 11
  },
  {
    quantity: 3,
    orderId: 13,
    productId: 9
  },
  {
    quantity: 3,
    orderId: 7,
    productId: 45
  },
  {
    quantity: 3,
    orderId: 30,
    productId: 11
  },
  {
    quantity: 3,
    orderId: 1,
    productId: 48
  },
  {
    quantity: 2,
    orderId: 2,
    productId: 15
  },
  {
    quantity: 1,
    orderId: 6,
    productId: 32
  },
  {
    quantity: 1,
    orderId: 26,
    productId: 21
  },
  {
    quantity: 2,
    orderId: 14,
    productId: 19
  },
  {
    quantity: 3,
    orderId: 15,
    productId: 9
  },
  {
    quantity: 3,
    orderId: 30,
    productId: 24
  },
  {
    quantity: 2,
    orderId: 10,
    productId: 3
  },
  {
    quantity: 3,
    orderId: 9,
    productId: 12
  },
  {
    quantity: 1,
    orderId: 6,
    productId: 9
  },
  {
    quantity: 3,
    orderId: 5,
    productId: 45
  },
  {
    quantity: 1,
    orderId: 30,
    productId: 13
  },
  {
    quantity: 3,
    orderId: 24,
    productId: 8
  },
  {
    quantity: 2,
    orderId: 23,
    productId: 45
  },
  {
    quantity: 1,
    orderId: 5,
    productId: 26
  },
  {
    quantity: 1,
    orderId: 9,
    productId: 4
  },
  {
    quantity: 3,
    orderId: 13,
    productId: 8
  },
  {
    quantity: 1,
    orderId: 4,
    productId: 30
  },
  {
    quantity: 1,
    orderId: 5,
    productId: 11
  },
  {
    quantity: 1,
    orderId: 26,
    productId: 13
  },
  {
    quantity: 3,
    orderId: 4,
    productId: 28
  },
  {
    quantity: 3,
    orderId: 6,
    productId: 35
  },
  {
    quantity: 1,
    orderId: 2,
    productId: 8
  },
  {
    quantity: 1,
    orderId: 23,
    productId: 26
  },
  {
    quantity: 1,
    orderId: 20,
    productId: 23
  },
  {
    quantity: 2,
    orderId: 30,
    productId: 14
  },
  {
    quantity: 3,
    orderId: 18,
    productId: 35
  },
  {
    quantity: 2,
    orderId: 6,
    productId: 13
  },
  {
    quantity: 1,
    orderId: 17,
    productId: 16
  },
  {
    quantity: 3,
    orderId: 1,
    productId: 6
  },
  {
    quantity: 3,
    orderId: 10,
    productId: 25
  },
  {
    quantity: 2,
    orderId: 7,
    productId: 14
  },
  {
    quantity: 3,
    orderId: 18,
    productId: 31
  },
  {
    quantity: 2,
    orderId: 23,
    productId: 47
  },
  {
    quantity: 2,
    orderId: 13,
    productId: 2
  },
  {
    quantity: 3,
    orderId: 28,
    productId: 20
  },
  {
    quantity: 3,
    orderId: 17,
    productId: 31
  },
  {
    quantity: 1,
    orderId: 3,
    productId: 29
  },
  {
    quantity: 2,
    orderId: 23,
    productId: 43
  }
]

module.exports = productOrders
