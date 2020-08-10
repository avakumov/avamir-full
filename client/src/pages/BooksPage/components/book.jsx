import React, { useState } from 'react'
import { connect } from 'react-redux'
import { booksActions } from '../../../_actions'
import EditBook from './editBook'
import CardBook from './cardBook'

const Book = ({ deleteBook, book, patchBook }) => {
    const [edit, setEdit] = useState(false)

    const setEditBook = (value) => {
        setEdit(value)
    }

    if (edit)
        return (
            <EditBook
                deleteBook={deleteBook}
                patchBook={patchBook}
                book={book}
                setEditBook={setEditBook}
            />
        )
    return (
        <CardBook patchBook={patchBook} book={book} setEditBook={setEditBook} />
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        patchBook: (book) => dispatch(booksActions.patchBook(book)),
        deleteBook: (id) => dispatch(booksActions.deleteBook(id)),
    }
}

const connectedBook = connect(null, mapDispatchToProps)(Book)

export default connectedBook
