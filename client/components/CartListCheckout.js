import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Typography, Button, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  cartCheckoutContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: '1rem'
  },
  cartCheckoutButtonLink: {
    width: '40%'
  },
  cartCheckoutButton: {
    width: '40%'
  },
  cartShoppingButton: {
    width: '100%'
  },
  cartCheckoutButtonText: {
    width: '100%'
  }
}))

const CartListCheckout = ({handleCheckoutCart}) => {
  const classes = useStyles()

  return (
    <Container className={classes.cartCheckoutContainer}>
      <Link
        to="/books/limit=12&offset=0"
        className={classes.cartCheckoutButtonLink}
      >
        <Button
          type="button"
          color="secondary"
          variant="contained"
          className={classes.cartShoppingButton}
        >
          <Typography variant="h6" className={classes.cartCheckoutButtonText}>
            Keep Shopping
          </Typography>
        </Button>
      </Link>
      <Button
        type="button"
        onClick={() => {
          handleCheckoutCart()
        }}
        color="primary"
        variant="contained"
        className={classes.cartCheckoutButton}
      >
        <Typography variant="h6" className={classes.cartCheckoutButtonText}>
          Checkout
        </Typography>
      </Button>
    </Container>
  )
}

export default CartListCheckout
