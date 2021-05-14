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
            console.log(error)
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

export { SignUpWithEmailAndPassword, SignOut, ResetPass, SignInWithEmailAndPassword, UpdateCredentials }