import { 
    SIGN_UP_WITH_EMAIL_PASS, 
    SIGN_OUT,
    SIGN_IN_WITH_EMAIL_PASS,
    RESET_PASS,
    UPDATE_EMAIL,
    GET_PRODUCTS,
    SEARCH_PRODUCTS,
    FILTER_BY_CATEGORY,
    SORT_BY_AZ,
    SORT_BY_ZA,
    SORT_SELECT,
    FILTER_BY_PRICE,
    ADD_TO_CART,
    ADD_TO_WISHED,
    NEW_ARRIVALS
    } from "./constants"
import { auth, firebase, firestore } from "../firebase/Configuration"
import { bindActionCreators } from "redux"

const SignUpWithEmailAndPassword = (data) => async dispatch => {
        dispatch({
                type: SIGN_UP_WITH_EMAIL_PASS,
                payload: data, 
            })
}

const SignOut = () => async dispatch => {
    auth.signOut().then(() => {
        dispatch({
            type: SIGN_OUT,
            payload: null,
        })
    })
}

const ResetPass = (email) => async dispatch => {
    dispatch({
        type: RESET_PASS,
        payload: email
    }) 
}

const SignInWithEmailAndPassword = (data) => async dispatch => {
    dispatch({
        type: SIGN_IN_WITH_EMAIL_PASS,
        payload: data
    }) 
}

const UpdateCredentials = (data) => async dispatch => {
    const user = auth.currentUser
        await user.updateEmail(data.email).then(()=>{
            console.log("email has changed")
            firestore.collection("users").doc(user.uid).update({
                email: data.email,
                firstname: data.firstName,
                lastname: data.lastName,
                dateofbirth: data.date,
                nation: data.nation,
                number: data.number
            })       
            dispatch({
                type: UPDATE_EMAIL,
                payload: user,
            }) 
        }).catch((error) => {
            console.log(error)
        })
}
const UpdatePassword = (data) => async dispatch => {
    const user = auth.currentUser
    const bcrypt = require('bcryptjs')
    await user.updatePassword(data.password).then(()=>{
        // const hashedPassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync());
        firestore.collection("users").doc(user.uid).update({
            password: bcrypt.hashSync(data.password, bcrypt.genSaltSync())
        })
        console.log("pass changed")       
        dispatch({
            type: UPDATE_EMAIL,
            payload: user,
        }) 
    }) 
}
const GetProducts = () => async dispatch => {
    const data = await firestore.collection("products").get();
    const products = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    dispatch({
        type: GET_PRODUCTS,
        payload: products,
    }) 
}
const SearchProducts = (keyword) => async dispatch => {
    dispatch({
        type: SEARCH_PRODUCTS,
        payload: keyword
    })
}
const FilterByCategory = (value) => async dispatch => {
    dispatch({
        type: FILTER_BY_CATEGORY,
        payload: value
    })
}
const SortSelect = (value) => async dispatch => {
    dispatch({
        type: SORT_SELECT,
        payload: value
    })
}
const FilterByPrice = (price1, price2) => async dispatch => {
    dispatch({
        type: FILTER_BY_PRICE,
        payload: {price1, price2}
    })
}
const AddToCart = () => async dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: null
    })
}
const AddToWished = () => async dispatch => {
    dispatch({
        type: ADD_TO_WISHED,
        payload: null
    })
}
const NewArrivals = () => async dispatch => {
    dispatch({
        type: NEW_ARRIVALS,
        payload: null
    })
}


export { SignUpWithEmailAndPassword, SignOut, ResetPass, SignInWithEmailAndPassword, UpdateCredentials, UpdatePassword, GetProducts, SearchProducts, FilterByCategory, SortSelect, FilterByPrice, AddToCart, AddToWished, NewArrivals }