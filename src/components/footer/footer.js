import React from 'react'
import './footer.css'
import {Link} from 'react-router-dom'
import InstagramIcon from '@material-ui/icons/Instagram';
import {Button} from '@material-ui/core'
import { useTranslation } from "react-i18next";
import i18next from '../../i18/languages/i18n'

function Footer() {

    const {t} = useTranslation()
    
    const changeLanguage = (lang) => {
        i18next.changeLanguage(lang)
    }

    return (
        <footer>
            <nav className="footerNav">
                <ul className="productionUl">
                    <li>
                        <Link to="/production">
                        {t('Production')}:
                        </Link>
                    </li>
                    <li>
                        <Link to="/earrings">
                        {t('Earrings')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/rings">
                        {t('Rings')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/necklaces">
                        {t('Necklaces')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/brooches">
                        {t('Brooches')}
                        </Link>
                    </li>
                </ul>
                <ul className="otherUl">
                    <li>{t('Other')}:</li>
                    <li>
                        <Link to="/aboutUs">
                        {t('AboutUs')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/termsAndConditions">
                        {t('TermsAndConditions')}
                        </Link>
                    </li>
                </ul>
                <ul className="profileUl">
                    <li>{t('Profile')}:</li>
                    <li>
                        <Button component={Link} to="/logIn" variant="contained" >{t('LogIn')}</Button>
                    </li>
                    <li>
                        <Button component={Link} to="/signUp" variant="contained" >{t('SignUp')}</Button>
                    </li>
                </ul>
                <ul>
                    <li>
                        <select  onChange={(event) => changeLanguage(event.target.value)} className="Select">
                            <option value="en">english</option>
                            <option value="ka">georgian</option>
                            <option value="ru">russian</option>
                        </select>
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
