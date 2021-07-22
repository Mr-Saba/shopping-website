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
    REMOVE_FROM_CART,
    ADD_TO_WISHED,
    NEW_ARRIVALS,
    REMOVE_FROM_WISHED,
    CHANGE_QUANTITY,
    MOVE_TO_CART,
    MOVE_TO_WISHED,
    ADD_ADDRESS,
    REMOVE_ADDRESS,
    MAKE_ADDRESS_DEFAULT
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
const AddToCart = (id) => async (dispatch, getState) => {
        const productslist = getState().ProductReducer.products;
        dispatch({ 
            type: ADD_TO_CART, 
            payload: {id, productslist} 
        })
}
const RemoveFromCart = (id) => async dispatch => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id
    })
}
const AddToWished = (id) => async (dispatch, getState) => {
    const productslist = getState().ProductReducer.products;
    dispatch({
        type: ADD_TO_WISHED,
        payload: {id, productslist} 
    })
}
const RemoveFromWished = (id) => async (dispatch) => {
    dispatch({
        type: REMOVE_FROM_WISHED,
        payload: id
    })
}
const ChangeQuantity = (id, value) => async (dispatch, getState) => {
    const productslist = getState().ProductReducer.products;
    dispatch({
        type: CHANGE_QUANTITY,
        payload: {
            id: id,
            value: value,
            productslist: productslist
        }
    })
}
const AddAddress = (cred) => async dispatch => {
    dispatch({
        type: ADD_ADDRESS,
        payload: cred
    })
}
const RemoveAddress = (id) => async dispatch => {
    dispatch({
        type: REMOVE_ADDRESS,
        payload: id
    })
}
const MakeAddressDefault = (id) => async dispatch => {
    dispatch({
        type: MAKE_ADDRESS_DEFAULT,
        payload: id
    })
}

export { 
    SignUpWithEmailAndPassword, 
    SignOut, 
    ResetPass, 
    SignInWithEmailAndPassword, 
    UpdateCredentials, 
    UpdatePassword, 
    GetProducts, 
    SearchProducts,
    FilterByCategory, 
    SortSelect, 
    FilterByPrice, 
    AddToCart, 
    RemoveFromCart, 
    AddToWished, 
    RemoveFromWished, 
    ChangeQuantity, 
    AddAddress,
    RemoveAddress,
    MakeAddressDefault
}