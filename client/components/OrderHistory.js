import React from 'react'
import {getUserOrdersThunk} from '../store/orderHistoryReducer'
import {connect} from 'react-redux'
import {logout} from '../store'

import {
  Container,
  Typography,
  List,
  ListItem,
  Divider,
  Grid,
  Button,
  withStyles
} from '@material-ui/core'
import {ShoppingBasket, ArrowBack} from '@material-ui/icons'
import CartEmpty from './Cart/CartEmpty'

const styles = theme => ({
  bookSingleDisplayContainer: {
    display: 'flex',
    paddingTop: '2rem'
  },
  orderHistoryContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0'
  },
  singleOrderContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '.5rem'
  },
  myAccountContainer: {
    display: 'flex',
    height: '100%'
  },
  myAccountSubContainerLeft: {
    display: 'flex',
    width: '60%',
    flexDirection: 'column'
  },
  myAccountSubContainerTitle: {
    marginBottom: '2rem'
  },
  myAccountSubContainerRight: {
    display: 'flex',
    width: '40%',
    flexDirection: 'column',
    alignItems: 'center'
  },

  myAccountLogoutButton: {
    width: '20rem',
    marginTop: '1rem'
  }
})

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getUserOrders()
  }
  render() {
    let count = 1
    const {handleClick, classes} = this.props

    const userInfo = this.props.userInfo
    return (
      <Container className={classes.myAccountContainer}>
        <Container className={classes.myAccountSubContainerLeft}>
          <Typography
            variant="h3"
            className={classes.myAccountSubContainerTitle}
          >
            Order History
          </Typography>
          {this.props.orderHistory.length ? (
            <List className={classes.orderHistoryContainer}>
              {this.props.orderHistory.map(order => {
                return (
                  <ListItem
                    key={order.id}
                    className={classes.singleOrderContainer}
                  >
                    <ShoppingBasket />
                    <Typography variant="h6">Order #: {count++}</Typography>
                    <Typography variant="subtitle1">
                      Ordered on:{' '}
                      {new Date(order.createdAt)
                        .toString()
                        .replace(/(\d\d:\d\d:\d\d).+/, '')}
                    </Typography>
                    <Typography variant="subtitle1">
                      Total Price: $ {order.totalPrice}
                    </Typography>
                  </ListItem>
                )
              })}
            </List>
          ) : (
            <CartEmpty />
          )}
        </Container>
        <Container className={classes.myAccountSubContainerRight}>
          <Typography
            variant="h3"
            className={classes.myAccountSubContainerTitle}
          >
            Account Details
          </Typography>
          <Typography variant="h6">Email: {userInfo.email}</Typography>

          <Button
            href="#"
            onClick={handleClick}
            variant="contained"
            color="primary"
            className={classes.myAccountLogoutButton}
          >
            <ArrowBack />
            <Typography>Logout</Typography>
          </Button>
        </Container>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderHistory: state.orderHistory,
    isLoggedIn: !!state.userAuth.id,
    userInfo: state.userAuth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserOrders: () => dispatch(getUserOrdersThunk()),
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
)
