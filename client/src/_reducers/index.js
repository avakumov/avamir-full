import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { users } from './users.reducer'
import { tasks } from './tasks.reducer'
import { alert } from './alert.reducer'
import { books } from './books.reducer'
import { posts } from './posts.reducer'

const rootReducer = combineReducers({
    authentication,
    users,
    alert,
    tasks,
    books,
    posts,
})

export default rootReducer
