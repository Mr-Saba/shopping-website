import { 
    SIGN_UP_WITH_EMAIL_PASS, 
    SIGN_OUT,
    SIGN_IN_WITH_EMAIL_PASS,
    RESET_PASS,
    UPDATE_EMAIL
    } from "./constants"
import { auth, firebase, firestore } from "../firebase/Configuration"

const SignUpWithEmailAndPassword = (data) => async dispatch => {
    await auth.createUserWithEmailAndPassword(data.email, data.password)
    .then(cred => {   
        firestore.collection("users").doc(cred.user.uid).set({
            email: data.email,
            firstname: data.name,
            lastname: data.surname,
            dateofbirth: "",
            nation: data.nation,
            number: data.number,
            password: data.password
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
    await user.updatePassword(data.password).then(()=>{
        firestore.collection("users").doc(user.uid).update({
            password: data.password
        })
        console.log("pass changed")       
        dispatch({
            type: UPDATE_EMAIL,
            payload: user,
        }) 
    }) 
}

export { SignUpWithEmailAndPassword, SignOut, ResetPass, SignInWithEmailAndPassword, UpdateCredentials, UpdatePassword }