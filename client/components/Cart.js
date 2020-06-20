import React from 'react'
import {connect} from 'react-redux'
import {
  getLoggedInUserCartThunk,
  deleteProductFromCartThunk,
  checkoutCartThunk,
  editProductCartThunk,
  clearUserCart
} from '../store/reducers/userCartReducer'

import {List, Container, Typography} from '@material-ui/core'
import CartItem from './Cart/CartItem'
import CartListLabel from './Cart/CartListLabel'
import CartListTotal from './Cart/CartListTotal'
import CartListCheckout from './Cart/CartListCheckout'
import CartEmpty from './Cart/CartEmpty'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
    this.handleCheckoutCart = this.handleCheckoutCart.bind(this)
    this.handleEditProduct = this.handleEditProduct.bind(this)
  }

  componentDidMount() {
    this.props.getLoggedInUserCart(this.props.user.id)
  }

  handleCheckoutCart() {
    this.props.checkoutCart()
  }

  handleDeleteProduct(productId) {
    this.props.deleteProductFromCart(productId)
  }

  handleEditProduct(productId, orderId, quantity) {
    // expect this function to pass down to EditBtn component as prop
    this.props.editBtnCart(this.props.user.id, productId, orderId, quantity)
  }

  render() {
    let totalPrice = 0
    return (
      <Container>
        <Typography variant="h4">Your Alchemy Cart</Typography>
        {this.props.cart && this.props.cart.products ? (
          this.props.cart.products.length === 0 ? (
            <CartEmpty />
          ) : (
            <Container>
              <List>
                <CartListLabel />
                {this.props.cart.products.map(product => {
                  const {quantity} = product.productOrder
                  totalPrice += product.price * quantity
                  return (
                    <CartItem
                      product={product}
                      handleDeleteProduct={this.handleDeleteProduct}
                      handleEditProduct={this.handleEditProduct}
                      quantity={quantity}
                      cartId={this.props.cart.id}
                      key={product.id}
                    />
                  )
                })}
              </List>
              <CartListTotal totalPrice={totalPrice} />
              <CartListCheckout handleCheckoutCart={this.handleCheckoutCart} />
            </Container>
          )
        ) : (
          <CartEmpty />
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.userCart,
    user: state.userAuth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLoggedInUserCart: userId => dispatch(getLoggedInUserCartThunk(userId)),
    deleteProductFromCart: productId =>
      dispatch(deleteProductFromCartThunk(productId)),
    checkoutCart: () => dispatch(checkoutCartThunk()),
    editBtnCart: (userId, productId, orderId, quantity) =>
      dispatch(editProductCartThunk(userId, productId, orderId, quantity)),
    clearUserCart: () => dispatch(clearUserCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
