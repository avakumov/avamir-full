import { postsConstants } from '../_constants'

const initState = {
    posts: [],
}

export function posts(state = initState, action) {
    switch (action.type) {
        case postsConstants.GETALL_POSTS_REQUEST:
            return {
                ...state,
                postsloading: true,
            }
        case postsConstants.GETALL_POSTS_SUCCESS:
            return {
                ...state,
                postsloading: false,
                posts: action.posts,
            }
        case postsConstants.GETALL_POSTS_FAILURE:
            return {
                ...state,
                postsloading: false,
                errorGetPosts: action.error,
            }
        case postsConstants.ADD_POST_REQUEST:
            return {
                ...state,
                postadding: true,
            }
        case postsConstants.ADD_POST_SUCCESS:
            return {
                ...state,
                postadding: false,
                posts: [...state.posts, action.post],
            }
        case postsConstants.ADD_POST_FAILURE:
            return {
                ...state,
                postadding: false,
                errorAddPost: action.error,
            }
        default:
            return state
    }
}
