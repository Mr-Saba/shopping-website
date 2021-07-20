import {
    GET_PRODUCTS,
    SEARCH_PRODUCTS,
    FILTER_BY_CATEGORY,
    SORT_SELECT,
    FILTER_BY_PRICE,
    
    ADD_ADDRESS,
    REMOVE_ADDRESS
} from "../constants"

const initialState = {
    products: null,
    filteredProducts: null,
}
const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS: return {
            ...state,
            products: action.payload
        }
        case SEARCH_PRODUCTS:
            const filteredData = state.products.filter(item => {
                if (item.title.toLowerCase().includes(action.payload.toLowerCase())) {
                    return item
                }
            })
            return {
                ...state,
                filteredProducts: [...filteredData]
            }
        case FILTER_BY_CATEGORY:
            const filteredData1 = state.products.filter(item => {
                if (item.category == action.payload) {
                    return item
                }
            })
            return {
                ...state,
                filteredProducts: [...filteredData1]
            }
        case SORT_SELECT:
            let sortedData
            if (action.payload == "az") {
                sortedData = state.products.sort(function (a, b) {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) { return -1; }
                    if (a.title.toLowerCase() > b.title.toLowerCase()) { return 1; }
                    return 0;
                })
                return {
                    ...state,
                    filteredProducts: [...sortedData]
                }
            }
            if (action.payload == "za") {
                sortedData = state.products.sort(function (a, b) {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) { return 1; }
                    if (a.title.toLowerCase() > b.title.toLowerCase()) { return -1; }
                    return 0;
                })
                return {
                    ...state,
                    filteredProducts: [...sortedData]
                }
            }
            if (action.payload == "lowHigh") {
                sortedData = state.products.sort(function (a, b) {
                    const intA = parseInt(a.price.slice(0, -1))
                    const intB = parseInt(b.price.slice(0, -1))
                    return intA - intB
                })
                return {
                    ...state,
                    filteredProducts: [...sortedData]
                }
            }
            if (action.payload == "highLow") {
                sortedData = state.products.sort(function (a, b) {
                    const intA = parseInt(a.price.slice(0, -1))
                    const intB = parseInt(b.price.slice(0, -1))
                    return intB - intA
                })
                return {
                    ...state,
                    filteredProducts: [...sortedData]
                }
            }
        case FILTER_BY_PRICE:
            const filteredData3 = state.products.filter(item => {
                console.log(action.payload)
                let productPrice = parseInt(item.price.slice(0, -1))
                if (productPrice >= action.payload.price1 && productPrice <= action.payload.price2) {
                    console.log(item)
                    return item
                }
            })
            return {
                ...state,
                filteredProducts: [...filteredData3]
            }
        default: return state
    }
}

export default ProductReducer