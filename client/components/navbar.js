import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getLoggedInUserCartThunk} from '../store/reducers/userCartReducer'
import {getGuestUserCartThunk} from '../store/reducers/userGuestCartReducer'
import {
  Container,
  Breadcrumbs,
  Button,
  withStyles,
  Badge,
  Typography
} from '@material-ui/core'
import {
  ShoppingCart,
  Person,
  WbIncandescent,
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
  navBarLink: {
    margin: '0 1rem',
    fontSize: '18px'
  },
  navBarLinkText: {
    marginLeft: '1rem'
  }
})

class Navbar extends React.Component {
  componentDidMount() {
    this.props.isLoggedIn
      ? this.props.getLoggedInUserCart()
      : this.props.getGuestUserCart()
  }

  render() {
    const {isLoggedIn, classes} = this.props
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
          {/* {isLoggedIn ? ( */}
          <Breadcrumbs className={classes.navBarBreadcrumbs}>
            {/* The navbar will show these links after you log in */}
            <Button
              component={materialRouter}
              to="/about"
              style={linkStyle}
              className={classes.navBarLink}
            >
              <WbIncandescent className={classes.icon} />
              <Typography className={classes.navBarLinkText}>
                About Us
              </Typography>
            </Button>
            <Button
              component={materialRouter}
              to="/books/limit=12&offset=0"
              style={linkStyle}
              className={classes.navBarLink}
            >
              {' '}
              <Whatshot className={classes.icon} />
              <Typography className={classes.navBarLinkText}>Gems</Typography>
            </Button>
            <Button
              component={materialRouter}
              to="/cart"
              style={linkStyle}
              className={classes.navBarLink}
            >
              <Badge
                badgeContent={
                  isLoggedIn
                    ? this.props.userCart &&
                      (this.props.userCart.products &&
                        this.props.userCart.products.length)
                    : this.props.userGuestCart &&
                      Object.keys(this.props.userGuestCart).length
                }
                color="primary"
                className={classes.cart}
              >
                {' '}
                <ShoppingCart className={classes.icon} />
              </Badge>
              <Typography className={classes.navBarLinkText}>Cart</Typography>
            </Button>
          </Breadcrumbs>
          <Button
            component={materialRouter}
            to={isLoggedIn ? '/orderhistory' : '/login'}
            style={linkStyle}
            className={classes.navBarLink}
          >
            <Person className={classes.icon} />
            <Typography className={classes.navBarLinkText}>
              {isLoggedIn ? 'My Account' : 'Login'}
            </Typography>
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
  isLoggedIn: PropTypes.bool.isRequired
}
