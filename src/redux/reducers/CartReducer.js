import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADD_TO_WISHED,
    REMOVE_FROM_WISHED,
    CHANGE_QUANTITY,
} from "../constants"
import {useSelector} from "react-redux"


const initialState = {
    cartData: [],
    wishedData: [],
}


const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let carted = action.payload.productslist.find(item => item.id === action.payload.id)
            let existed_item = state.cartData.find(item => action.payload.id === item.id)
            if (existed_item == undefined) {
                return {
                    ...state,
                    cartData: [...state.cartData, carted],
                }
            }
        case REMOVE_FROM_CART:
            let itemToRemove = state.cartData.find(item => action.payload === item.id)
            let new_items = state.cartData.filter(item => action.payload !== item.id)
            return {
                ...state,
                cartData: new_items,
            }
        case ADD_TO_WISHED:
            let wished = action.payload.productslist.find(item => item.id === action.payload.id)
            let existed_item1 = state.wishedData.find(item => action.payload.id === item.id)
            console.log(existed_item1)
            if (existed_item1 == undefined) {
                return {
                    ...state,
                    wishedData: [...state.wishedData, wished]
                }
            }
            else {
                return {
                    ...state
                }
            }
        case REMOVE_FROM_WISHED:
            let new_items1 = state.wishedData.filter(item => action.payload !== item.id)
            return {
                ...state,
                wishedData: new_items1
            }
        case CHANGE_QUANTITY:
            let addedItem = action.payload.productslist.find(item => item.id === action.payload.id)
            addedItem.quantity = action.payload.value
            return {
                ...state,
            }
        default: {
            return {
                ...state
            }
        }
    }
}

export default CartReducer