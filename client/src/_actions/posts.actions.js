import { postsConstants } from '../_constants'
import { postsService } from '../_services'
import {history} from '../_helpers'

export const postsActions = {
    getAllPosts,
    patchPost,
    addPost,
    deletePost,
}

function getAllPosts() {
    return (dispatch) => {
        dispatch(request())

        postsService.getAllPosts().then(
            (posts) => {
                dispatch(success(posts))
            },
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: postsConstants.GETALL_POSTS_REQUEST }
    }

    function success(posts) {
        return { type: postsConstants.GETALL_POSTS_SUCCESS, posts }
    }
    function failure(error) {
        return { type: postsConstants.GETALL_POSTS_FAILURE, error }
    }
}

function patchPost(post) {
    return (dispatch) => {
        dispatch(request())

        postsService.patchPost(post).then(
            (post) => {
                dispatch(success(post))
                history.push('/blog')
            },
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: postsConstants.PATCH_POST_REQUEST }
    }
    function success(post) {
        return { type: postsConstants.PATCH_POST_SUCCESS, post }
    }
    function failure(error) {
        return { type: postsConstants.PATCH_POST_FAILURE, error }
    }
}

function deletePost(id) {
    return (dispatch) => {
        dispatch(request())

        postsService.deletePost(id).then(
            (post) => {
                dispatch(success(post))
                history.push('/blog')
            },
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: postsConstants.DELETE_POST_REQUEST }
    }
    function success(post) {
        return { type: postsConstants.DELETE_POST_SUCCESS, post }
    }
    function failure(error) {
        return { type: postsConstants.DELETE_POST_FAILURE, error }
    }
}

function addPost(post) {
    return (dispatch) => {
        dispatch(request())

        postsService.addPost(post).then(
            (post) => {
                dispatch(success(post))
                history.push('/blog')
            },
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: postsConstants.ADD_POST_REQUEST }
    }
    function success(post) {
        return { type: postsConstants.ADD_POST_SUCCESS, post }
    }
    function failure(error) {
        return { type: postsConstants.ADD_POST_FAILURE, error }
    }
}
