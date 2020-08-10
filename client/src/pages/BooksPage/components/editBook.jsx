import React, { useState } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { booksActions } from '../../../_actions'
import { API_URL } from '../../../constants'

const M = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    justify-content: space-between;
`
const Pages = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const InputPages = styled.input`
    width: 40px;
    font-family: 'pragmata-pro';
`
const InputTitle = styled.input`
    width: 180px;
    font-weight: bold;
    font-family: 'pragmata-pro';
`

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const EditBook = ({ deleteBook, book, patchBook, setEditBook }) => {
    const [pages, setPages] = useState(book.readedPages)
    const [title, setTitle] = useState(book.title)

    const handlerChangePages = (e) => {
        setPages(e.target.value)
        patchBook({ ...book, readedPages: e.target.value })
    }

    const handlerChangeTitle = (e) => {
        setTitle(e.target.value)
        patchBook({ ...book, title: e.target.value })
    }

    const handlerDeleteBook = (id) => {
        deleteBook(id)
    }
    return (
        <M className="paper">
            <img
                src={`${API_URL}/${book.coverPath}`}
                alt={book.title}
                width="150"
                height="250"
            />
            <InputTitle
                type="text"
                value={title}
                onChange={handlerChangeTitle}
            />
            <br />
            <Pages>
                <InputPages
                    type="number"
                    value={pages}
                    onChange={handlerChangePages}
                />
                /{book.allPages} страниц
            </Pages>
            <br />
            <Buttons>
                <button
                    className="button-gray2"
                    onClick={() => setEditBook(false)}
                >
                    Сохранить
                </button>
                <button
                    className="button-danger"
                    onClick={() => handlerDeleteBook(book._id)}
                >
                    <span
                        className="material-icons"
                        style={{ fontSize: '15px' }}
                    >
                        delete_outline
                    </span>
                </button>
            </Buttons>
        </M>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        patchBook: (book) => dispatch(booksActions.patchBook(book)),
        deleteBook: (id) => dispatch(booksActions.deleteBook(id)),
    }
}

const connectedEditBook = connect(null, mapDispatchToProps)(EditBook)

export default connectedEditBook
