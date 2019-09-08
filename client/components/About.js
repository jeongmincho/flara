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
    width: '50rem',
    marginLeft: '0',
    paddingLeft: '20px',
    display: 'flex',
    flexWrap: 'wrap'
  },
  welcomePageTitlePrimary: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    marginBottom: '1rem'
  },
  welcomePageTitleSecondary: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
    marginBottom: '1rem'
  },
  welcomePageSubtitle: {
    width: '35rem',
    margin: '1rem 0',
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
          Constant tinkering&nbsp;
        </Typography>
        <Typography variant="h2" className={classes.welcomePageTitlePrimary}>
          with&nbsp;
        </Typography>
        <Typography variant="h2" className={classes.welcomePageTitleSecondary}>
          alchemy&nbsp;
        </Typography>
        <Typography variant="h2" className={classes.welcomePageTitlePrimary}>
          to&nbsp;
        </Typography>
        <Typography variant="h2" className={classes.welcomePageTitlePrimary}>
          empower learning
        </Typography>
        <Typography variant="subtitle1" className={classes.welcomePageSubtitle}>
          We at Flara believe that the ability to learn is the greatest untold
          superpower in this world. We have spent the past year curating the
          right ingredients to deliver to our fellow alchemists around the
          world. Join our team!
        </Typography>
        <a
          href="https://www.linkedin.com/in/jeongmin-c/"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.welcomePageTitleButton}
        >
          <Button variant="contained" color="secondary">
            <Typography
              variant="subtitle1"
              className={classes.welcomePageTitleButtonText}
            >
              Meet the Team
            </Typography>
          </Button>
        </a>
      </Container>
      <img
        src="https://i.imgur.com/TmNHDUq.png"
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
