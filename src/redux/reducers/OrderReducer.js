import {
    ADD_ORDER, GO_TO_CHECKOUT
} from "../constants"

const initialState = {
    orders: [],
    info: []
}

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GO_TO_CHECKOUT:         
        return {
            ...state,
            info: action.payload
        }
        case ADD_ORDER:
        return {
            ...state,
            orders: action.payload
        }
        default: return state
    }
}

export default OrderReducer