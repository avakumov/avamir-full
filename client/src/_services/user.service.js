import axios from 'axios'
import { API_URL } from '../constants'

export const userService = {
    login,
    logout,
    register,
}

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    }

    return fetch(`${API_URL}/auth/login`, requestOptions)
        .then(handleResponse)
        .then((user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user))

            return user
        })
}

function register({ username, email, password, passwordRepeat }) {
    const dataReq = { name: username, email, password, passwordRepeat }
    return axios
        .post(`${API_URL}/auth/register`, dataReq)
        .then((res) => {
            const { message } = res.data
            return message
        })
        .catch((error) => {
            return Promise.reject(error.response.data.error)
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user')
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout()
                window.location.reload(false)
            }

            //const error = (data && data.message) || response.statusText
            const error = data.error
            return Promise.reject(error)
        }

        return data
    })
}
