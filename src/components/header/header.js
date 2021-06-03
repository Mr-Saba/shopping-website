import React, {useState, useEffect} from 'react'
import './header.css'
import {Link, useHistory} from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton, Badge} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from "react-i18next";
import {useDispatch} from "react-redux"
import {SignOut} from "../../redux/actions"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useSelector} from "react-redux"
import Production from '../../pages/production/Production';
import FilteredProducts from '../../pages/production/FilteredProducts';
import products from "../../data/products.json"
import Products from '../../pages/production/Products';

function Header() {


    const dispatch = useDispatch()

    const { isLoggedIn } = useSelector(state => state)

    const [searched, setSearched] = useState("")

    const [buttonVisible, setButtonVisible] = useState(true)
    const [inputVisible, setInputVisible] = useState(false)


    const LogOut = () => {
        dispatch(SignOut())
    }

    const {t} = useTranslation()

    const buttonFocus = () => {
        setInputVisible(true)
        setButtonVisible(false)
    }
    const inputBlur = () => {
        // setInputVisible(false)
        // setButtonVisible(true)
    }
    const inputFocus = () => {
        // setInputVisible(true)
    }

    const handleSearch = (e) => {
        setSearched(e)
    }

    const filterSearch = () => {
        return products.filter(item => item.category.toLowerCase().includes(searched.toLowerCase()))
    }

    return (
        <div className="header">
            {(searched === "") ? (
                <Products />
            ) : (
                <FilteredProducts filtered={filterSearch()}/>
            ) }
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
                       <Link to="/about-us">{t('AboutUs')}</Link>
                   </li>
                </ul>
                <ul className="serach">
                    <li>
                        { inputVisible == true ? (
                        <div>
                            <input value={searched} onChange={(e) => handleSearch(e.target.value)} style={{height: "40px"}} autoFocus={true} onBlur={()=> inputBlur()} onFocus={() => inputFocus()}  type="text" placeholder="Search..." id="search" />
                            <button style={{opacity: "0.3"}} onClick={() => handleSearch()}><SearchIcon/></button>
                        </div>
                        ) : ("")
                        }
                        { buttonVisible == true ? (<button onFocus={() => buttonFocus()} ><SearchIcon/></button>) : ("") }
                   </li>
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
                                <ShoppingCartOutlinedIcon/>
                            </Badge>
                        </IconButton>
                   </li>
                   <li>
                       <Link to="/profile/settings">
                           <PersonOutlineOutlinedIcon/>
                       </Link>
                   </li>
                   { (isLoggedIn == true) ? (
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
