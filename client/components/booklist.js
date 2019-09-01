import React from 'react'
import PropTypes from 'prop-types'
import {
  populateBookListThunk,
  clearBookList
} from '../store/reducers/bookListReducer'
import {countBookListThunk} from '../store/reducers/bookCountReducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, CardHeader, withStyles, CardMedia} from '@material-ui/core'
import Pagination from 'material-ui-flat-pagination'
import history from '../history'

const styles = theme => ({
  card: {
    width: 430,
    margin: 40,
    height: 300,
    boxShadow: '0px 0px 4px 0px #444444'
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
    const query = `limit=10&offset=${offset}`
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
      <div className="all-menu-items">
        <div className="all-menu-items">
          {displayBooks.map(book => {
            return (
              <div key={book.id}>
                <Card className={classes.card}>
                  <Link
                    className={classes.linkStyle}
                    to={`/singlebook/id=${book.id}`}
                  >
                    <CardHeader
                      title={book.name}
                      subheader={`$ ${book.price}`}
                    />
                    <CardMedia
                      className={classes.media}
                      image={book.imageUrl}
                      alt="Book image"
                    />
                  </Link>
                </Card>
              </div>
            )
          })}
        </div>
        <Pagination
          limit={10}
          offset={this.state.offset}
          total={this.props.bookCount}
          onClick={(e, offset) => {
            this.handleClick(offset)
            this.handleNewPage(offset)
          }}
          className={classes.pageBar}
        />
      </div>
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
