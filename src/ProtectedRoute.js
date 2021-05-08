import React, {useEffect} from 'react'
import {Route, Redirect} from "react-router-dom"
import {useSelector} from "react-redux"

function ProtectedRoute({
    component: Component
}) {

    const {isLoggedIn} = useSelector(state => state)

    useEffect(() => {

    }, [])

    return (
        <Route
        render={props => 
            localStorage.getItem("user")!== null ? (
                <Component {...props} />
            ) : (
                <Redirect to="/logIn" />
            )
        }
    />
)
}

export default ProtectedRoute