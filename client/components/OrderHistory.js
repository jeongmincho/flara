import React from 'react'
import {getUserOrdersThunk} from '../store/orderHistoryReducer'
import {connect} from 'react-redux'
import {logout} from '../store'

import {
  Typography,
  List,
  ListItem,
  Divider,
  Grid,
  Button
} from '@material-ui/core'
import {ShoppingBasket, ArrowBack} from '@material-ui/icons'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getUserOrders()
  }
  render() {
    let count = 1
    const {handleClick, classes} = this.props

    const userInfo = this.props.userInfo
    return (
      <div>
        <Grid container direction="row" justify="space-evenly">
          <Grid>
            <Typography variant="h3">Order History</Typography>
            {this.props.orderHistory.length ? (
              <div>
                <div style={{margin: '0.5rem', marginBottom: '1rem'}}>
                  Ordered by the time order was submitted.
                </div>
                {this.props.orderHistory.map(order => {
                  return (
                    <div
                      key={order.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <List>
                        <ListItem>
                          <ShoppingBasket />
                          <h3 style={{margin: '0.5rem', marginRight: '2rem'}}>
                            Order ID: {count++}
                          </h3>
                          <div>
                            Ordered on:{' '}
                            {new Date(order.createdAt)
                              .toString()
                              .replace(/(\d\d:\d\d:\d\d).+/, '')}
                          </div>
                          <p style={{margin: '0.5rem', marginRight: '2rem'}}>
                            Total Price: $ {order.totalPrice}
                          </p>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </List>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div>No Order History</div>
            )}
          </Grid>
          <Grid>
            <div>
              <h1>Account Details</h1>
              <h4>Name: </h4>
              <p>
                {userInfo.firstName} {userInfo.lastName}
              </p>
              <br />
              <h4>Current Address:</h4> <p>{userInfo.address}</p>
              <br />
              <h4>Email:</h4> <p>{userInfo.email}</p>
            </div>
            <Button href="#" onClick={handleClick}>
              <ArrowBack />
              <Typography>Logout</Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
