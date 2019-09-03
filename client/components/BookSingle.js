import React from 'react'
import {
  populateBookListThunk,
  clearBookList
} from '../store/reducers/bookListReducer'
import {
  getLoggedInUserCartThunk,
  addProductToCartThunk,
  addProductToGuestCartThunk
} from '../store/reducers/userCartReducer'
import {connect} from 'react-redux'
import {Grid, Paper, Typography, withStyles} from '@material-ui/core'

const styles = theme => ({
  singleBookBody: {
    marginLeft: 10
  }
})

class singleBook extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: '1'
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      quantity: event.target.value
    })
  }

  handleSubmit(productId) {
    this.props.isLoggedIn
      ? this.props.addToCart(this.state.quantity, productId)
      : this.props.addToGuestCart(this.state.quantity, productId)
  }

  componentDidMount() {
    const query = this.props.match.params.query
    this.props.populateBookListThunk(query)
    this.props.getLoggedInUserCart()
  }

  componentWillUnmount() {
    this.props.clearBookList()
  }

  render() {
    const book = this.props.bookList[Object.keys(this.props.bookList)[0]]
    const classes = this.props
    if (!book) return <div>not yet</div>
    return (
      <div key={book.id}>
        <Paper className="single-Book-whole-paper">
          <Grid container justify="center">
            <Grid>
              <h1>{book.name}</h1>
              <img src={book.imageUrl} alt="book image" style={{width: 400}} />
            </Grid>
            <Grid
              item
              xs
              container
              direction="column"
              justify="center"
              className={classes.singleBookBody}
              style={{marginLeft: 150}}
            >
              <Typography gutterBottom variant="subtitle1" style={{width: 500}}>
                {book.description}
              </Typography>
              <br />
              <Typography variant="h6">calories: {book.calories}</Typography>
              <br />
              <Typography>${book.price}</Typography>

              <div>
                <select onChange={this.handleChange}>
                  {Array(5)
                    .fill(1)
                    .map((val, i) => {
                      return (
                        <option value={val + i} key={val + i}>
                          {val + i}
                        </option>
                      )
                    })}
                </select>

                <button
                  type="submit"
                  onClick={() => {
                    this.handleSubmit(book.id)
                  }}
                  disabled={
                    this.props.userCart &&
                    (this.props.userCart.books &&
                      this.props.userCart.books.some(
                        cartItem => cartItem.id === book.id
                      ))
                  }
                >
                  Add to Cart
                </button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    bookList: state.bookList,
    isLoggedIn: !!state.userAuth.id,
    userId: state.userAuth.id,
    userCart: state.userCart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getLoggedInUserCart: () => dispatch(getLoggedInUserCartThunk()),
    addToCart: (quantity, bookId) =>
      dispatch(addProductToCartThunk(quantity, bookId)),
    addToGuestCart: (quantity, bookId) =>
      dispatch(addProductToGuestCartThunk(quantity, bookId)),
    populateBookListThunk: query => dispatch(populateBookListThunk(query)),
    clearBookList: () => dispatch(clearBookList())
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(singleBook)
)
