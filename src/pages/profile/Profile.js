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
import './profile.css'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import PaymentOutlinedIcon from '@material-ui/icons/PaymentOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import { useTranslation } from "react-i18next";
import {useSelector} from "react-redux"

function Profile() {

    const history = useHistory()

    const {t} = useTranslation()

    const bold = {
        color: "#001e3f",
        fontWeight: "bold"
    }

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
        <div className="profile">
        <p className="urlShowPProfile">Profile > <span>{route()}</span></p>
        <div className="profileFormUrls">
        <div className="profileUrls">
        <ul >
        <li>
        <Link style={pathName == "/profile/settings" ? bold : {}}  to={`${url}/settings`}>
          <EditOutlinedIcon/><p>{t('Edit Profile')}</p>
        </Link>
        </li>
        <li>
        <Link style={pathName === "/profile/orders" ? bold : {}}  to={`${url}/orders`}>
          <DescriptionOutlinedIcon/><p>{t('My Orders')}</p>
        </Link>
        </li>
        <li>
        <Link style={pathName === "/profile/payments" ? bold : {}}  to={`${url}/payments`}>
          <PaymentOutlinedIcon/><p>{t('Payment Methods')}</p>
        </Link>
        </li>
        <li>
        <Link style={pathName === "/profile/addresses" ? bold: {}}  to={`${url}/addresses`}>
          <HomeOutlinedIcon/><p>{t('Delivery Adresses')}</p>
        </Link>
        </li>
      </ul>
      </div>

      <Switch>
        <ProtectedRoute path={`${path}`} component={Settings} exact></ProtectedRoute>

        <ProtectedRoute path={`${path}/settings`} component={Settings} exact></ProtectedRoute>
        <ProtectedRoute path={`${path}/orders`} component={Orders} exact></ProtectedRoute>
        <ProtectedRoute path={`${path}/payments`} component={Payments} exact ></ProtectedRoute>
        <ProtectedRoute path={`${path}/addresses`} component={Adresses} exact ></ProtectedRoute>     
      </Switch>
      </div>
      </div>
    )
}

export default Profile
