import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {signup} from '../store'
import {addProductToCartThunk} from '../store/reducers/userCartReducer'
import {
  Container,
  TextField,
  Typography,
  Button,
  Paper
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {BrightnessHigh} from '@material-ui/icons'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const useStyles = makeStyles(theme => ({
  loginFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    maxWidth: 'none',
    position: 'absolute',
    top: 0
  },
  loginFormPaper: {
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginFormTitleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '1.2rem 0'
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  loginFormTextField: {
    width: '20rem'
  },
  loginFormSubmitButton: {
    marginTop: '1rem'
  },
  loginFormIcon: {
    width: '3rem',
    height: 'auto'
  },
  signupContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem'
  },
  signupLink: {
    textDecoration: 'none',
    color: theme.palette.secondary.main
  }
}))

const Signup = props => {
  const {name, displayName, handleSignup, error} = props
  const classes = useStyles()

  return (
    <Container className={classes.loginFormContainer}>
      <Paper className={classes.loginFormPaper}>
        <BrightnessHigh className={classes.loginFormIcon} color="primary" />
        <Container className={classes.loginFormTitleContainer}>
          <Typography variant="h4">Hello adventurer,</Typography>
          <Typography variant="subtitle1">
            Welcome to the world of alchemy.
          </Typography>
        </Container>
        <form onSubmit={handleSignup} name={name} className={classes.loginForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            className={classes.loginFormTextField}
            InputProps={{
              style: {
                backgroundColor: 'white',
                borderRadius: '5px'
              }
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            className={classes.loginFormTextField}
            InputProps={{
              style: {
                backgroundColor: 'white',
                borderRadius: '5px'
              }
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className={classes.loginFormSubmitButton}
          >
            <Typography
              variant="subtitle1"
              className={classes.loginFormSubmitButtonText}
            >
              {displayName}
            </Typography>
          </Button>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <Container className={classes.signupContainer}>
          <Typography variant="subtitle1">
            Already an alchemist at Flara?&nbsp;
          </Typography>
          <Link to="/login" className={classes.signupLink}>
            <Typography variant="subtitle1">Login!</Typography>
          </Link>
        </Container>
      </Paper>

      {/* <a href="/auth/google">{displayName} with Google</a> */}
      {/* <div>
            <label>
              <small>First Name</small>
            </label>
            <input name="firstName" type="firstName" />
          </div>
          <div>
            <label>
              <small>Last Name</small>
            </label>
            <input name="lastName" type="lastName" />
          </div>
          <div>
            <label>
              <small>Address</small>
            </label>
            <input name="address" type="address" />
          </div> */}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.userAuth.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSignup(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      const password = evt.target.password.value
      // const firstName = evt.target.firstName.value
      // const lastName = evt.target.lastName.value
      // const address = evt.target.address.value
      const newUser = {
        email,
        password
        // firstName, lastName, address
      }
      dispatch(signup(newUser))
    },

    addToCart: (quantity, bookId) =>
      dispatch(addProductToCartThunk(quantity, bookId))
  }
}

export const SignUpForm = connect(mapStateToProps, mapDispatchToProps)(Signup)

/**
 * PROP TYPES
 */
Signup.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSignup: PropTypes.func.isRequired,
  error: PropTypes.object
}
