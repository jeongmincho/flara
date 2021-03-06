import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import bookList from './reducers/bookListReducer'
import bookCount from './reducers/bookCountReducer'
import userAuth from './reducers/userAuthReducer'
// import userOrderList from './reducers/userOrderListReducer'
// import userCartID from './reducers/userCartReducer2'
import userCart from './reducers/userCartReducer'
import userGuestCart from './reducers/userGuestCartReducer'
import orderHistory from './orderHistoryReducer'

const reducer = combineReducers({
  bookList,
  bookCount,
  userAuth,
  userCart,
  userGuestCart,
  orderHistory
  // userOrderList,
  // userCartID
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './reducers/userAuthReducer'
