import React from 'react'
import {connect} from 'react-redux'
import {
  getLoggedInUserCartThunk,
  deleteProductFromCartThunk,
  checkoutCartThunk,
  editProductCartThunk,
  getGuestUserCartThunk
} from '../store/reducers/userCartReducer'
import {populateBookListThunk} from '../store/reducers/bookListReducer'
import {populateProductOrdersThunk} from '../store/reducers/userProductOrdersReducer'
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
    Object.keys(this.props.userCart).length &&
      this.props.populateBookList(
        Object.keys(this.props.userCart)
          .map(id => `id=${id}`)
          .join('&')
      )
  }

  componentDidUpdate(prevProps) {
    if (this.props.userCart !== prevProps.userCart) {
      Object.keys(this.props.userCart).length &&
        this.props.populateBookList(
          Object.keys(this.props.userCart)
            .map(id => `id=${id}`)
            .join('&')
        )
    }
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
        {this.props.bookList ? (
          Object.keys(this.props.bookList).length === 0 ? (
            <div>
              <div>Your DevBites Cart is empty.</div>
              <Link to="menu">
                <Button type="button" variant="contained" color="primary">
                  Go to Menus
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <List>
                {Object.keys(this.props.bookList).map(key => {
                  const book = this.props.bookList[key]
                  const bookOrder = this.props.userCart[book.id]
                  totalPrice += book.price * bookOrder.quantity
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
                            // onClick={() => {
                            //   this.handleDeleteProduct(
                            //     book.id,
                            //     this.props.cart.id
                            //   )
                            // }}
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
                          <ListItemText primary={bookOrder.quantity} />
                          {/* <EditBtn
                            quantity={this.props.userCart[book.id].quantity}
                            price={book.price}
                            handleEdit={this.handleEditProduct}
                            productId={book.id}
                            orderId={this.props.cart.id}
                          /> */}
                        </div>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                  )
                })

                //   this.props.bookList.map(book => {
                //   totalPrice +=
                //     book.price * this.props.userCart[book.id].quantity
                //   return (
                //     <div
                //       key={book.id}
                //       style={{
                //         display: 'flex',
                //         alignItems: 'center'
                //       }}
                //     >
                //       <ListItem>
                //         <ListItemAvatar>
                //           <Avatar>
                //             <Fab
                //             // onClick={() => {
                //             //   this.handleDeleteProduct(
                //             //     book.id,
                //             //     this.props.cart.id
                //             //   )
                //             // }}
                //             >
                //               {' '}
                //               <DeleteForever />{' '}
                //             </Fab>
                //           </Avatar>
                //         </ListItemAvatar>
                //         <div
                //           style={{
                //             display: 'flex',
                //             flexDirection: 'column',
                //             width: '20rem'
                //           }}
                //         >
                //           <ListItemText primary={book.title} />
                //           <EditBtn
                //             quantity={this.props.userCart[book.id].quantity}
                //             price={book.price}
                //             handleEdit={this.handleEditProduct}
                //             productId={book.id}
                //             orderId={this.props.cart.id}
                //           />
                //         </div>
                //       </ListItem>
                //       <Divider variant="inset" component="li" />
                //     </div>
                //   )
                // })}
                }
              </List>
              <br />
              Total Price of Cart: ${totalPrice}
              <br />
              <Button
                type="button"
                // onClick={() => {
                //   this.handleCheckoutCart(this.props.cart.id, totalPrice)
                // }}
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
    userCart: state.userCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getGuestUserCart: () => dispatch(getGuestUserCartThunk()),
    populateProductOrders: () => dispatch(populateProductOrdersThunk()),
    populateBookList: query => dispatch(populateBookListThunk(query))
    // getLoggedInUserCart: () => dispatch(getLoggedInUserCartThunk())
    // deleteProductFromCart: (productId, orderId) =>
    //   dispatch(deleteProductFromCartThunk(productId, orderId)),
    // checkoutCart: (orderId, totalPrice) =>
    //   dispatch(checkoutCartThunk(orderId, totalPrice)),
    // editBtnCart: (userId, productId, orderId, quantity) =>
    //   dispatch(editProductCartThunk(userId, productId, orderId, quantity))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
