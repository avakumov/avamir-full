import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './navbar.css'
import logoutImg from './logout.png'
import { userActions } from '../../_actions'

//menuItems [{to, title},...]
const NavBar = ({ menuItems, user, dispatch, loggedIn }) => {
    const username = user && user.name ? user.name.toUpperCase() : 'Guest'
    const [activeItem, setActiveItem] = useState(0)
    const changeCurrentItem = (id) => {
        setActiveItem(id)
    }

    const handleLogout = () => {
        dispatch(userActions.logout())
    }

    useEffect(() => {
        const activeItemMenu = menuItems.find(
            (item) => window.location.pathname === item.to
        )
        if (activeItemMenu) {
            setActiveItem(activeItemMenu.id)
        }
    }, [menuItems])

    const links = menuItems.map((item) => {
        let classes = 'item-navbar hvr-underline-from-left'
        if (item.id === activeItem) {
            classes += ' current'
        }
        return (
            <Link
                key={item.id}
                to={item.to}
                className={classes}
                onClick={() => changeCurrentItem(item.id)}
            >
                <b>{item.title}</b>
            </Link>
        )
    })
    return (
        <div className="main-navbar">
            <div className="main-itesms-navbar">{links}</div>
            <div className="login-navbar paper">
                {username}

                {loggedIn ? (
                    <img
                        src={logoutImg}
                        onClick={handleLogout}
                        className="image-navbar-logout"
                        alt="logout"
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { user, loggedIn } = state.authentication
    return {
        loggedIn,
        user,
    }
}

const connectedNavbar = connect(mapStateToProps)(NavBar)
export default connectedNavbar
