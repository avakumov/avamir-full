import React from 'react'
import styled from 'styled-components'

import Post from './post'

const M = styled.div``

const Posts = ({ posts }) => {
    return (
        <M>
            {posts.map((p) => (
                <Post key={p._id} post={p} />
            ))}
        </M>
    )
}

export default Posts
