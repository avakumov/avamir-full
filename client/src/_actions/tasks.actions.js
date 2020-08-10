import { tasksConstants } from '../_constants'
import { tasksService } from '../_services'

export const tasksActions = {
    getAll,
}

function getAll() {
    return (dispatch) => {
        dispatch(request())

        tasksService.getAll().then(
            (tasks) => dispatch(success(tasks)),
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: tasksConstants.GETALL_REQUEST }
    }
    function success(tasks) {
        return { type: tasksConstants.GETALL_SUCCESS, tasks }
    }
    function failure(error) {
        return { type: tasksConstants.GETALL_FAILURE, error }
    }
}
