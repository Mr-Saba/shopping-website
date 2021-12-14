import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_TO_WISHED,
  REMOVE_FROM_WISHED,
  CHANGE_QUANTITY,
  SET_PRICE,
} from "../constants";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/Configuration";

const initialState = {
  cartData: [],
  wishedData: [],
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let carted = action.payload.productslist.find((item) => item.id === action.payload.id);
      carted.quantity = action.payload.quantity
      let existed_item = state.cartData.find(
        (item) => action.payload.id === item.id
      );
      if (existed_item == undefined) {
        return {
          ...state,
          cartData: [...state.cartData, carted],
        };
      } else {
        return {
          ...state,
        };
      }
    case REMOVE_FROM_CART:
      // let itemToRemove = state.cartData.find(item => action.payload === item.id)
      let new_items = state.cartData.filter(
        (item) => action.payload !== item.id
      );
      return {
        ...state,
        cartData: new_items,
      };
    case ADD_TO_WISHED:
      let clicked = action.payload.productslist.find(
        (item) => item.id === action.payload.id
      );
      // clicked.quantity = action.payload.quantity
      let existed_item1 = state.wishedData.find(
        (item) => action.payload.id === item.id
      );
      let new_items2 = state.wishedData.filter(
        (item) => action.payload.id !== item.id
      );
      if (existed_item1 == undefined) {
        return {
          ...state,
          wishedData: [...state.wishedData, clicked],
        };
      }
      // else remove
      else {
        return {
          ...state,
          wishedData: new_items2,
        };
      }
    case REMOVE_FROM_WISHED:
      let new_items1 = state.wishedData.filter(
        (item) => action.payload.id !== item.id
      );
      return {
        ...state,
        wishedData: new_items1,
      };
    case CHANGE_QUANTITY:
      let addedItem = action.payload.productslist.find(
        (item) => item.id === action.payload.id
      );
      addedItem.quantity = action.payload.value;
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default CartReducer;
