import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signup} from '../store'
import {addProductToCartThunk} from '../store/reducers/userCartReducer'

class Signup extends React.Component {
  constructor() {
    super()
    // this.handleGuestSignUpWithCart = this.handleGuestSignUpWithCart.bind(this)
  }

  // async handleGuestSignUpWithCart(evt) {
  //   await this.props.handleSignup(evt)
  //   const existingCart = JSON.parse(localStorage.getItem('cart'))
  //   existingCart.forEach(product => {
  //     this.props.addToCart(product.id, product.quantity)
  //   })
  //   localStorage.setItem('cart', '[]')
  // }

  render() {
    const {name, displayName, handleSignup, error} = this.props

    return (
      <div>
        <form
          onSubmit={
            // !localStorage.getItem('cart')
            //   ? handleSignup
            //   : this.handleGuestSignUpWithCart
            handleSignup
          }
          name={name}
        >
          <div>
            <label>
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label>
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
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
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div>
    )
  }
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
