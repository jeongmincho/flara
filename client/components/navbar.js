import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getLoggedInUserCartThunk} from '../store/reducers/userCartReducer'
import {getGuestUserCartThunk} from '../store/reducers/userGuestCartReducer'
import {
  Container,
  Breadcrumbs,
  Button,
  withStyles,
  Badge
} from '@material-ui/core'
import {
  Home,
  ShoppingCart,
  Person,
  RestaurantBook,
  WbIncandescent,
  PersonAdd,
  ArrowBack,
  Whatshot
} from '@material-ui/icons'

const styles = theme => ({
  navBarContainer: {
    display: 'flex',
    maxWidth: 'none',
    position: 'absolute',
    top: 0,
    zIndex: 100,
    paddingTop: '1.5rem',
    paddingLeft: '3rem'
  },
  navBarLogoImage: {
    width: '8rem',
    height: '2.7rem'
  },
  navBarLinksContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  navBarBreadcrumbs: {
    margin: '0 auto'
  },
  icon: {
    marginRight: 14
  },
  navBarLink: {
    margin: '0 1rem',
    fontSize: '18px'
  }
  // cart: {
  //   marginRight: 10
  // },
})

class Navbar extends React.Component {
  componentDidMount() {
    this.props.isLoggedIn
      ? this.props.getLoggedInUserCart()
      : this.props.getGuestUserCart()
  }

  render() {
    const {handleClick, isLoggedIn, classes} = this.props
    const linkStyle = {textDecoration: 'none', color: 'black'}
    const materialRouter = React.forwardRef((props, ref) => (
      <Link innerRef={ref} {...props} />
    ))
    return (
      <Container className={classes.navBarContainer}>
        <Link to="/home">
          <img
            src="https://i.imgur.com/1MBTfnZ.png"
            className={classes.navBarLogoImage}
          />
        </Link>
        <Container className={classes.navBarLinksContainer}>
          {isLoggedIn ? (
            <Breadcrumbs className={classes.navBarBreadcrumbs}>
              {/* The navbar will show these links after you log in */}
              <Button
                component={materialRouter}
                style={linkStyle}
                to="/home"
                className={classes.navBarLink}
              >
                {' '}
                <Home className={classes.icon} />
                Home
              </Button>
              <Button
                component={materialRouter}
                to="/orderHistory"
                style={linkStyle}
                className={classes.navBarLink}
              >
                {' '}
                <Person className={classes.icon} />
                My Account
              </Button>
              <Button
                href="#"
                onClick={handleClick}
                style={linkStyle}
                className={classes.navBarLink}
              >
                {' '}
                <ArrowBack className={classes.icon} />
                Logout
              </Button>
              <Button
                component={materialRouter}
                to="/books/limit=12&offset=0"
                style={linkStyle}
              >
                {' '}
                <Whatshot className={classes.icon} />
                Gems
              </Button>
              <Button
                component={materialRouter}
                to="/cart"
                style={linkStyle}
                className={classes.navBarLink}
              >
                <Badge
                  badgeContent={
                    this.props.userCart &&
                    (this.props.userCart.products &&
                      this.props.userCart.products.length)
                  }
                  color="primary"
                  className={classes.cart}
                >
                  {' '}
                  <ShoppingCart className={classes.icon} />
                </Badge>
                Cart{' '}
              </Button>
            </Breadcrumbs>
          ) : (
            <Breadcrumbs className={classes.navBarBreadcrumbs}>
              {/* The navbar will show these links before you log in */}
              {/* <Button
                  component={materialRouter}
                  to="/login"
                  style={linkStyle}
                >
                  {' '}
                  <Person className={classes.icon} />
                  Login
                </Button> */}
              {/* <Button
                  component={materialRouter}
                  to="/signup"
                  style={linkStyle}
                >
                  {' '}
                  <PersonAdd className={classes.icon} />
                  Sign Up
                </Button> */}
              <Button
                component={materialRouter}
                to="/about"
                style={linkStyle}
                className={classes.navBarLink}
              >
                {' '}
                <WbIncandescent className={classes.icon} />
                About Us
              </Button>
              <Button
                component={materialRouter}
                to="/books/limit=12&offset=0"
                style={linkStyle}
                className={classes.navBarLink}
              >
                {' '}
                <Whatshot className={classes.icon} />
                Gems
              </Button>
              <Button
                component={materialRouter}
                to="/cart"
                style={linkStyle}
                className={classes.navBarLink}
              >
                <Badge
                  badgeContent={
                    this.props.userGuestCart &&
                    Object.keys(this.props.userGuestCart).length
                  }
                  color="primary"
                  className={classes.cart}
                >
                  {' '}
                  <ShoppingCart className={classes.icon} />{' '}
                </Badge>{' '}
                Cart{' '}
              </Button>
            </Breadcrumbs>
          )}
          <Button
            component={materialRouter}
            to="/login"
            style={linkStyle}
            className={classes.navBarLink}
          >
            {' '}
            <Person className={classes.icon} />
            {isLoggedIn ? 'My Account' : 'Login'}
          </Button>
        </Container>
      </Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.userAuth.id,
    userId: state.userAuth.id,
    userCart: state.userCart,
    userGuestCart: state.userGuestCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getLoggedInUserCart: () => dispatch(getLoggedInUserCartThunk()),
    getGuestUserCart: () => dispatch(getGuestUserCartThunk())
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
