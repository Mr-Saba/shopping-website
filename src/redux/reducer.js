import {
    SIGN_UP_WITH_EMAIL_PASS, 
    SIGN_UP_WITH_NUMBER, 
    SIGN_OUT,
    SIGN_IN_WITH_EMAIL_PASS
} from "./constants"

const initialState = {
    user: null,
    isLoggedIn: false
}

const Reducer = (state=initialState, action) => {
    switch(action.type) {
        case SIGN_UP_WITH_EMAIL_PASS: return {
            ...state,
            user: action.payload,
            isLoggedIn: true
        }
        case SIGN_UP_WITH_NUMBER: return {
            ...state,
            user: action.payload,
            isLoggedIn: true
        }
        case SIGN_OUT: return {
            ...state,
            user: action.payload,
            isLoggedIn: false
        }
        case SIGN_IN_WITH_EMAIL_PASS: return {
            ...state,
            user: action.payload,
            isLoggedIn: true
        }
        default: return state
    }
}

export default Reducer
