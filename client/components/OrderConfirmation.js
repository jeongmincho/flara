import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'

const OrderConfirmation = () => {
  return (
    <div>
      <h2>Order Submitted!</h2>
      <p>Thank you for shopping with Flara.</p>
      <Link to="/books/limit=12&offset=0">
        <Button type="button">Continue Shopping</Button>
      </Link>
      <Link to="/orderHistory">
        <Button type="button">See Order History</Button>
      </Link>
    </div>
  )
}

export default OrderConfirmation
