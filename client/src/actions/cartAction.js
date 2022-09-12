import axios from "axios";
import {
  CART_ITEMS_FAIL,
  CART_ITEMS_REQUEST,
  CART_ITEMS_SUCCESS,
  CLEAR_ERRORS,
  CLEAR_MESSAGE,
  DELETE_CART_ITEMS_FAIL,
  DELETE_CART_ITEMS_REQUEST,
  DELETE_CART_ITEMS_SUCCESS,
  UPDATE_CART_ITEMS_FAIL,
  UPDATE_CART_ITEMS_REQUEST,
  UPDATE_CART_ITEMS_SUCCESS,
  CREATE_CART_ITEMS_REQUEST,
  CREATE_CART_ITEMS_SUCCESS,
  CREATE_CART_ITEMS_FAIL,
  SAVE_SHIPPING_INFO
} from "../constants/cartConstants";


// get cart items
export const getCartItems = () => async (dispatch) => {
  try {
    dispatch({
      type: CART_ITEMS_REQUEST,
    });

    const { data } = await axios.get("/api/v1/cart");

    dispatch({
      type: CART_ITEMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CART_ITEMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// add items to cart
export const createCartItems = (cartData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CART_ITEMS_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/cart/new`,
      cartData,
      config
    );
    
    dispatch({
      type: CREATE_CART_ITEMS_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CART_ITEMS_FAIL,
      payload: error.response.data.message,
    });
  }
};


// update quantity
export const updateCartItems = (id, quantity) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CART_ITEMS_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/cart/${id}`,
      { quantity },
      config
    );

    dispatch({
      type: UPDATE_CART_ITEMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CART_ITEMS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// delete cart items
export const deleteCartItems = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CART_ITEMS_REQUEST,
    });

    const { data } = await axios.delete(`/api/v1/cart/${id}`);

    dispatch({
      type: DELETE_CART_ITEMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CART_ITEMS_FAIL,
      payload: error.response.data.message,
    });
  }
};


// save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload:data
    });
    
    localStorage.setItem("shippingInfo", JSON.stringify(data))
    
};


export const clearErrors = async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};


export const clearMessage = async (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGE,
  });
};