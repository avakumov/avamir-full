import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import hljs from 'highlight.js'

import { postsActions } from '../../_actions'
import Navbar from '../../components/navbar/navbar'
import Posts from './posts'
import { getTags } from './utils/utils'

const M = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    padding: 1rem;
`

const M2 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1rem auto;
    align-items: flex-start;
    justify-content: center;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
`
const Count = styled.div`
    margin-top: auto;
    margin-bottom: auto;
`

const Input = styled.input`
    width: 350px;
    font-weight: bold;
    font-family: 'pragmata-pro';
    border: 1px solid #ccc;
`

const BlogPage = ({ posts, getAllPosts }) => {
    const [tags, setTags] = useState([])
    const [searchText, setsetSearchText] = useState('')
    const [postsSearchFiltered, setPostsSearchFiltered] = useState([])
    const [tagFilter, settagFilter] = useState(null)
    const [count, cetCount] = useState(null)

    useEffect(() => {
        cetCount(postsSearchFiltered.length)
    }, [postsSearchFiltered])

    useEffect(() => {
        setTags(getTags(posts))
        setPostsSearchFiltered(posts)
    }, [posts])

    useEffect(getAllPosts, [getAllPosts])

    useEffect(() => {
        searchFilter()
    }, [searchText, tagFilter])

    useEffect(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block)
        })
    }, [postsSearchFiltered, tagFilter])

    const setMenuItemId = (id) => {
        settagFilter(id)
    }

    const handlerfiltersCancel = () => {
        setsetSearchText('')
        settagFilter(null)
    }

    const searchFilter = () => {
        let filteredPosts = [...posts]

        if (tagFilter) {
            filteredPosts = posts.filter((p) =>
                p.tags.find((t) => t._id === tagFilter)
            )
        }

        if (searchText === '') {
            return setPostsSearchFiltered(filteredPosts)
        }
        filteredPosts = posts.filter((post) =>
            post.content.includes(searchText)
        )

        const markedPosts = filteredPosts.map((post) => {
            return {
                ...post,
                content: post.content.replace(
                    searchText,
                    `<span style="background-color:red;">${searchText}</span>`
                ),
                //такой вариант работает но есть пока ошибка и в решении выше. Чтобы вид сильно не портить в блоках кода <pre><code></code></pre>
                // content: post.content.replace(
                //     new RegExp(searchText, 'g'),
                //     `<span style="background-color:red;">${searchText}</span>`
                //),
            }
        })
        setPostsSearchFiltered(markedPosts)
    }

    return (
        <M2>
            <Navbar
                name="По тегам"
                menuItems={tags}
                activeMenuItemId={tagFilter}
                setMenuItemId={setMenuItemId}
                direction="column"
                colorActiveItem="purple"
                colorActiveItemText="white"
            />
            <M className="paper">
                <Header>
                    <div>
                        <Link to="/blog/createpost">
                            <button className="button-gray2">
                                <span
                                    className="material-icons"
                                    style={{ fontSize: '15px' }}
                                >
                                    add
                                </span>
                            </button>
                        </Link>
                    </div>

                    <Count>
                        {count} / {posts.length}
                    </Count>
                    <div>
                        <span
                            className="material-icons"
                            style={{ fontSize: '15px' }}
                        >
                            search
                        </span>
                        <Input
                            type="search"
                            text="Поиск"
                            onChange={(e) => setsetSearchText(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            className="button-gray2"
                            onClick={handlerfiltersCancel}
                        >
                            Все записи
                        </button>
                    </div>
                </Header>

                <Posts
                    posts={postsSearchFiltered}
                    //filterTagId={tagFilter}
                    tags={tags}
                />
            </M>
        </M2>
    )
}

const mapStateToProps = (state) => {
    const { posts } = state.posts
    return {
        posts,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllPosts: () => dispatch(postsActions.getAllPosts()),
    }
}

const connectedBlogPage = connect(mapStateToProps, mapDispatchToProps)(BlogPage)

export default connectedBlogPage
