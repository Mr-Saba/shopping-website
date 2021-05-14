import { DragHandle } from '@material-ui/icons';
import React, {useEffect} from 'react'
import {
  useParams,
  useRouteMatch,
  useHistory,
  Link,
  Switch,
  Route
} from "react-router-dom";
import ProtectedRoute from '../../ProtectedRoute';
import Adresses from './adresses/Adresses';
import Orders from './orders/Orders';
import Payments from './payments/Payments';
import Settings from './settings/Settings';
import {useSelector} from "react-redux"


function Profile() {

    const history = useHistory()

    let { path, url } = useRouteMatch();

    let pathName = window.location.pathname

    const {isLoggedIn} = useSelector(state => state)

    const route = () => {
        if (pathName == "/profile/settings" || pathName == "/profile") return "Edit Profile"
        if (pathName == "/profile/orders") return "My Orders"
        if (pathName == "/profile/payments") return "Payment Methods"
        if (pathName == "/profile/addresses") return "Delivery Adresses"
    }
    useEffect(() => {
      if(isLoggedIn === true && pathName == path || pathName == `${path}/`) history.push("/profile/settings")
    }, [])

    return (
        <div>
        <h3>{`Profile > ${route()}`}</h3>
        <ul >
        <li>
        <Link style={pathName == "/profile/settings" ? {color: "red"} : {}}  to={`${url}/settings`}>Edit Profile</Link>
        </li>
        <li>
        <Link style={pathName === "/profile/orders" ? {color: "red"} : {}}  to={`${url}/orders`}>My Orders</Link>
        </li>
        <li>
        <Link style={pathName === "/profile/payments" ? {color: "red"} : {}}  to={`${url}/payments`}>Payment Methods</Link>
        </li>
        <li>
        <Link style={pathName === "/profile/addresses" ? {color: "red"} : {}}  to={`${url}/addresses`}>Delivery Adresses</Link>
        </li>
      </ul>

      <Switch>
        <ProtectedRoute path={`${path}`} component={Settings} exact></ProtectedRoute>

        <ProtectedRoute path={`${path}/settings`} component={Settings} exact></ProtectedRoute>
        <ProtectedRoute path={`${path}/orders`} component={Orders} exact></ProtectedRoute>
        <ProtectedRoute path={`${path}/payments`} component={Payments} exact ></ProtectedRoute>
        <ProtectedRoute path={`${path}/addresses`} component={Adresses} exact ></ProtectedRoute>     
      </Switch>

      </div>
    )
}

export default Profile
