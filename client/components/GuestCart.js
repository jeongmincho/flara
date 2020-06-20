import React from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {
  deleteProductFromGuestCartThunk,
  editProductGuestCartThunk,
  getGuestUserCartThunk
} from '../store/reducers/userGuestCartReducer'
import {
  populateBookListThunk,
  clearBookList
} from '../store/reducers/bookListReducer'
import {Container, List, Typography} from '@material-ui/core'
import CartItem from './Cart/CartItem'
import CartEmpty from './Cart/CartEmpty'
import CartListLabel from './Cart/CartListLabel'
import CartListTotal from './Cart/CartListTotal'
import CartListCheckout from './Cart/CartListCheckout'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
    this.handleCheckoutCart = this.handleCheckoutCart.bind(this)
    this.handleEditProduct = this.handleEditProduct.bind(this)
  }

  componentDidMount() {
    Object.keys(this.props.userGuestCart).length &&
      this.props.populateBookList(
        Object.keys(this.props.userGuestCart)
          .map(id => `id=${id}`)
          .join('&')
      )
  }

  componentDidUpdate(prevProps) {
    if (this.props.userGuestCart !== prevProps.userGuestCart) {
      Object.keys(this.props.userGuestCart).length
        ? this.props.populateBookList(
            Object.keys(this.props.userGuestCart)
              .map(id => `id=${id}`)
              .join('&')
          )
        : this.props.clearBookList()
    }
  }

  componentWillUnmount() {
    this.props.clearBookList()
  }

  handleCheckoutCart() {
    history.push('/signup')
  }

  handleDeleteProduct(bookId) {
    this.props.deleteProductFromGuestCart(bookId)
  }

  handleEditProduct(productId, quantity) {
    this.props.editProductGuestCart(productId, quantity)
  }

  render() {
    let totalPrice = 0
    return (
      <Container>
        <Typography variant="h4">Your Alchemy Cart</Typography>{' '}
        {this.props.bookList ? (
          Object.keys(this.props.bookList).length === 0 ? (
            <CartEmpty />
          ) : (
            <Container>
              <List>
                <CartListLabel />
                {Object.keys(this.props.bookList).map(key => {
                  const book = this.props.bookList[key]
                  const bookOrder = this.props.userGuestCart[book.id]
                  bookOrder && (totalPrice += book.price * bookOrder.quantity)
                  return (
                    <CartItem
                      product={book}
                      handleDeleteProduct={this.handleDeleteProduct}
                      handleEditProduct={this.handleEditProduct}
                      quantity={bookOrder && bookOrder.quantity}
                      cartId={null}
                      key={book.id}
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
    bookList: state.bookList,
    userGuestCart: state.userGuestCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getGuestUserCart: () => dispatch(getGuestUserCartThunk()),
    populateBookList: query => dispatch(populateBookListThunk(query)),
    deleteProductFromGuestCart: productId =>
      dispatch(deleteProductFromGuestCartThunk(productId)),
    clearBookList: () => dispatch(clearBookList()),
    editProductGuestCart: (productId, quantity) =>
      dispatch(editProductGuestCartThunk(productId, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
