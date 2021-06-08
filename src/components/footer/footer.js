import React, {useState, useEffect} from 'react'
import './footer.css'
import {Link} from 'react-router-dom'
import InstagramIcon from '@material-ui/icons/Instagram';
import {Button} from '@material-ui/core'
import { useTranslation } from "react-i18next";
import i18next from '../../i18/languages/i18n'
import {FormControl,NativeSelect} from '@material-ui/core';
import {useSelector, useDispatch} from "react-redux"
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { FilterByCategory, GetProducts } from '../../redux/actions';

function Footer() {

    const dispatch = useDispatch()

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
    };
    const CategoryFilter = (value) => {
        if(value !== "") {
            dispatch(FilterByCategory(value))
        } else{
            dispatch(GetProducts())
        }
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
    };


    const { isLoggedIn } = useSelector(state => state.UserReducer)

    const {t} = useTranslation()
    
    const currentLanguage = localStorage.getItem("language") 

    useEffect(() => {
        changeLanguage(currentLanguage)
    }, [])

    const changeLanguage = (lang) => {
        i18next.changeLanguage(lang)
        localStorage.setItem("language", lang)
    }

    return (
        <footer>
            <div className="scroller">
                <button onClick={scrollToTop} ><KeyboardArrowUpIcon/></button>
            </div>
            <nav className="footerNav">
                <ul className="productionUl">
                    <li>
                        <Link to="/production">
                            <button onClick={(event) => CategoryFilter(event.target.value)} value="">
                                {t('Production')}:
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/production">
                            <button onClick={(event) => CategoryFilter(event.target.value)} value="Earring">
                                {t('Earrings')}
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/production">
                            <button onClick={(event) => CategoryFilter(event.target.value)} value="Ring">
                                {t('Rings')}
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/production">
                            <button onClick={(event) => CategoryFilter(event.target.value)} value="Necklace">
                                {t('Necklaces')}
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/production">
                            <button onClick={(event) => CategoryFilter(event.target.value)} value="Brooche">
                                {t('Brooches')}
                            </button>
                        </Link>
                    </li>
                </ul>
                <ul className="otherUl">
                    <li>{t('Other')}:</li>
                    <li>
                        <Link to="/about-us">
                        {t('AboutUs')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/terms-and-conditions">
                        {t('TermsAndConditions')}
                        </Link>
                    </li>
                </ul>
                <ul className="profileUl">
                <li>{t('Profile')}:</li>
                { (isLoggedIn === true) ?
                (
                    <div className="routesFooterLogin">
                        <Link to="/profile/settings">
                            {t('Settings')}
                        </Link>
                        <Link to="/profile/orders">
                            {t('My orders')}
                        </Link>
                        <Link to="/profile/payments">
                            {t('Payment methods')}
                        </Link>
                        <Link to="/profile/addresses">
                            {t('Delivery adresses')}
                        </Link>
                    </div>
                ) : (
                    <div className="buttonsFooterEverybody">
                        <li>
                            <Button component={Link} to="/log-in" variant="contained" >{t('LogIn')}</Button>
                        </li>
                        <li>
                            <Button component={Link} to="/sign-up" variant="contained" >{t('SignUp')}</Button>
                        </li>
                    </div>
                )
                }
                </ul>
                <ul>
                    <li>
                        <FormControl >
                            <NativeSelect
                            id="demo-customized-select-native"
                            onChange={(event) => changeLanguage(event.target.value)} 
                            defaultValue={currentLanguage}
                            >
                            <option value="en">{t('English')}</option>
                            <option value="ka">{t('Georgian')}</option>
                            <option value="ru">{t('Russian')}</option>
                            </NativeSelect>
                        </FormControl>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/" target='_blank'>
                            <InstagramIcon/>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="copyRight" >
                <p>&copy; 2021 TΛTΛ</p>
            </div>
        </footer>
    )
}

export default Footer
