import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
// import {getLoggedInUserCartThunk} from '../store/reducers/userCartReducer'
import {Breadcrumbs, Button, withStyles, Badge} from '@material-ui/core'
import {
  Home,
  // ShoppingCart,
  Person,
  RestaurantMenu,
  PersonAdd,
  ArrowBack
} from '@material-ui/icons'

const styles = theme => ({
  icon: {
    marginRight: 10
  },
  cart: {
    marginRight: 15
  }
})

class Navbar extends React.Component {
  componentDidMount() {
    // this.props.isLoggedIn && this.props.getLoggedInUserCart()
  }

  render() {
    const {handleClick, isLoggedIn, classes} = this.props
    const linkStyle = {textDecoration: 'none', color: 'black'}
    const materialRouter = React.forwardRef((props, ref) => (
      <Link innerRef={ref} {...props} />
    ))
    return (
      <div>
        <div className="title-header">
          <h1>FLARA</h1>
          <nav className="nav-bar">
            {isLoggedIn ? (
              <div className="nav-div">
                <Breadcrumbs>
                  {/* The navbar will show these links after you log in */}
                  <Button
                    component={materialRouter}
                    style={linkStyle}
                    to="/home"
                  >
                    {' '}
                    <Home className={classes.icon} />
                    Home
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/accountDetails"
                    style={linkStyle}
                  >
                    {' '}
                    <Person className={classes.icon} />
                    My Account
                  </Button>
                  <Button href="#" onClick={handleClick} style={linkStyle}>
                    {' '}
                    <ArrowBack className={classes.icon} />
                    Logout
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/books/limit=10&offset=0"
                    style={linkStyle}
                  >
                    {' '}
                    <RestaurantMenu className={classes.icon} />
                    Books
                  </Button>
                  {/* <Button
                    component={materialRouter}
                    to="/cart"
                    style={linkStyle}
                  > */}
                  {/* <Badge
                      badgeContent={
                        this.props.userCart &&
                        (this.props.userCart.meals &&
                          this.props.userCart.meals.length)
                      }
                      color="primary"
                      className={classes.cart}
                    >
                      {' '}
                      <ShoppingCart className={classes.icon} />{' '}
                    </Badge>{' '}
                    Cart{' '} */}
                  {/* </Button> */}
                </Breadcrumbs>
              </div>
            ) : (
              <div className="nav-div">
                <Breadcrumbs>
                  {/* The navbar will show these links before you log in */}
                  <Button
                    component={materialRouter}
                    to="/login"
                    style={linkStyle}
                  >
                    {' '}
                    <Person className={classes.icon} />
                    Login
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/signup"
                    style={linkStyle}
                  >
                    {' '}
                    <PersonAdd className={classes.icon} />
                    Sign Up
                  </Button>
                  <Button
                    component={materialRouter}
                    to="/menu/limit=10&offset=0"
                    style={linkStyle}
                  >
                    {' '}
                    <RestaurantMenu className={classes.icon} />
                    Books
                  </Button>
                </Breadcrumbs>
              </div>
            )}
          </nav>
        </div>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.userAuth.id,
    userId: state.userAuth.id
    // userCart: state.userCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
    // getLoggedInUserCart: () => dispatch(getLoggedInUserCartThunk())
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Navbar)
)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
