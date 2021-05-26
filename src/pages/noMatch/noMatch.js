import React from 'react'
import { Link} from 'react-router-dom'
import './noMatch.css'

function NoMatch() {
    // const location = useLocation();
    return (
        <div className="noMatch">
          <p>404</p>
          <h2>THE PAGE CAN'T BE FOUND</h2>
          <Link to="/">
            Go to home page
          </Link>
        </div>
    )
}


export default NoMatch
