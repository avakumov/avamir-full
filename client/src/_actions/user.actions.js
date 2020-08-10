import { userConstants } from '../_constants'
import { userService } from '../_services'
import { history } from '../_helpers'

export const userActions = {
    login,
    logout,
    getAll,
    register,
}

function login(email, password) {
    return (dispatch) => {
        dispatch(request({ email }))

        userService.login(email, password).then(
            (user) => {
                dispatch(success(user))
                history.push('/')
                //window.location.reload(false)
            },
            (error) => {
                dispatch(failure(error))
                //dispatch(alertActions.error(error));
            }
        )
    }

    function request(user) {
        return { type: userConstants.LOGIN_REQUEST, user }
    }
    function success(user) {
        return { type: userConstants.LOGIN_SUCCESS, user }
    }
    function failure(error) {
        return { type: userConstants.LOGIN_FAILURE, error }
    }
}

function register({ username, email, password, passwordRepeat }) {
    return (dispatch) => {
        dispatch(request({ username }))

        userService
            .register({ username, email, password, passwordRepeat })
            .then(
                (message) => {
                    dispatch(success(message))
                },
                (error) => {
                    dispatch(failure(error))
                }
            )
    }

    function request(username) {
        return { type: userConstants.REGISTER_REQUEST, username }
    }
    function success(message) {
        return { type: userConstants.REGISTER_SUCCESS, message }
    }
    function failure(error) {
        return { type: userConstants.REGISTER_FAILURE, error }
    }
}

function logout() {
    userService.logout()
    return { type: userConstants.LOGOUT }
}

function getAll() {
    return (dispatch) => {
        dispatch(request())

        userService.getAll().then(
            (users) => dispatch(success(users)),
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: userConstants.GETALL_REQUEST }
    }
    function success(users) {
        return { type: userConstants.GETALL_SUCCESS, users }
    }
    function failure(error) {
        return { type: userConstants.GETALL_FAILURE, error }
    }
}
