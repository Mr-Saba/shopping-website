import React from 'react'
import {Route, Redirect} from "react-router-dom"
import {useSelector} from "react-redux"

function ProtectedRoute({
    component: Component
}) {

    const {isLoggedIn} = useSelector(state => state)


    return (
        <Route
        render={props => 
            isLoggedIn===true ? (
                <Component {...props} />
            ) : (
                <Redirect to="/logIn" />
            )
        }
    />
)
}

export default ProtectedRoute