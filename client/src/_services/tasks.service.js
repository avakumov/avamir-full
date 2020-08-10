import { API_URL } from '../constants'
import { authHeader } from '../_helpers'

export const tasksService = {
    getAll,
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }

    return fetch(`${API_URL}/tasks`, requestOptions).then(handleResponse)
}

function handleResponse(response) {
    return response.text().then((text) => {
        const { tasks } = text && JSON.parse(text)

        return tasks
    })
}
