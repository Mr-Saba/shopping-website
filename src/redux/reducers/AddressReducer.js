import {
    ADD_ADDRESS,
    MAKE_ADDRESS_DEFAULT,
    REMOVE_ADDRESS
} from "../constants"

const initialState = {
    addresses: []
}

const AddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ADDRESS:
            if(action.payload.default == true) {
                let restedAddresses1 = state.addresses.filter(item => item.id !== action.payload.id)
                restedAddresses1.forEach(item => {
                item.default = false
            })
            }
            return {
                ...state,
                addresses: [...state.addresses, action.payload]
            }
        case REMOVE_ADDRESS:
            let new_addresses = state.addresses.filter(item => action.payload !== item.id)
            return {
                ...state,
                addresses: new_addresses,
            }
        case MAKE_ADDRESS_DEFAULT:
            state.addresses.find(item => item.id === action.payload).default = true
            let restedAddresses = state.addresses.filter(item => item.id !== action.payload)
            restedAddresses.forEach(item => {
                item.default = false
            })
            return {
                ...state,
                addresses: [...state.addresses]
            }
        default: {
            return {
                ...state
            }
        }
    }
}

export default AddressReducer