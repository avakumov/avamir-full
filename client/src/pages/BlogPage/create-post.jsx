import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js'
import { connect } from 'react-redux'

import { postsActions } from '../../_actions'
import { getTags } from './utils/utils'

const M = styled.div`
    display: flex;
    flex-direction: row;
    width: 1250px;
    margin: 1rem auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
`

const PostHTML = styled.div`
    width: 550px;
`
const Message = styled.div`
    padding: 0.5rem;
    color: gray;
`

const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
    width: 600px;
`

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    margin-top: 1rem;
`
const InputWithButton = styled.div`
    display: flex;
    padding-left: 0.5rem;
`

const Tag = styled.div`
    padding: 2px 0.5rem 2px 0.5rem;
    border: 2px solid;
    border-color: ${(props) => (props.selected ? 'green' : 'gray')};
    background-color: ${(props) => (props.color ? props.color : 'lightgray')};
    border-radius: 5px;
    margin: 0.3rem;
    cursor: pointer;
    box-shadow: ${(props) =>
        props.selected ? '0 0 5px green' : '0 0 0px gray'};
`
const Textarea = styled.textarea`
    height: 500px;
    width: 550px;
    padding: 1rem;
    border: 1px solid gray;
    margin-bottom: 1rem;

    &:focus {
        outline: none !important;
        border: 1px solid red;
        box-shadow: 0 0 5px #719ece;
        background-color: lightyellow;
    }
`

const Input = styled.input`
    width: 150px;
    font-weight: bold;
    font-family: 'pragmata-pro';
    border: 1px solid #ccc;
    padding-left: 0.3rem;
`
const PLACEHOLDER_NEW_TAG = 'Новый тег'
const HEADER_NEW_POST_MD = 'Markdown текст нового поста'
const HEADER_NEW_POST_HTML = 'Текст поста'
const PLACEHOLDER_MARKDOWN_TEXAREA =
    'Введите текст новой записи в формате markdown'
const TAGS_HELP_MESSAGE =
    'Выберите теги для своей записи. Также можете добавить свои.'

const CreatePost = ({ addPost, posts, getAllPosts }) => {
    const [text, setText] = useState('')
    const [allTags, setAllTags] = useState([])
    const [titleTag, setTitleTag] = useState('')
    const [selectedTags, setselectedTags] = useState([])

    const refInputTag = React.createRef()
    useEffect(getAllPosts, [])
    useEffect(() => setAllTags(getTags(posts)), [posts])

    const handleAddPost = () => {
        addPost({
            content: text,
            tags: selectedTags,
        })
    }

    const hahdlerChange = (e) => {
        setText(e.target.value)
    }
    const handlerChangeTitleTag = (e) => {
        setTitleTag(e.target.value)
    }

    const addTagtoAll = (tag) => {
        const index = allTags.findIndex((t) => t.title === tag.title)
        if (index < 0) {
            setAllTags((prev) => [...prev, tag])
        } else {
            setAllTags((prev) => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1),
            ])
        }
    }

    const handlerKeyPress = (e) => {
        if (e.key === 'Enter' && titleTag !== '') {
            addTag(titleTag)
            e.target.value = ''
        }
    }
    const addTag = (title) => {
        const tagExist = allTags.find((tag) => tag.title === title)
        if (tagExist) return
        const newTag = { title: title }
        addToSelectedTags(newTag)
        addTagtoAll(newTag)
        setTitleTag('')
    }

    const hadlerClickAddTag = () => {
        if (refInputTag.current.value === '') return
        addTag(titleTag)
        refInputTag.current.value = ''
    }
    useEffect(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block)
        })
    }, [text])

    const addToSelectedTags = (tag) => {
        const index = selectedTags.findIndex((t) => t.title === tag.title)
        if (index < 0) {
            setselectedTags((prev) => [...prev, tag])
        } else {
            setselectedTags((prev) => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1),
            ])
        }
    }

    const getTagsView = (tags) => {
        const tagsMaped = tags.map((tag) => {
            let selected = false
            if (selectedTags.find((t) => t.title === tag.title)) {
                selected = true
            }
            return (
                <Tag
                    selected={selected}
                    color={tag.color}
                    key={tag.title}
                    onClick={() => addToSelectedTags(tag)}
                >
                    {tag.title}
                </Tag>
            )
        })
        return (
            <Tags>
                {tagsMaped}

                <InputWithButton>
                    <Input
                        placeholder={PLACEHOLDER_NEW_TAG}
                        ref={refInputTag}
                        onChange={handlerChangeTitleTag}
                        onKeyUp={handlerKeyPress}
                    />{' '}
                    <button
                        onClick={hadlerClickAddTag}
                        type="submit"
                        className="button-blue"
                    >
                        <span
                            className="material-icons"
                            style={{ fontSize: '15px' }}
                        >
                            add
                        </span>
                    </button>
                </InputWithButton>
            </Tags>
        )
    }

    return (
        <M className="paper">
            <Column>
                <Message>{HEADER_NEW_POST_MD}</Message>
                <Textarea
                    placeholder={PLACEHOLDER_MARKDOWN_TEXAREA}
                    name="text"
                    value={text}
                    onChange={hahdlerChange}
                />
                <Message>{TAGS_HELP_MESSAGE}</Message>
                {getTagsView(allTags)}
                <button className="button-gray2" onClick={handleAddPost}>
                    Добавить пост
                </button>
            </Column>
            <Column>
                <Message>{HEADER_NEW_POST_HTML}</Message>
                <PostHTML>
                    <ReactMarkdown source={text} />

                    <Tags>
                        {selectedTags.map((t) => (
                            <Tag key={t.title}>{t.title}</Tag>
                        ))}
                    </Tags>
                </PostHTML>
            </Column>
        </M>
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
        addPost: (post) => dispatch(postsActions.addPost(post)),
        getAllPosts: () => dispatch(postsActions.getAllPosts()),
    }
}

const connectedCreatePost = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreatePost)

export default connectedCreatePost
