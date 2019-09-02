import axios from 'axios'
import {normalize, schema} from 'normalizr'

/* ============= CART REDUCER ============= */

/* this reducer handles all actions regarding the product(s)
stored in the redux store when user requests for product(s) data */

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

export const addProductToCart = (cart, product, productOrder) => {
  return {
    type: ADD_MEAL_TO_CART,
    cart,
    product,
    productOrder
  }
}

export const removeProductFromCart = productId => {
  return {
    type: REMOVE_MEAL_FROM_CART,
    productId
  }
}

export const checkoutCart = () => {
  return {
    type: CHECKOUT_CART
  }
}

export const editProductQuantity = (productId, quantity) => {
  return {
    type: EDIT_MEAL_QUANTITY,
    productId,
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

export const addProductToCartThunk = (quantity, productId) => {
  return async dispatch => {
    try {
      const newProductOrder = {
        quantity,
        productId
      }
      const {data} = await axios.post(`/api/cart`, newProductOrder)
      dispatch(
        addProductToCart(data.cart, data.addedProduct, data.addedProductOrder)
      )
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProductFromCartThunk = (productId, orderId) => {
  return async dispatch => {
    try {
      const deleteInfo = {
        productId,
        orderId
      }
      await axios.delete(`/api/cart`, {
        data: deleteInfo
      })
      dispatch(removeProductFromCart(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutCartThunk = (orderId, totalPrice) => {
  return async dispatch => {
    try {
      const updatePrice = {
        orderId,
        totalPrice
      }
      await axios.put(`/api/cart`, updatePrice)
      dispatch(checkoutCart())
      // history.push('/orderSubmitted')
    } catch (error) {
      console.log(error)
    }
  }
}

export const editProductCartThunk = (userId, productId, orderId, quantity) => {
  return async dispatch => {
    try {
      await axios.put('/api/cart/edit', {
        productId,
        orderId,
        quantity,
        userId
      })
      dispatch(editProductQuantity(productId, quantity))
    } catch (error) {
      console.log(error)
    }
  }
}

const userCart = {}

// create schema for productList on store
const productSchema = new schema.Entity('productList')
const productListSchema = [productSchema]

export default function(state = userCart, action) {
  switch (action.type) {
    case GET_LOGGED_IN_USER_CART:
      console.log(action.cart)
      return action.cart

    case ADD_MEAL_TO_CART: {
      const newproduct = {...action.product, productOrder: action.productOrder}
      if (!state) {
        const newproducts = [newproduct]
        return {...action.cart, products: newproducts}
      } else {
        const newproducts = [...state.products, newproduct]
        return {...state, products: newproducts}
      }
    }
    case REMOVE_MEAL_FROM_CART: {
      const newproducts = state.products.filter(
        product => product.id !== action.productId
      )
      return {...state, products: newproducts}
    }
    case CHECKOUT_CART: {
      return null
    }
    case EDIT_MEAL_QUANTITY: {
      const cart = {...state}
      cart.products = [...state.products]
      let productIdx = null
      cart.products.forEach((product, idx) => {
        if (product.id === action.productId) {
          productIdx = idx
        }
      })
      cart.products[productIdx] = {...cart.products[productIdx]}
      cart.products[productIdx].productOrder = {
        ...cart.products[productIdx].productOrder
      }
      cart.products[productIdx].productOrder.quantity = action.quantity
      return cart
    }
    default:
      return state
  }
}
