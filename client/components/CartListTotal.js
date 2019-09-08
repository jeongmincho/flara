import React from 'react'
import {Container, ListItem, Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  cartItemContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cartItemImage: {
    width: '4rem',
    textAlign: 'center',
    color: 'transparent'
  },
  cartItemTitle: {
    width: '25rem',
    textAlign: 'center',
    color: 'transparent'
  },
  cartListLabelDelete: {
    color: 'transparent'
  },
  cartItemLabel: {
    textAlign: 'center'
  },
  cartTotalPrice: {
    width: '4rem',
    textAlign: 'center'
  }
}))

const CartListTotal = ({totalPrice}) => {
  const classes = useStyles()
  return (
    <ListItem className={classes.cartItemContainer}>
      <Typography variant="subtitle1" className={classes.cartItemImage}>
        Image
      </Typography>
      <Typography variant="subtitle1" className={classes.cartItemTitle}>
        Title
      </Typography>
      <Typography variant="subtitle1" className={classes.cartItemImage}>
        Quantity
      </Typography>
      <Typography variant="h6" className={classes.cartItemLabel}>
        Total
      </Typography>
      <Typography variant="h6" className={classes.cartTotalPrice}>
        ${totalPrice}
      </Typography>
      <Typography variant="subtitle1" className={classes.cartListLabelDelete}>
        Delete
      </Typography>
    </ListItem>
  )
}

export default CartListTotal
