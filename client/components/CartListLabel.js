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
    textAlign: 'center'
  },
  cartItemTitle: {
    width: '25rem',
    textAlign: 'center'
  },
  cartListLabelDelete: {
    color: 'transparent'
  },
  cartItemLabel: {
    textAlign: 'center'
  }
}))

const CartListLabel = () => {
  const classes = useStyles()
  return (
    <ListItem className={classes.cartItemContainer}>
      <Typography variant="subtitle1" className={classes.cartItemImage}>
        Image
      </Typography>
      <Typography variant="subtitle1" className={classes.cartItemTitle}>
        Title
      </Typography>
      <Typography variant="subtitle1" className={classes.cartItemLabel}>
        Quantity
      </Typography>
      <Typography variant="subtitle1" className={classes.cartItemLabel}>
        Price
      </Typography>
      <Typography variant="subtitle1" className={classes.cartItemLabel}>
        Subtotal
      </Typography>
      <Typography variant="subtitle1" className={classes.cartListLabelDelete}>
        Delete
      </Typography>
    </ListItem>
  )
}

export default CartListLabel
