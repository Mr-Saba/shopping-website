import { 
    SIGN_UP_WITH_EMAIL_PASS, 
    SIGN_UP_WITH_NUMBER, 
    SIGN_OUT,
    SIGN_IN_WITH_EMAIL_PASS,
    RESET_PASS
    } from "./constants"
import { auth, firebase } from "../firebase/Configuration"

const SignUpWithEmailAndPassword = (data) => async dispatch => {
    auth.createUserWithEmailAndPassword(data.email, data.password)
        .then(response => {
            console.log(response.user.ba.displayName)
            // response.user.displayName = data.name
            // const name = response.user.displayName
            // console.log(response.user.displayName)
            dispatch({
                type: SIGN_UP_WITH_EMAIL_PASS,
                payload: response.user
            })
        })
}


const SignUpWithNumber = (data) => async dispatch => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha')
    console.log(data.number)
    auth.signInWithPhoneNumber(data.number, recaptchaVerifier).then((result) => {
        console.log("result")
        
            let code = prompt("enter otp","")
            if (code === null) console.log("null")
            result.confirm(code).then((response) => {
            dispatch({
                type: SIGN_UP_WITH_NUMBER,
                payload: result.user
            })
            console.log(response)
            console.log("verified")
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
    console.log(email)
    auth.sendPasswordResetEmail(email).then(response => {
        dispatch({
            type: RESET_PASS,
            payload: response.user
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
                payload: response.user
            })
        })
}

export { SignUpWithEmailAndPassword, SignUpWithNumber, SignOut, ResetPass, SignInWithEmailAndPassword }