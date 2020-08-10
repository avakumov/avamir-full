import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { API_URL } from '../../constants'

const Input = styled.input`
    width: 180px;
    font-weight: bold;
    font-family: 'pragmata-pro';
    border: 1px solid #ccc;
    padding-left: 0.3rem;
`
const Error = styled.div`
    color: gray;
    padding: 3px;
`
const ErrorLogin = styled.div`
    color: darkred;
    padding: 3px;
`

const BlockMessages = styled.div`
    min-height: 2rem;
    width: max-content;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const M = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Login = ({ handleLogin, loginError }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [validationError, setvalidationError] = useState('')

    useEffect(() => validateServer({ username, password }), [
        username,
        password,
    ])

    const validateServer = ({ username, password }) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: username,
                password,
            }),
        }
        fetch(`${API_URL}/utils/validate-login`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setvalidationError(data.error)
                } else {
                    setvalidationError('')
                }
            })
            .catch((err) => {
                setvalidationError('Ошибка сервера!')
            })
    }

    const handlerKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin({ username, password })
        }
    }

    const handleChangeName = (e) => {
        setUsername(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = () => {
        handleLogin({ username, password })
    }

    return (
        <M>
            <BlockMessages>
                {loginError ? <ErrorLogin>{loginError}</ErrorLogin> : ''}
                {validationError ? <Error>{validationError}</Error> : ''}
            </BlockMessages>

            <table>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'right' }}>
                            <label htmlFor="email">Email</label>
                        </td>
                        <td>
                            <Input
                                type="email"
                                name="email"
                                value={username}
                                onChange={handleChangeName}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right' }}>
                            <label htmlFor="password">Password</label>
                        </td>
                        <td>
                            <Input
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChangePassword}
                                onKeyUp={handlerKeyPress}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button
                                className="button-blue"
                                onClick={handleSubmit}
                            >
                                Login
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </M>
    )
}

export default Login
