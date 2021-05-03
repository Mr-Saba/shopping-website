import React from 'react'
import './header.css'
import {Link} from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton, Badge} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { useTranslation } from "react-i18next";
import {useDispatch} from "react-redux"
import {SignOut} from "../../redux/actions"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useSelector} from "react-redux"

function Header() {

    const dispatch = useDispatch()

    const { isLoggedIn} = useSelector(state => state)

    const LogOut = () => {
        dispatch(SignOut())
    }

    const {t} = useTranslation()

    return (
        <div className="header">
           <nav className="headerNav">
               <ul className="logoUl">
                    <li>
                        <Link to="/">TΛTΛ</Link>
                    </li>
                </ul>
               <ul className="centerUl">
                   <li>
                       <Link to="/">{t('Home')}</Link>
                   </li>
                   <li>
                       <Link to="/production">{t('Production')}</Link>
                   </li>
                   <li>
                       <Link to="/aboutUs">{t('AboutUs')}</Link>
                   </li>
                </ul>
                <ul className="serach">
                    
                </ul>
                <ul className="rightUl">
                   <li>
                       <Link to="/cart">
                           <FavoriteBorderIcon/>
                       </Link>
                   </li>
                   <li>
                        <IconButton  component={Link} to='/cart' area-label='Show cart items' color='inherit'>
                            <Badge badgeContent="0" color='secondary'>
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                   </li>
                   <li>
                       <Link to="/profile/settings">
                           <PersonOutlineOutlinedIcon/>
                       </Link>
                   </li>
                   { (isLoggedIn === true) ? (
                   <li>
                       <button style={{cursor: "pointer"}} onClick={LogOut}>
                            <ExitToAppIcon/>
                       </button>
                   </li>
                   ) : (
                   <li>
                       
                   </li>
                   )
                    }
                </ul>
           </nav>
        </div>
    )
}

export default Header
