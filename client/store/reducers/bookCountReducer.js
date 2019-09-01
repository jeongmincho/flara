import axios from 'axios'

/* ============= BOOK REDUCER ============= */

/* this reducer handles all actions regarding the book(s)
stored in the redux store when user requests for book(s) data */

/* ============= ACTION TYPES ============= */

const COUNT_BOOK_LIST = 'COUNT_BOOK_LIST'

/* ============= ACTION CREATORS ============= */

export const countBookList = bookCount => {
  return {
    type: COUNT_BOOK_LIST,
    bookCount
  }
}

/* ============= THUNKS ============= */

export const countBookListThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/books/count`)
      dispatch(countBookList(data))
    } catch (error) {
      console.log(error)
    }
  }
}

/* ============= REDUCER ============= */

// BookList is an object. a flattened version of the retrieved DB array.
const bookCount = null

export default function(state = bookCount, action) {
  switch (action.type) {
    case COUNT_BOOK_LIST: {
      return action.bookCount
    }
    default:
      return state
  }
}
