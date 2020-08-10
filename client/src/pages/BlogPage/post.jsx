import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postsActions } from '../../_actions'
import Separator from './components/separator'

const ReactMarkdown = require('react-markdown/with-html')
const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    margin-top: 1rem;
`

const Tag = styled.div`
    padding: 2px 4px 2px 4px;

    border-color: ${(props) => (props.selected ? 'green' : 'gray')};
    background-color: ${(props) => (props.color ? props.color : 'lightgray')};
    color: gray;
    border-radius: 5px;
    margin: 0.3rem;
    box-shadow: ${(props) =>
        props.selected ? '0 0 5px green' : '0 0 0px gray'};
`
const M = styled.div``

const Post = ({ post, deletePost }) => {
    return (
        <M>
            <ReactMarkdown escapeHtml={false} source={post.content} />

            <Tags>
                {post.tags.map((t) => (
                    <Tag key={t._id}>{t.title}</Tag>
                ))}
            </Tags>

            <Link className="button-gray2" to={`/blog/edit/${post._id}`}>
                <span className="material-icons" style={{ fontSize: '15px' }}>
                    edit
                </span>
            </Link>

            <Separator />
        </M>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePost: (id) => dispatch(postsActions.deletePost(id)),
    }
}

const connectedPost = connect(null, mapDispatchToProps)(Post)

export default connectedPost
