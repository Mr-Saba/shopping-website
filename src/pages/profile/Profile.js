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
      color: "#034488",
      fontWeight: "bold"
    }

    let { path, url } = useRouteMatch();

    let pathName = window.location.pathname

    const {isLoggedIn} = useSelector(state => state.UserReducer)

    const route = () => {
        if (pathName == "/profile/settings" || pathName == "/profile") return `${t('Edit profile')}`
        if (pathName == "/profile/orders") return `${t('My orders')}`
        if (pathName == "/profile/payments") return `${t('Payment methods')}`
        if (pathName == "/profile/addresses") return `${t('Delivery adresses')}`
    }
    useEffect(() => {
      if(isLoggedIn === true && pathName == path || pathName == `${path}/`) history.push("/profile/settings")
    }, [])

    return (
        <div className="profile">
        <p className="urlShowPProfile">{t('Profile')} > <span>{route()}</span></p>
        <div className="profileFormUrls">
          <div className="profileUrls">
            <ul >
              <li>
                <Link style={pathName == "/profile/settings" ? bold : {}}  to={`${url}/settings`}>
                  <EditOutlinedIcon/><p>{t('Edit profile')}</p>
                </Link>
              </li>
              <li>
                <Link style={pathName === "/profile/orders" ? bold : {}}  to={`${url}/orders`}>
                  <DescriptionOutlinedIcon/><p>{t('My orders')}</p>
                </Link>
              </li>
              <li>
                <Link style={pathName === "/profile/payments" ? bold : {}}  to={`${url}/payments`}>
                  <PaymentOutlinedIcon/><p>{t('Payment methods')}</p>
                </Link>
              </li>
              <li>
                <Link style={pathName === "/profile/addresses" ? bold: {}}  to={`${url}/addresses`}>
                  <HomeOutlinedIcon/><p>{t('Delivery adresses')}</p>
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
