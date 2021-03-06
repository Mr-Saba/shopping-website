import {
    SIGN_UP_WITH_EMAIL_PASS,  
    SIGN_OUT,
    SIGN_IN_WITH_EMAIL_PASS,
    RESET_PASS,
    UPDATE_EMAIL,
    UPDATE_PASSWORD,
} from "../constants"

const initialState = {
    user: null,
    isLoggedIn: false,
}

const UserReducer = (state=initialState, action) => {
    switch(action.type) {
        case SIGN_UP_WITH_EMAIL_PASS: return {
            ...state,
            user: action.payload,
            isLoggedIn: true,
        }
        case SIGN_OUT: return {
            ...state,
            user: action.payload,
            isLoggedIn: false,
        }
        case SIGN_IN_WITH_EMAIL_PASS: return {
            ...state,
            user: action.payload,
            isLoggedIn: true,
        }
        case RESET_PASS: return {
            ...state,
            user: action.payload,
            isLoggedIn: false,
        }
        case UPDATE_EMAIL: return {
            ...state,
            user: action.payload,
            isLoggedIn: true,
        }
        case UPDATE_PASSWORD: return {
            ...state,
            user: action.payload,
            isLoggedIn: true,
        }
        default: return state
    }
}

export default UserReducer
