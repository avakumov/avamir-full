import React from 'react'
import { Link } from 'react-router-dom'
import PageNotFound from './page-not-found.png'
const NotFoundPage = () => {
    return (
        <div>
            <p style={{ textAlign: 'center' }}>
                <img alt="Page not found 404" src={PageNotFound} />
            </p>
            <p style={{ textAlign: 'center' }}>
                <Link to="/">На главную </Link>
            </p>
        </div>
    )
}
export default NotFoundPage
