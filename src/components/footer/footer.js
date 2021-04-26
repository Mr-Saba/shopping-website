import React from 'react'
import './footer.css'
import {Link} from 'react-router-dom'
import InstagramIcon from '@material-ui/icons/Instagram';
import {Button} from '@material-ui/core'
function Footer() {
    return (
        <footer>
            <nav className="footerNav">
                <ul className="productionUl">
                    <li>
                        <Link to="/production">
                            Production:
                        </Link>
                    </li>
                    <li>
                        <Link to="/earrings">
                                Earrings
                        </Link>
                    </li>
                    <li>
                        <Link to="/rings">
                                Rings
                        </Link>
                    </li>
                    <li>
                        <Link to="/necklaces">
                                Necklaces
                        </Link>
                    </li>
                    <li>
                        <Link to="/brooches">
                            Brooches
                        </Link>
                    </li>
                </ul>
                <ul className="otherUl">
                    <li>Other:</li>
                    <li>
                        <Link to="/aboutUs">
                                About us
                        </Link>
                    </li>
                    <li>
                        <Link to="/termsAndConditions">
                            Terms and Conditions
                        </Link>
                    </li>
                </ul>
                <ul className="profileUl">
                    <li>Profile:</li>
                    <li>
                        <Button component={Link} to="/logIn" variant="contained" >Log In</Button>
                    </li>
                    <li>
                        <Button component={Link} to="/signUp" variant="contained" >Sign Up</Button>
                    </li>
                </ul>
                <ul>
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
