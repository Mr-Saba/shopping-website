import React, {useEffect} from 'react'
import {
  useParams,
  useRouteMatch,
  Link,
  Switch,
  Route
} from "react-router-dom";
import Adresses from './adresses/Adresses';
import Orders from './orders/Orders';
import Payments from './payments/Payments';
import Settings from './settings/Settings';

function Profile() {

    const red = {
        color: "red"
    }

    let { path, url } = useRouteMatch();

    const route = () => {
        if (window.location.pathname == "/profile/settings") return "Edit Profile"
        if (window.location.pathname == "/profile/orders") return "My Orders"
        if (window.location.pathname == "/profile/payments") return "Payment Methods"
        if (window.location.pathname == "/profile/addresses") return "Delivery Adresses"
    }
    const styling = () => {
        console.log(path)
    }

    useEffect(() => {
        console.log(path)
    }, [])

    return (
        <div>
        <h3>{`Profile > ${route()}`}</h3>
        <ul>
        <li>
          <Link id="Link1"  to={`${url}/settings`}>Edit Profile</Link>
        </li>
        <li>
          <Link id="Link2"  to={`${url}/orders`}>My Orders</Link>
        </li>
        <li>
          <Link id="Link3"  to={`${url}/payments`}>Payment Methods</Link>
        </li>
        <li>
          <Link id="Link4"  to={`${url}/addresses`}>Delivery Adresses</Link>
        </li>
      </ul>

      <Switch>
        <Route exact path={`${path}`} component={Settings}></Route>


        <Route path={`${path}/settings`} component={Settings} ></Route>
        <Route path={`${path}/orders`} component={Orders} ></Route>
        <Route path={`${path}/payments`} component={Payments} ></Route>
        <Route path={`${path}/addresses`} component={Adresses} ></Route>     
      </Switch>

      </div>
    )
}

export default Profile
