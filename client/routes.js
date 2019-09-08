import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, SignUpForm, UserHome} from './components'
import BookList from './components/BookList'
import BookSingle from './components/BookSingle'
import Cart from './components/Cart'
import About from './components/About'
import GuestCart from './components/GuestCart'
import OrderHistory from './components/OrderHistory'
import {me} from './store'
import {
  getLoggedInUserCartThunk,
  addProductToCartThunk,
  clearUserCart
} from './store/reducers/userCartReducer'
import {
  getGuestUserCartThunk,
  clearGuestCart
} from './store/reducers/userGuestCartReducer'
import {withStyles, Container} from '@material-ui/core'

const styles = theme => ({
  card: {
    width: 430,
    margin: 40,
    height: 300,
    boxShadow: '0px 0px 4px 0px #444444'
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'black'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    bottom: 0
  },
  pageBar: {
    marginBottom: '1.5rem'
  },
  routesContainer: {
    marginTop: '7rem',
    maxWidth: 'none'
  },
  welcomePageBackgroundImage: {
    /* Set rules to fill background */
    minHeight: '800px',
    minWidth: '1024px',
    /* Set up proportionate scaling */
    width: '65%',
    height: '100%',
    /* Set up positioning */
    position: 'fixed',
    top: 0,
    right: 0,
    zIndex: '-200'
  }
})

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.userAuth !== prevProps.userAuth) {
      if (!this.props.isLoggedIn) {
        this.props.clearUserCart()
      }
      if (this.props.isLoggedIn) {
        this.props.getLoggedInUserCart()
      }
    }
    if (
      this.props.userAuth !== prevProps.userAuth &&
      localStorage.getItem('cart') !== '[]'
    ) {
      this.props.clearGuestCart()
      const existingCart = JSON.parse(localStorage.getItem('cart'))
      // basically, these happen at the same time without waiting for one to be finished before the other. as aresult, it creates a cart for each product added
      // somehow need to create a cart first, then add products to the cart
      // probably need like a batch add thunk to handle this case for sign up... will be different for login
      existingCart.forEach(async product => {
        await this.props.addToCart(product.quantity, product.id)
      })
      localStorage.setItem('cart', '[]')
    }
  }

  render() {
    const {isLoggedIn, classes} = this.props
    return (
      <Container className={classes.routesContainer}>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUpForm} />
          {isLoggedIn ? (
            <Route path="/cart" component={Cart} />
          ) : (
            <Route
              path="/cart"
              render={() => <GuestCart {...this.props.userGuestCart} />}
            />
          )}
          <Route path="/books/:query" component={BookList} />
          <Route path="/singlebook/:query" component={BookSingle} />
          <Route path="/home" component={UserHome} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/orderHistory" component={OrderHistory} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
        <img
          src="https://i.imgur.com/Stuok4c.png"
          className={classes.welcomePageBackgroundImage}
        />
      </Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.userAuth.id will be falsey
    isLoggedIn: !!state.userAuth.id,
    userCart: state.userCart,
    userGuestCart: state.userGuestCart,
    userAuth: state.userAuth
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    clearGuestCart: () => dispatch(clearGuestCart()),
    getLoggedInUserCart: () => dispatch(getLoggedInUserCartThunk()),
    getGuestUserCart: () => dispatch(getGuestUserCartThunk()),
    addToCart: (quantity, bookId) =>
      dispatch(addProductToCartThunk(quantity, bookId)),
    clearUserCart: () => dispatch(clearUserCart())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withStyles(styles)(
  withRouter(connect(mapState, mapDispatch)(Routes))
)
/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
