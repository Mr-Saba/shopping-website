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
import Topic from "./Topic"

function Profile() {

    let { path, url } = useRouteMatch();
    let {profile} = useParams()

    useEffect(() => {
        console.log(profile)
    }, [])

    return (
        <div>
        <h3>{`Profile > `}</h3>
        <ul>
        <li>
          <Link to={`${url}/settings`}>Edit Profile</Link>
        </li>
        <li>
          <Link to={`${url}/orders`}>My Orders</Link>
        </li>
        <li>
          <Link to={`${url}/payments`}>Payment Methods</Link>
        </li>
        <li>
          <Link to={`${url}/addresses`}>Delivery Adresses</Link>
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
