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
import './profile.css'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { useTranslation } from "react-i18next";

function Profile() {

    const {t} = useTranslation()

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
      <div className="profile">
          <p className="urlShowPProfile">Profile > <span>{route()}</span></p>
          <div className="profileFormUrls">
              <div className="profileUrls">
                <ul>
                  <li>
                    <Link id="Link1"  to={`${url}/settings`}><EditOutlinedIcon/><p>{t('Edit Profile')}</p></Link>
                  </li>
                  <li>
                    <Link id="Link2"  to={`${url}/orders`}><DescriptionOutlinedIcon/><p>{t('My Orders')}</p></Link>
                  </li>
                  <li>
                    <Link id="Link3"  to={`${url}/payments`}><PaymentOutlinedIcon/><p>{t('Payment Methods')}</p></Link>
                  </li>
                  <li>
                    <Link id="Link4"  to={`${url}/addresses`}><HomeOutlinedIcon/><p>{t('Delivery Adresses')}</p></Link>
                  </li>
                </ul>
              </div>
            <Switch>
              <Route exact path={`${path}`} component={Settings}></Route>
              <Route path={`${path}/settings`} component={Settings} ></Route>
              <Route path={`${path}/orders`} component={Orders} ></Route>
              <Route path={`${path}/payments`} component={Payments} ></Route>
              <Route path={`${path}/addresses`} component={Adresses} ></Route>     
            </Switch>
          </div>
    </div>
    )
}

export default Profile
