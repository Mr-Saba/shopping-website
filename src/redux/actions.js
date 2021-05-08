import { 
    SIGN_UP_WITH_EMAIL_PASS, 
    SIGN_OUT,
    SIGN_IN_WITH_EMAIL_PASS,
    RESET_PASS
    } from "./constants"
import { auth, firebase, firestore } from "../firebase/Configuration"
import {Redirect} from "react-router-dom"


const SignUpWithEmailAndPassword = (data) => async dispatch => {
    await auth.createUserWithEmailAndPassword(data.email, data.password)
    .then(cred => {   
        firestore.collection("users").doc(cred.user.uid).set({
            email: data.email,
            firstname: data.name,
            lastname: data.surname,
            dateofbirth: "",
            number: data.number
        })
        dispatch({
                type: SIGN_UP_WITH_EMAIL_PASS,
                payload: cred.user, 
            })
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
    auth.sendPasswordResetEmail(email).then(response => {
        dispatch({
            type: RESET_PASS,
            payload: response.user,
        })
    }).catch(error =>
        console.log(error)
    );
}

const SignInWithEmailAndPassword = (data) => async dispatch => {
    auth.signInWithEmailAndPassword(data.email, data.password)
        .then(response => {
            dispatch({
                type: SIGN_IN_WITH_EMAIL_PASS,
                payload: response.user,
            }) 
        }).catch((error) => {
            console.log(error.message)
        })
}

const UpdateCredentials = (data) => async dispatch => {
    const user = auth.currentUser
        await user.updateEmail(data.email).then(()=>{
            console.log("email has changed")
        })
    if(data.password === data.confirm_password) {
        await user.updatePassword(data.password).then(()=>{
        console.log("password has changed")
        })
    }
        // .finally()
        // if(data.password === data.confirm_password) {
        //     await user.updatePassword(data.password).then(()=>{
        //         console.log("password has changed")
        //     }).catch((error) => {
        //         console.log(error)
        //     })
        // } else {
        //     alert("confirm error")
        // }
}

export { SignUpWithEmailAndPassword, SignOut, ResetPass, SignInWithEmailAndPassword, UpdateCredentials }