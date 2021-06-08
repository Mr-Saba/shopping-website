import {
    GET_PRODUCTS, SEARCH_PRODUCTS,FILTER_BY_CATEGORY
} from "../constants"

const initialState = {
    products: null
}

const ProductReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_PRODUCTS: return {
            ...state,
            products: action.payload
        }
        case SEARCH_PRODUCTS: 
            const filteredData = state.products.filter(item => {
                if(item.title.toLowerCase().includes(action.payload.toLowerCase())){
                    return item
                }
            })
            return {
                ...state,
                products: [...filteredData]
            }
        case FILTER_BY_CATEGORY: 
            const filteredData1 = state.products.filter(item => {
                if(item.category == action.payload){
                    return item
                }
            })
            return {
                ...state,
                products: [...filteredData1]
            } 
        default: return state
    }
}

export default ProductReducer