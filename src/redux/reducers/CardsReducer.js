import {
    ADD_CARD,
    MAKE_CARD_DEFAULT,
    REMOVE_CARD,
} from "../constants"

const initialState = {
    cards: [],
}

const CardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARD:
            if(action.payload.default == true) {
                let restedAddresses1 = state.cards.filter(item => item.id !== action.payload.id)
                restedAddresses1.forEach(item => {
                item.default = false
            })
            }
            console.log(state.cards)
            return {
                ...state,
                cards: [...state.cards, action.payload]
            }
        case REMOVE_CARD:
            let new_cards = state.cards.filter(item => action.payload !== item.id)
            return {
                ...state,
                cards: new_cards,
            }
        case MAKE_CARD_DEFAULT:
            state.cards.find(item => item.id === action.payload).default = true
            state.cards.find(item => item.id === action.payload).checked = true
            let restedAddresses = state.cards.filter(item => item.id !== action.payload)
            restedAddresses.forEach(item => {
                item.default = false
            })
            return {
                ...state,
                cards: [...state.cards]
            } 
        default: return state
    }
}

export default CardsReducer