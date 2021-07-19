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
import {SignOut, SearchProducts, GetProducts} from "../../redux/actions"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useSelector} from "react-redux"
import ProductsPage from '../../pages/production/ProductsPage';
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import firebase from "firebase"


const useStyles = makeStyles((theme) => ({
    search: {
      position: "relative",
      color:"#034488",
      borderRadius: theme.shape.borderRadius,

      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto"
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
  
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      cursor: "pointer",
      [theme.breakpoints.up("sm")]: {
        width: "0",
        "&:focus": {
          width: "20ch",
          color:"#034488",
          cursor: "text",
          borderBottom: "1px solid #0344889e",
        }
      }
    }
  }));

function Header() {


    const dispatch = useDispatch()

    const { isLoggedIn } = useSelector(state => state.UserReducer)
    const { cartData, wishedData } = useSelector(state => state.ProductReducer)


    const LogOut = () => {
        dispatch(SignOut())
    }

    const {t} = useTranslation()


    

    useEffect(() => {
    }, [])

    const history = useHistory()

    const searchHandler = (keyword,key) => {
        if(key=="Enter" && keyword !== "") {
          history.push("/production")  
          dispatch(SearchProducts(keyword))
        }else if(keyword == "") {
          dispatch(GetProducts())
        }
    }

    const classes = useStyles();
    
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
                       <Link to="/about-us">{t('AboutUs')}</Link>
                   </li>
                </ul>
                <ul className="serach">
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        <SearchIcon />
                        </div>
                        <InputBase
                        onKeyPress={(event) => searchHandler(event.target.value, event.key)}
                        placeholder="Search…"
                        classes={{
                            input: classes.inputInput
                        }}
                        inputProps={{ "aria-label": "search" }}
                        />
                    </div>
                </ul>
                <ul className="rightUl">
                   <li>
                       <Link to="/cart">
                            <Badge 
                            badgeContent={wishedData.length} 
                            color='secondary'>
                                <FavoriteBorderIcon/>
                            </Badge>
                       </Link>
                   </li>
                   <li>
                        <IconButton component={Link} to='/cart' area-label='Show cart items' color='inherit'>
                            <Badge 
                            badgeContent={cartData.length} 
                            color='secondary'>
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
