import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Loading from '../../../components/loading/Loading'
import { booksActions } from '../../../_actions'

const M = styled.div`
    background-color: white;
`
const InputSelect = styled.select`
    font-weight: bold;
    font-family: 'pragmata-pro';
    border: 1px solid #ccc;
    background-color: white;
    height: 30px;
`

const InputBook = styled.input`
    display: none;
`

const InputTitle = styled.input`
    width: 203px;
    font-weight: bold;
    font-family: 'pragmata-pro';
    border: 1px solid #ccc;
`
const LabelFile = styled.label`
    font-family: 'pragmata-pro';
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
`

const UploadBook = ({ categories, addBook, addingBook, setMenuItemId }) => {
    const [file, setFile] = useState({ title: '', filename: null })

    const titleRef = useRef('')

    const handleUploadFIle = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        formData.set('title', file.title)
        addBook(formData)
        setMenuItemId('0')
    }

    const handlerFileSelected = () => {
        const filename = refFile.current.files[0].name
        setFile({
            title: filename.substring(0, filename.length - 4),
            filename: filename,
        })
        //setTitle(filename.substring(0, title.length - 4))
    }

    const handleChangeTitle = (e) => {
        setFile((prev) => ({ ...prev, title: titleRef.current.value }))
    }

    const refFile = useRef(null)

    if (!categories || categories.length === 0) {
        return <div>Добавьте сначала категорию</div>
    }

    if (addingBook || !categories) return <Loading />
    return (
        <M>
            <form
                onSubmit={handleUploadFIle}
                id="uploadForm"
                method="post"
                encType="multipart/form-data"
            >
                <table>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'right' }}>
                                {file.filename
                                    ? file.filename
                                    : 'Файл не выбран'}
                            </td>
                            <td>
                                {' '}
                                <LabelFile htmlFor="bookFile">
                                    Выбрать файл(pdf)...
                                </LabelFile>
                                <InputBook
                                    id="bookFile"
                                    type="file"
                                    accept="application/pdf"
                                    name="bookFile"
                                    ref={refFile}
                                    onChange={handlerFileSelected}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right' }}>
                                <label htmlFor="category">
                                    Выберите категорию{' '}
                                </label>
                            </td>
                            <td>
                                <InputSelect id="category" name="category">
                                    {categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.title}
                                        </option>
                                    ))}
                                </InputSelect>
                            </td>
                        </tr>

                        <tr>
                            <td style={{ textAlign: 'right' }}>
                                {' '}
                                <label htmlFor="title">Название</label>{' '}
                            </td>
                            <td>
                                <InputTitle
                                    type="text"
                                    id="title"
                                    value={file.title}
                                    name="title"
                                    ref={titleRef}
                                    onChange={handleChangeTitle}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button type="submit" className="button-blue">
                                    Загрузить
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </M>
    )
}

const mapStateToProps = (state) => {
    const { addingBook, categories } = state.books
    return {
        addingBook,
        categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addBook: (bookForm) => dispatch(booksActions.addBook(bookForm)),
        setMenuItemId: (id) => dispatch(booksActions.setMenuItemId(id)),
    }
}

const connectedUploadBook = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadBook)

export default connectedUploadBook
