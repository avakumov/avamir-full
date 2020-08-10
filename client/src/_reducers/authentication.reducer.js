import { userConstants } from '../_constants'

let user = JSON.parse(localStorage.getItem('user'))
const initialState = user ? { loggedIn: true, user } : {}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                user: action.user,
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                user: action.user,
            }
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                loginError: action.error,
            }
        case userConstants.LOGOUT:
            return {}
        case userConstants.REGISTER_REQUEST:
            return {
                ...state,
                registerRequest: true,
                registerMessage: null,
                registerError: null,
            }
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                registerRequest: false,
                registerMessage: action.message,
                registerError: null,
            }
        case userConstants.REGISTER_FAILURE:
            return {
                ...state,
                registerRequest: false,
                registerError: action.error,
                registerMessage: null,
            }
        default:
            return state
    }
}
