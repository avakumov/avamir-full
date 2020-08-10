import { tasksConstants } from '../_constants'

export function tasks(state = {}, action) {
    switch (action.type) {
        case tasksConstants.GETALL_REQUEST:
            return {
                loading: true,
            }
        case tasksConstants.GETALL_SUCCESS:
            return {
                tasks: action.tasks,
            }
        case tasksConstants.GETALL_FAILURE:
            return {
                error: action.error,
            }
        default:
            return state
    }
}
