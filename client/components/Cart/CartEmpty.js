import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Button, Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  cartEmptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  cartEmptyImage: {
    width: '15rem',
    margin: '1rem'
  },
  cartEmptyText: {
    margin: '1rem'
  },
  cartEmptyLink: {
    margin: '1rem'
  }
}))

const CartEmpty = () => {
  const classes = useStyles()
  return (
    <Container className={classes.cartEmptyContainer}>
      <img
        src="https://i.imgur.com/tWUxNlx.png"
        className={classes.cartEmptyImage}
      />
      <Typography variant="h5" className={classes.cartEmptyText}>
        Sorry, looks like you're out of gems!
      </Typography>
      <Link to="/books/limit=12&offset=0" className={classes.cartEmptyLink}>
        <Button type="button" variant="contained" color="primary">
          <Typography variant="h6">Go Collect More</Typography>
        </Button>
      </Link>
    </Container>
  )
}

export default CartEmpty
