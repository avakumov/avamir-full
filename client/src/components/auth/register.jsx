import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { API_URL } from '../../constants'

const Input = styled.input`
    font-weight: bold;
    font-family: 'pragmata-pro';
    border: 1px solid #ccc;
    padding-left: 0.3rem;
`

const Error = styled.div`
    color: gray;
    padding: 3px;
`
const Message = styled.div`
    color: darkgreen;
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

const Register = ({ registerMessage, registerError, register }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    const [error, setError] = useState(null)
    const [validateMessage, setValidateMessage] = useState(null)

    const handleChangeName = (e) => {
        setUsername(e.target.value)
    }
    useEffect(
        () => validateServer({ username, email, password, passwordRepeat }),
        [username, email, password, passwordRepeat]
    )

    const validateServer = ({ username, email, password, passwordRepeat }) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                name: username,
                passwordRepeat,
            }),
        }
        fetch(`${API_URL}/utils/validate-register`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                    setValidateMessage('')
                } else {
                    setError('')
                }
                if (data.message) {
                    setValidateMessage(data.message)
                }
            })
            .catch((err) => {
                setError('Ошибка сервера!')
                setValidateMessage('')
            })
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangeRepeatPassword = (e) => {
        setPasswordRepeat(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = () => {
        if (password !== passwordRepeat) {
            setError('Пароли не совпадают!')
        } else {
            register({
                username,
                email,
                password,
                passwordRepeat,
            })
        }
    }

    return (
        <M>
            <BlockMessages>
                {validateMessage ? <Message>{validateMessage}</Message> : ''}
                {registerMessage ? <Message>{registerMessage}</Message> : ''}
                {error ? <Error>{error}</Error> : ''}
                {registerError ? <Error>{registerError}</Error> : ''}
            </BlockMessages>

            <table>
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'right' }}>
                            <label htmlFor="username">Name</label>
                        </td>
                        <td>
                            <Input
                                type="text"
                                name="username"
                                value={username}
                                onChange={handleChangeName}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right' }}>
                            <label htmlFor="email">Email</label>
                        </td>
                        <td>
                            <Input
                                type="email"
                                name="eamil"
                                value={email}
                                onChange={handleChangeEmail}
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
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: 'right' }}>
                            <label htmlFor="passwordRepeat">
                                Repeat password
                            </label>
                        </td>
                        <td>
                            <Input
                                type="password"
                                name="passwordRepeat"
                                value={passwordRepeat}
                                onChange={handleChangeRepeatPassword}
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
                                Register
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </M>
    )
}

export default Register
