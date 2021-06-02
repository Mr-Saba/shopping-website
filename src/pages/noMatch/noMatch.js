import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link} from 'react-router-dom'
import './noMatch.css'

function NoMatch() {
    // const location = useLocation();

    const {t} = useTranslation()
    return (
        <div className="noMatch">
          <p>404</p>
          <h2>{t("THE PAGE CAN'T BE FOUND")}</h2>
          <Link to="/">
          {t("Go to home page")}
          </Link>
        </div>
    )
}


export default NoMatch
