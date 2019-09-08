import React from 'react'
import {
  Fab,
  Divider,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Container,
  Typography,
  FormControl,
  Select,
  MenuItem,
  makeStyles
} from '@material-ui/core'
import {DeleteForever} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  cartItemContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  cartItemImage: {
    width: '4rem',
    height: '6rem'
  },
  cartItemTitle: {
    width: '25rem'
  },
  cartItemQuantitySelect: {
    width: '5rem',
    margin: 0
  },
  cartItemPrice: {
    width: '3rem',
    textAlign: 'center'
  },
  cartItemSubtotalPrice: {
    width: '5rem',
    textAlign: 'center'
  }
}))

const CartItem = ({
  product,
  handleDeleteProduct,
  handleEditProduct,
  cartId,
  quantity
}) => {
  const classes = useStyles()

  return (
    <ListItem className={classes.cartItemContainer}>
      <img src={product.imageUrl} className={classes.cartItemImage} />
      <Typography variant="subtitle1" className={classes.cartItemTitle}>
        {product.title}
      </Typography>
      <Container className={classes.cartItemQuantitySelect}>
        <FormControl>
          <Select
            value={quantity}
            onChange={e => {
              cartId
                ? handleEditProduct(product.id, cartId, Number(e.target.value))
                : handleEditProduct(product.id, Number(e.target.value))
            }}
            inputProps={{
              name: 'quantity',
              id: 'quantity'
            }}
          >
            {Array(5)
              .fill(1)
              .map((val, i) => {
                return (
                  <MenuItem value={val + i} key={val + i}>
                    {val + i}
                  </MenuItem>
                )
              })}
          </Select>
        </FormControl>
      </Container>
      <Typography variant="subtitle1" className={classes.cartItemPrice}>
        {product.price}
      </Typography>
      <Typography variant="subtitle1" className={classes.cartItemSubtotalPrice}>
        {product.price * quantity}
      </Typography>
      <ListItemAvatar>
        <Avatar>
          <Fab
            onClick={() => {
              handleDeleteProduct(product.id)
            }}
          >
            <DeleteForever />
          </Fab>
        </Avatar>
      </ListItemAvatar>
    </ListItem>
  )
}

export default CartItem
