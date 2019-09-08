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
import EditButtonGuest from './EditButtonGuest'

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
      <div>
        <h2>Shopping Cart</h2>
        {this.props.bookList ? (
          Object.keys(this.props.bookList).length === 0 ? (
            <div>
              <div>Your DevBites Guest Cart is empty.</div>
              <Link to="/books/limit=12&offset=0">
                <Button type="button" variant="contained" color="primary">
                  Go to Books
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <List>
                {Object.keys(this.props.bookList).map(key => {
                  const book = this.props.bookList[key]
                  const bookOrder = this.props.userGuestCart[book.id]
                  bookOrder && (totalPrice += book.price * bookOrder.quantity)
                  return (
                    <div
                      key={book.id}
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
                                this.handleDeleteProduct(book.id)
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
                          <ListItemText primary={book.title} />
                          <ListItemText
                            primary={bookOrder && bookOrder.quantity}
                          />
                          <EditButtonGuest
                            quantity={bookOrder && bookOrder.quantity}
                            handleEdit={this.handleEditProduct}
                            productId={book.id}
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
                  this.handleCheckoutCart()
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
