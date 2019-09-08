import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {
  Container,
  TextField,
  Typography,
  Button,
  Paper
} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import {BrightnessHigh} from '@material-ui/icons'

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
  }
}))

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  const classes = useStyles()

  return (
    <Container className={classes.loginFormContainer}>
      <Paper className={classes.loginFormPaper}>
        <BrightnessHigh className={classes.loginFormIcon} color="primary" />
        <Container className={classes.loginFormTitleContainer}>
          <Typography variant="h4">Hello alchemist,</Typography>
          <Typography variant="subtitle1">
            Welcome back for more magic.
          </Typography>
        </Container>
        <form onSubmit={handleSubmit} name={name} className={classes.loginForm}>
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
      </Paper>
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </Container>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.userAuth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
