import React, { useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { userActions } from '../../_actions'
import Loading from '../loading/Loading'
import Navbar from '../navbar/navbar'
import Login from './login'
import Register from './register'

const menuItems = [
    { title: 'Login', _id: '0' },
    { title: 'Register', _id: '1' },
]

const Main = styled.div`
    margin: 20px auto;
    width: 450px;
    display: flex;
    flex-direction: column;
    line-height: 100%;
    padding: 1rem !important;
    background-color: skyblue;
    justify-content: center;
    align-items: center;
    justify-content: flex-start;
    height: 250px;
`

const AuthContainer = ({
    registerRequest,
    registerMessage,
    registerError,
    login,
    register,
    loggedIn,
    loggingIn,
    loginError,
}) => {
    const [activeMenuItemId, setActiveMenuItemId] = useState('0')

    const setMenuItemId = (id) => {
        setActiveMenuItemId(id)
    }

    const handleLogin = ({ username, password }) => {
        if (username && password) {
            login(username, password)
        }
    }

    if (loggedIn) {
        return ''
    } else if (loggingIn || registerRequest) {
        return (
            <Main className="paper">
                <Loading />
            </Main>
        )
    } else {
        return (
            <Main className="paper">
                <Navbar
                    menuItems={menuItems}
                    setMenuItemId={setMenuItemId}
                    activeMenuItemId={activeMenuItemId}
                    direction="row"
                    colorActiveItem="#1d90c5"
                    colorActiveItemText="white"
                />
                {activeMenuItemId === '0' ? (
                    <Login handleLogin={handleLogin} loginError={loginError} />
                ) : (
                    <Register
                        registerMessage={registerMessage}
                        registerError={registerError}
                        register={register}
                    />
                )}
            </Main>
        )
    }
}

function mapStateToProps(state) {
    const {
        registerRequest,
        registerMessage,
        registerError,
        loggedIn,
        loggingIn,
        loginError,
    } = state.authentication
    return {
        registerRequest,
        registerMessage,
        registerError,
        loggedIn,
        loggingIn,
        loginError,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) =>
            dispatch(userActions.login(username, password)),
        register: ({ username, email, password, passwordRepeat }) =>
            dispatch(
                userActions.register({
                    username,
                    email,
                    password,
                    passwordRepeat,
                })
            ),
    }
}

const connectedAuthContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthContainer)
export { connectedAuthContainer as AuthContainer }
