import React from 'react'
import PropTypes from 'prop-types'
import {
  populateBookListThunk,
  clearBookList
} from '../store/reducers/bookListReducer'
import {countBookListThunk} from '../store/reducers/bookCountReducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Container,
  Card,
  Paper,
  CardHeader,
  withStyles,
  CardMedia
} from '@material-ui/core'
import Pagination from 'material-ui-flat-pagination'
import history from '../history'

const styles = theme => ({
  bookListDisplayContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  bookDisplayCard: {
    width: '12rem',
    height: '18rem',
    margin: 40,
    boxShadow: '0px 0px 4px 0px #444444'
  },
  bookDisplayImage: {
    width: '12rem',
    height: '18rem'
  },
  linkStyle: {
    textDecoration: 'none',
    color: 'black'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    bottom: 0
  },
  pageBar: {
    marginBottom: '1.5rem'
  }
})

class BookList extends React.Component {
  constructor() {
    super()
    this.state = {
      offset: 0
    }
    this.handleNewPage = this.handleNewPage.bind(this)
  }
  componentDidMount() {
    this.props.countBookListThunk()
    const query = this.props.match.params.query
    this.props.populateBookListThunk(query)
  }

  componentWillUnmount() {
    this.props.clearBookList()
  }

  handleNewPage(offset) {
    const query = `limit=12&offset=${offset}`
    history.push(query)
    this.props.populateBookListThunk(query)
  }

  handleClick(offset) {
    this.setState({offset})
  }

  render() {
    const {classes} = this.props
    const displayBooks = []
    this.props.bookList &&
      Object.keys(this.props.bookList).forEach(bookId =>
        displayBooks.push(this.props.bookList[bookId])
      )
    return (
      <Container className={classes.bookListDisplayContainer}>
        {displayBooks.map(book => {
          return (
            <div key={book.id}>
              <Card className={classes.bookDisplayCard}>
                <Link
                  className={classes.linkStyle}
                  to={`/singlebook/id=${book.id}`}
                >
                  <Paper>
                    <img
                      src={book.imageUrl}
                      className={classes.bookDisplayImage}
                    />
                  </Paper>
                  {/* <CardMedia
                    className={classes.media}
                    image={book.imageUrl}
                    alt="Book image"
                  /> */}
                  {/* <CardHeader
                      title={book.title}
                      subheader={`$ ${book.price}`}
                    /> */}
                </Link>
              </Card>
            </div>
          )
        })}
        <Pagination
          limit={12}
          offset={this.state.offset}
          total={this.props.bookCount}
          onClick={(e, offset) => {
            this.handleClick(offset)
            this.handleNewPage(offset)
          }}
          className={classes.pageBar}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    bookList: state.bookList,
    bookCount: state.bookCount
  }
}

const mapDispatchToProps = {
  populateBookListThunk,
  clearBookList,
  countBookListThunk
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(BookList)
)

BookList.propTypes = {
  BookList: PropTypes.object
}
