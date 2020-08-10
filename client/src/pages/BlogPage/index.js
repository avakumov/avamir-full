import React from 'react'
import BlogPage from './blog-page'
import CreatePost from './create-post'
import EditPost from './edit-post'
import { Route, Switch } from 'react-router-dom'

import { PrivateRoute } from '../../_components'
import NotFoundPage from '../../pages/NotFound/not-found-page'

const BlogApp = () => {
    return (
        <>
            <Switch>
                <PrivateRoute exact path="/blog" component={BlogPage} />
                <PrivateRoute
                    exact
                    path="/blog/createpost"
                    component={CreatePost}
                />
                <PrivateRoute
                    exact
                    path="/blog/edit/:id"
                    component={EditPost}
                />

                <Route path="*" component={NotFoundPage} />
            </Switch>
        </>
    )
}

export default BlogApp
