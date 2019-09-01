import axios from 'axios'
import {normalize, schema} from 'normalizr'

/* ============= BOOK REDUCER ============= */

/* this reducer handles all actions regarding the BOOK(s)
stored in the redux store when user requests for BOOK(s) data */

/* ============= ACTION TYPES ============= */

const POPULATE_BOOK_LIST = 'POPULATE_BOOK_LIST'
const CLEAR_BOOK_LIST = 'CLEAR_BOOK_LIST'

/* ============= ACTION CREATORS ============= */

export const populateBookList = BookList => {
  return {
    type: POPULATE_BOOK_LIST,
    BookList
  }
}

export const clearBookList = () => {
  return {
    type: CLEAR_BOOK_LIST
  }
}

/* ============= THUNKS ============= */

export const populateBookListThunk = BookQuery => {
  return async dispatch => {
    try {
      // if (isPagination) {
      // populate my Books List with a range of these Books
      // example = [10, 10] => "limit=10&offset=10"
      // BookQuery = BooksIdArray
      // } else {
      // BookQuery = BooksIdArray
      // populate my Books List with these Book(s)
      // example = [1,5,6] => "1,5,6"
      // if the array came as an actual array
      // BookQuery = BooksIdArray.map(BookId => `id=${BookId}`).join('&')
      // }
      // example URI: devbites.com/api/Books=1,2,3,5,6
      const {data} = await axios.get(`/api/books?${BookQuery}`)
      dispatch(populateBookList(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/* ============= REDUCER ============= */

// BookList is an object. a flattened version of the retrieved DB array.
const initialBookList = {}

// create schema for BookList on store
const BookSchema = new schema.Entity('BookList')
const BookListSchema = [BookSchema]

export default function(state = initialBookList, action) {
  switch (action.type) {
    case POPULATE_BOOK_LIST: {
      // flatten the array and return object with key-value pairs for the Books by ID
      const {entities} = normalize(action.BookList, BookListSchema)
      return entities.BookList
    }
    case CLEAR_BOOK_LIST:
      return initialBookList
    default:
      return state
  }
}
