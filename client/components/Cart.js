import React from 'react'
import {connect} from 'react-redux'
import {
  getLoggedInUserCartThunk,
  deleteProductFromCartThunk,
  checkoutCartThunk,
  editProductCartThunk,
  clearUserCart
} from '../store/reducers/userCartReducer'
import {Link} from 'react-router-dom'
import {DeleteForever} from '@material-ui/icons'
import {
  Fab,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core'
import EditBtn from './EditButton'

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

  componentWillUnmount() {
    this.props.clearUserCart()
  }

  handleCheckoutCart(orderId, totalPrice) {
    this.props.checkoutCart(orderId, totalPrice)
  }

  handleDeleteProduct(productId, orderId) {
    this.props.deleteProductFromCart(productId, orderId)
  }

  handleEditProduct(productId, orderId, quantity) {
    // expect this function to pass down to EditBtn component as prop
    this.props.editBtnCart(this.props.user.id, productId, orderId, quantity)
  }

  render() {
    let totalPrice = 0
    return (
      <div>
        <h2>Shopping Cart</h2>
        {this.props.cart && this.props.cart.products ? (
          this.props.cart.products.length === 0 ? (
            <div>
              <div>Your DevBites Cart is empty.</div>
              <Link to="/books/limit=10&offset=0">
                <Button type="button" variant="contained" color="primary">
                  Go to Books
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <List>
                {this.props.cart.products.map(product => {
                  const {quantity} = product.productOrder
                  totalPrice += product.price * quantity
                  return (
                    <div
                      key={product.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Fab
                              onClick={() => {
                                this.handleDeleteProduct(
                                  product.id,
                                  this.props.cart.id
                                )
                              }}
                            >
                              {' '}
                              <DeleteForever />{' '}
                            </Fab>
                          </Avatar>
                        </ListItemAvatar>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '20rem'
                          }}
                        >
                          <ListItemText primary={product.title} />
                          <EditBtn
                            quantity={quantity}
                            price={product.price}
                            handleEdit={this.handleEditProduct}
                            productId={product.id}
                            orderId={this.props.cart.id}
                          />
                        </div>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                  )
                })}
              </List>
              <br />
              Total Price of Cart: ${totalPrice}
              <br />
              <Button
                type="button"
                onClick={() => {
                  this.handleCheckoutCart(this.props.cart.id, totalPrice)
                }}
                color="primary"
                variant="contained"
              >
                Checkout
              </Button>
            </div>
          )
        ) : (
          <div>Empty Cart</div>
        )}
      </div>
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
    deleteProductFromCart: (productId, orderId) =>
      dispatch(deleteProductFromCartThunk(productId, orderId)),
    checkoutCart: (orderId, totalPrice) =>
      dispatch(checkoutCartThunk(orderId, totalPrice)),
    editBtnCart: (userId, productId, orderId, quantity) =>
      dispatch(editProductCartThunk(userId, productId, orderId, quantity)),
    clearUserCart: () => dispatch(clearUserCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
