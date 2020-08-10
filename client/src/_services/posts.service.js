import axios from 'axios'

import { API_URL } from '../constants'
import { authHeader } from '../_helpers'

export const postsService = {
    getAllPosts,
    addPost,
    patchPost,
    deletePost,
}

function getAllPosts() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }

    return fetch(`${API_URL}/posts`, requestOptions).then(handleResponse)
}

function addPost(post) {
    let config = {
        headers: authHeader(),
    }
    return axios.post(`${API_URL}/posts/add`, post, config).then((res) => {
        const post = res.data.post
        return post
    })
}

function patchPost(post) {
    let config = {
        headers: authHeader(),
    }
    return axios.patch(`${API_URL}/posts/post`, post, config).then((res) => {
        const post = res.data.post
        return post
    })
}

function deletePost(id) {
    let config = {
        headers: authHeader(),
    }

    let data = {
        id,
    }
    return axios.post(`${API_URL}/posts/delete`, data, config).then((res) => {
        const post = res.data.post
        return post
    })
}

function handleResponse(response) {
    return response.text().then((text) => {
        const { posts } = text && JSON.parse(text)

        return posts
    })
}
