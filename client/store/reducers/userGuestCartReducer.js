import {normalize, schema} from 'normalizr'

/* ============= CART REDUCER ============= */

/* this reducer handles all actions regarding the product(s)
stored in the redux store when user requests for product(s) data */

/* ============= ACTION TYPES ============= */

const GET_GUEST_USER_CART = 'GET_GUEST_USER_CART'
const ADD_PRODUCT_TO_GUEST_CART = 'ADD_PRODUCT_TO_GUEST_CART'
const DELETE_PRODUCT_FROM_GUEST_CART = 'DELETE_PRODUCT_FROM_GUEST_CART'
const EDIT_PRODUCT_GUEST_CART = 'EDIT_PRODUCT_GUEST_CART'
const CLEAR_GUEST_CART = 'CLEAR_GUEST_CART'

/* ============= ACTION CREATORS ============= */

export const getGuestUserCart = cart => {
  return {
    type: GET_GUEST_USER_CART,
    cart
  }
}

export const addProductToGuestCart = cartProducts => {
  return {
    type: ADD_PRODUCT_TO_GUEST_CART,
    cartProducts
  }
}

export const deleteProductFromGuestCart = cartProducts => {
  return {
    type: DELETE_PRODUCT_FROM_GUEST_CART,
    cartProducts
  }
}

export const editProductGuestCart = cartProducts => {
  return {
    type: EDIT_PRODUCT_GUEST_CART,
    cartProducts
  }
}

export const clearGuestCart = () => {
  return {
    type: CLEAR_GUEST_CART
  }
}

/* ============= THUNKS ============= */

export const getGuestUserCartThunk = () => {
  return async dispatch => {
    try {
      const existingCart = JSON.parse(localStorage.getItem('cart'))
      // console.log(existingCart)
      dispatch(getGuestUserCart(existingCart))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addProductToGuestCartThunk = (quantity, productId) => {
  return async dispatch => {
    try {
      const existingCart = localStorage.getItem('cart')
      const cartProducts = []
      existingCart && cartProducts.push(...JSON.parse(existingCart))
      const newProductOrder = {id: productId, quantity}
      cartProducts.push(newProductOrder)
      localStorage.setItem('cart', JSON.stringify(cartProducts))
      dispatch(addProductToGuestCart(cartProducts))
      // console.log(localStorage.getItem('cart'))
    } catch (error) {
      console.log(error)
    }
  }
}

// 1. delete from booklist. delete from usercart. delete from localstorage.
// automatically repopulate booklist, delete from usercart, delete from local storage
export const deleteProductFromGuestCartThunk = productId => {
  return async dispatch => {
    try {
      const existingCart = localStorage.getItem('cart')
      const cartProducts = []
      existingCart && cartProducts.push(...JSON.parse(existingCart))
      // console.log('before filter: ', cartProducts)
      const newCartProducts = cartProducts.filter(
        product => product.id !== productId
      )
      // console.log('after filter: ', newCartProducts)
      localStorage.setItem('cart', JSON.stringify(newCartProducts))
      dispatch(deleteProductFromGuestCart(newCartProducts))
      // console.log(localStorage.getItem('cart'))
    } catch (error) {
      console.log(error)
    }
  }
}

export const editProductGuestCartThunk = (productId, quantity) => {
  // return async dispatch => {
  //   try {
  //     await axios.put('/api/cart/edit', {
  //       productId,
  //       orderId,
  //       quantity,
  //       userId
  //     })
  //     dispatch(editProductQuantity(productId, quantity))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return async dispatch => {
    try {
      const existingCart = localStorage.getItem('cart')
      const cartProducts = []
      existingCart && cartProducts.push(...JSON.parse(existingCart))
      console.log('before filter: ', cartProducts)
      const newCartProducts = cartProducts.filter(
        product => product.id !== productId
      )
      console.log('after filter: ', newCartProducts)
      const newProductOrder = {id: productId, quantity}
      newCartProducts.push(newProductOrder)
      console.log('after push: ', newCartProducts)
      localStorage.setItem('cart', JSON.stringify(newCartProducts))
      dispatch(editProductGuestCart(newCartProducts))
      // console.log(localStorage.getItem('cart'))
    } catch (error) {
      console.log(error)
    }
  }
}

const userGuestCart = {}

// create schema for productList on store
const productOrders = new schema.Entity('cartProducts')
const productListSchema = [productOrders]
const cart = new schema.Entity('cart')
const cartSchema = [cart]

export default function(state = userGuestCart, action) {
  switch (action.type) {
    case GET_GUEST_USER_CART: {
      const {entities} = normalize(action.cart, cartSchema)
      return entities.cart ? entities.cart : userGuestCart
    }

    case ADD_PRODUCT_TO_GUEST_CART: {
      const {entities} = normalize(action.cartProducts, productListSchema)
      return entities.cartProducts
    }

    case DELETE_PRODUCT_FROM_GUEST_CART: {
      const {entities} = normalize(action.cartProducts, productListSchema)
      return entities.cartProducts ? entities.cartProducts : userGuestCart
    }

    case EDIT_PRODUCT_GUEST_CART: {
      const {entities} = normalize(action.cartProducts, productListSchema)
      return entities.cartProducts ? entities.cartProducts : userGuestCart
    }

    case CLEAR_GUEST_CART: {
      return userGuestCart
    }

    default:
      return state
  }
}
