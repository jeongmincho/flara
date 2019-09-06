import axios from 'axios'
import {normalize, schema} from 'normalizr'

/* ============= CART REDUCER ============= */

/* this reducer handles all actions regarding the product(s)
stored in the redux store when user requests for product(s) data */

/* ============= ACTION TYPES ============= */

const GET_LOGGED_IN_USER_CART = 'GET_LOGGED_IN_USER_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const DELETE_MEAL_FROM_CART = 'DELETE_MEAL_FROM_CART'
const CHECKOUT_CART = 'CHECKOUT_CART'
const EDIT_PRODUCT_CART = 'EDIT_PRODUCT_CART'
const CLEAR_USER_CART = 'CLEAR_USER_CART'

/* ============= ACTION CREATORS ============= */

export const getLoggedInUserCart = cart => {
  return {
    type: GET_LOGGED_IN_USER_CART,
    cart
  }
}

export const addProductToCart = (cart, product, productOrder) => {
  return {
    type: ADD_PRODUCT_TO_CART,
    cart,
    product,
    productOrder
  }
}

export const deleteProductFromCart = productId => {
  return {
    type: DELETE_MEAL_FROM_CART,
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
    type: EDIT_PRODUCT_CART,
    productId,
    quantity
  }
}
export const clearUserCart = () => {
  return {
    type: CLEAR_USER_CART
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

export const deleteProductFromCartThunk = productId => {
  return async dispatch => {
    try {
      const deleteInfo = {
        productId
      }
      await axios.delete(`/api/cart`, {
        data: deleteInfo
      })
      dispatch(deleteProductFromCart(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const checkoutCartThunk = () => {
  return async dispatch => {
    try {
      await axios.put(`/api/cart`)
      dispatch(checkoutCart())
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

const userCart = null

// create schema for productList on store
const productOrders = new schema.Entity('cartProducts')
const productListSchema = [productOrders]
const cart = new schema.Entity('cart')
const cartSchema = [cart]

export default function(state = userCart, action) {
  switch (action.type) {
    case GET_LOGGED_IN_USER_CART:
      return action.cart

    case ADD_PRODUCT_TO_CART: {
      const newproduct = {...action.product, productOrder: action.productOrder}
      if (!state) {
        const newproducts = [newproduct]
        return {...action.cart, products: newproducts}
      } else {
        const newproducts = [...state.products, newproduct]
        return {...state, products: newproducts}
      }
    }

    case DELETE_MEAL_FROM_CART: {
      const newproducts = state.products.filter(
        product => product.id !== action.productId
      )
      return {...state, products: newproducts}
    }

    case CHECKOUT_CART: {
      return null
    }
    case EDIT_PRODUCT_CART: {
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

    case CLEAR_USER_CART: {
      return userCart
    }

    default:
      return state
  }
}
