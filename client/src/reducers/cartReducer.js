import {
  CART_ITEMS_FAIL,
  CART_ITEMS_REQUEST,
  CART_ITEMS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_CART_ITEMS_FAIL,
  DELETE_CART_ITEMS_REQUEST,
  DELETE_CART_ITEMS_SUCCESS,
  UPDATE_CART_ITEMS_FAIL,
  UPDATE_CART_ITEMS_REQUEST,
  UPDATE_CART_ITEMS_SUCCESS,
  CREATE_CART_ITEMS_REQUEST,
  CREATE_CART_ITEMS_SUCCESS,
  CREATE_CART_ITEMS_FAIL,
  SAVE_SHIPPING_INFO,
  CLEAR_MESSAGE,
} from "../constants/cartConstants";

export const cartReducer = (
  state = {
    cartItems: [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {}
  },
  action
) => {
  switch (action.type) {
    case CART_ITEMS_REQUEST:
    case UPDATE_CART_ITEMS_REQUEST:
    case DELETE_CART_ITEMS_REQUEST:
    case CREATE_CART_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        cartItems: [],
      };
    case CART_ITEMS_SUCCESS:
    case UPDATE_CART_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload.cartItems,
        cartItemsCount: action.payload.cartItemsCount,
      };
      case DELETE_CART_ITEMS_SUCCESS:
        return {
          loading: false,
          cartItems: action.payload.cartItems,
          cartItemsCount: action.payload.cartItemsCount,
        };
    case CREATE_CART_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CART_ITEMS_FAIL:
    case UPDATE_CART_ITEMS_FAIL:
    case DELETE_CART_ITEMS_FAIL:
    case CREATE_CART_ITEMS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
