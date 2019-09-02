import axios from 'axios'
import history from '../history'

// action type
const GET_SINGLE_USER = 'GET_SINGLE_USER'
const GET_USER_ORDERS = 'GET_USER_ORDERS'
const SINGLE_USER_ORDER = 'SINGLE_USER_ORDER'

// action creator
export const getSingleUser = singleUser => {
  return {
    type: GET_SINGLE_USER,
    singleUser
  }
}

export const getSingleUserOrder = order => {
  return {
    type: SINGLE_USER_ORDER,
    order
  }
}

export const getUserOrders = orders => {
  return {
    type: GET_USER_ORDERS,
    orders
  }
}

// thunk middleware
export const getSingleUserThunk = singleUserId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${singleUserId}`)
      dispatch(getSingleUser(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getSingleUserOrderThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart`)
      dispatch(getSingleUserOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getUserOrdersThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/orders`)
      dispatch(getUserOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const orders = []

export default function(state = orders, action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      return action.orders
    default:
      return state
  }
}
