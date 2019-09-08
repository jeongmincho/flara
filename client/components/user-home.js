import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Typography, Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  welcomePageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    maxWidth: 'none',
    position: 'absolute',
    top: 0
  },
  welcomePageTitleContainer: {
    width: '36rem',
    marginLeft: '5%',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '5rem 0'
  },
  welcomePageTitlePrimary: {
    fontWeight: 'bold',
    color: theme.palette.primary.main
  },
  welcomePageTitleSecondary: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
    marginBottom: '1rem'
  },
  welcomePageSubtitle: {
    marginTop: '1rem',
    color: '#606060',
    fontSize: '1.2rem'
  },
  welcomePageTitleButton: {
    margin: '1.2rem auto 0 25%'
  },
  welcomePageTitleButtonText: {},
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
    zIndex: '-100'
  }
}))
export const UserHome = props => {
  const classes = useStyles()

  const {email} = props

  return (
    <Container className={classes.welcomePageContainer}>
      <Container className={classes.welcomePageTitleContainer}>
        <Typography variant="h2" className={classes.welcomePageTitlePrimary}>
          Spark the&nbsp;
        </Typography>
        <Typography variant="h2" className={classes.welcomePageTitleSecondary}>
          flare
        </Typography>
        <Typography variant="h2" className={classes.welcomePageTitlePrimary}>
          in your learning
        </Typography>
        <Typography variant="subtitle1" className={classes.welcomePageSubtitle}>
          Great ebook deals, handpicked recommendations, and updates from your
          favorite authors.
        </Typography>
        <Link to="signup" className={classes.welcomePageTitleButton}>
          <Button variant="contained" color="secondary">
            <Typography
              variant="subtitle1"
              className={classes.welcomePageTitleButtonText}
            >
              Start Your Journey
            </Typography>
          </Button>
        </Link>
      </Container>
      <img
        src="https://i.imgur.com/G2iQH8B.png"
        className={classes.welcomePageBackgroundImage}
      />
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.userAuth.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
