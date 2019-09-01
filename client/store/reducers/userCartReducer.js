import axios from 'axios'
import {normalize, schema} from 'normalizr'

/* ============= CART REDUCER ============= */

/* this reducer handles all actions regarding the meal(s)
stored in the redux store when user requests for meal(s) data */

/* ============= ACTION TYPES ============= */

const GET_LOGGED_IN_USER_CART = 'GET_LOGGED_IN_USER_CART'
const ADD_MEAL_TO_CART = 'ADD_MEAL_TO_CART'
const REMOVE_MEAL_FROM_CART = 'REMOVE_MEAL_FROM_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'
const EDIT_MEAL_QUANTITY = 'EDIT_MEAL_QUANTITY'

/* ============= ACTION CREATORS ============= */

export const getLoggedInUserCart = cart => {
  return {
    type: GET_LOGGED_IN_USER_CART,
    cart
  }
}

export const addMealToCart = (cart, meal, mealOrder) => {
  return {
    type: ADD_MEAL_TO_CART,
    cart,
    meal,
    mealOrder
  }
}

export const removeMealFromCart = mealId => {
  return {
    type: REMOVE_MEAL_FROM_CART,
    mealId
  }
}

export const checkoutCart = () => {
  return {
    type: CHECKOUT_CART
  }
}

export const editMealQuantity = (mealId, quantity) => {
  return {
    type: EDIT_MEAL_QUANTITY,
    mealId,
    quantity
  }
}

/* ============= THUNKS ============= */

export const getLoggedInUserCartThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/`)
      dispatch(getLoggedInUserCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addMealToCartThunk = (quantity, mealId, userId) => {
  return async dispatch => {
    try {
      const newMealOrder = {
        quantity,
        mealId,
        userId
      }
      const {data} = await axios.post(`/api/cart`, newMealOrder)
      dispatch(addMealToCart(data.cart, data.addedMeal, data.addedMealOrder))
      history.push('/addedToCart')
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteMealFromCartThunk = (userId, mealId, orderId) => {
  return async dispatch => {
    try {
      const deleteInfo = {
        mealId,
        orderId,
        userId
      }
      await axios.delete(`/api/cart`, {
        data: deleteInfo
      })
      dispatch(removeMealFromCart(mealId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutCartThunk = (userId, orderId, totalPrice) => {
  return async dispatch => {
    try {
      const updatePrice = {
        userId,
        orderId,
        totalPrice
      }
      await axios.put(`/api/cart`, updatePrice)
      dispatch(checkoutCart())
      history.push('/orderSubmitted')
    } catch (error) {
      console.log(error)
    }
  }
}

export const editMealCartThunk = (userId, mealId, orderId, quantity) => {
  return async dispatch => {
    try {
      await axios.put('/api/cart/edit', {
        mealId,
        orderId,
        quantity,
        userId
      })
      dispatch(editMealQuantity(mealId, quantity))
    } catch (error) {
      console.log(error)
    }
  }
}

const userCart = {}

// create schema for mealList on store
const mealSchema = new schema.Entity('mealList')
const mealListSchema = [mealSchema]

export default function(state = userCart, action) {
  switch (action.type) {
    case GET_LOGGED_IN_USER_CART:
      console.log(action.cart)
      return action.cart

    case ADD_MEAL_TO_CART: {
      const newmeal = {...action.meal, mealOrder: action.mealOrder}
      if (!state) {
        const newmeals = [newmeal]
        return {...action.cart, meals: newmeals}
      } else {
        const newmeals = [...state.meals, newmeal]
        return {...state, meals: newmeals}
      }
    }
    case REMOVE_MEAL_FROM_CART: {
      const newmeals = state.meals.filter(meal => meal.id !== action.mealId)
      return {...state, meals: newmeals}
    }
    case CHECKOUT_CART: {
      return null
    }
    case EDIT_MEAL_QUANTITY: {
      const cart = {...state}
      cart.meals = [...state.meals]
      let mealIdx = null
      cart.meals.forEach((meal, idx) => {
        if (meal.id === action.mealId) {
          mealIdx = idx
        }
      })
      cart.meals[mealIdx] = {...cart.meals[mealIdx]}
      cart.meals[mealIdx].mealOrder = {...cart.meals[mealIdx].mealOrder}
      cart.meals[mealIdx].mealOrder.quantity = action.quantity
      return cart
    }
    default:
      return state
  }
}
