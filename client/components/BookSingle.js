import React from 'react'
import {
  populateBookListThunk,
  clearBookList
} from '../store/reducers/bookListReducer'
import {
  getLoggedInUserCartThunk,
  addProductToCartThunk,
  clearUserCart
} from '../store/reducers/userCartReducer'
import {
  addProductToGuestCartThunk,
  getGuestUserCartThunk
} from '../store/reducers/userGuestCartReducer'
import {connect} from 'react-redux'
import {
  Paper,
  Typography,
  withStyles,
  Collapse,
  IconButton,
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core'
import clsx from 'clsx'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  bookSingleDisplayContainer: {
    display: 'flex',
    paddingTop: '2rem'
  },
  bookSingleDisplayLeftSubcontainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '25rem'
  },
  bookSingleDisplayRightSubcontainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  bookSingleDisplayImage: {
    width: '20rem',
    height: '30rem'
  },
  singleBookBody: {
    marginLeft: 10
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    width: '3rem',
    height: '3rem',
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    width: '3rem',
    height: '3rem',
    transform: 'rotate(180deg)'
  },
  bookSingleSelectQuantityContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  bookSingleDisplayDescription: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '8rem',
    justifyContent: 'space-evenly'
  },
  bookSingleDisplayTitle: {
    marginBottom: '1rem'
  },
  bookSingleDisplayAuthors: {
    marginBottom: '1rem'
  },
  bookSingleDisplayDescriptionContainer: {
    maxHeight: '25rem',
    overflow: 'scroll',
    padding: '0'
  },
  bookSingleDisplayCollapseContainer: {
    display: 'flex',
    paddingLeft: '0'
  }
})

class singleBook extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: '1',
      expanded: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setExpanded = this.setExpanded.bind(this)
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
  }

  componentDidUpdate(prevProps) {
    if (this.props.userAuth !== prevProps.userAuth) {
      if (this.props.isLoggedIn) {
        this.props.getLoggedInUserCart()
      } else {
        this.props.getGuestUserCart()
      }
    }
  }

  componentWillUnmount() {
    this.props.clearBookList()
  }

  setExpanded(val) {
    this.setState({
      expanded: val
    })
  }

  render() {
    const {classes} = this.props
    const book = this.props.bookList[Object.keys(this.props.bookList)[0]]
    if (!book) return <div>not yet</div>
    const authors = book.author.join(', ')
    return (
      <Container className={classes.bookSingleDisplayContainer}>
        <Container className={classes.bookSingleDisplayLeftSubcontainer}>
          <img
            src={book.imageUrl}
            alt="book image"
            className={classes.bookSingleDisplayImage}
          />
          <Container className={classes.bookSingleDisplayDescription}>
            <Typography variant="subtitle1">
              Retail Price: ${book.price}
            </Typography>
            <Container className={classes.bookSingleSelectQuantityContainer}>
              <Typography variant="subtitle1">
                Select Quantity: &nbsp;
              </Typography>
              <FormControl className={classes.formControl}>
                <Select
                  value={this.state.quantity}
                  onChange={this.handleChange}
                  inputProps={{
                    name: 'quantity',
                    id: 'quantity'
                  }}
                >
                  {Array(5)
                    .fill(1)
                    .map((val, i) => {
                      return (
                        <MenuItem value={val + i} key={val + i}>
                          {val + i}
                        </MenuItem>
                      )
                    })}
                </Select>
              </FormControl>
            </Container>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={() => {
                this.handleSubmit(book.id)
              }}
              disabled={
                this.props.isLoggedIn
                  ? this.props.userCart &&
                    (this.props.userCart.products &&
                      this.props.userCart.products.some(
                        product => product.id === book.id
                      ))
                  : this.props.userGuestCart &&
                    this.props.userGuestCart[book.id]
              }
            >
              Add to Cart
            </Button>
          </Container>
        </Container>
        <Container className={classes.bookSingleDisplayRightSubcontainer}>
          <Typography variant="h3" className={classes.bookSingleDisplayTitle}>
            {book.title}
          </Typography>
          <Typography variant="h5" className={classes.bookSingleDisplayAuthors}>
            By {authors}
          </Typography>
          {/* <Container className={classes.bookSingleDisplayCollapseContainer}> */}
          {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit> */}
          <Container className={classes.bookSingleDisplayDescriptionContainer}>
            <Typography gutterBottom variant="subtitle1">
              {book.description}
            </Typography>
          </Container>
          {/* </Collapse> */}
          {/* <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={() => {
                this.setExpanded(!this.state.expanded)
              }}
              aria-expanded={this.state.expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton> */}
          {/* </Container> */}
        </Container>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    bookList: state.bookList,
    isLoggedIn: !!state.userAuth.id,
    userAuth: state.userAuth.id,
    userCart: state.userCart,
    userGuestCart: state.userGuestCart
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
    clearBookList: () => dispatch(clearBookList()),
    getGuestUserCart: () => dispatch(getGuestUserCartThunk()),
    clearUserCart: () => dispatch(clearUserCart())
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(singleBook)
)
