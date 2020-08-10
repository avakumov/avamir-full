import React, { useState } from 'react'
import styled from 'styled-components'
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

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const Title = styled.div`
    font-weight: bold;
    text-align: center;
`

const CardBook = ({ book, patchBook, setEditBook }) => {
    const [pages, setPages] = useState(book.readedPages)

    const handlerChangePages = (e) => {
        setPages(e.target.value)
        patchBook({ ...book, readedPages: e.target.value })
    }

    const handlerOpenBookToRead = () => {
        window.open(
            `${API_URL}/${book.bookPath}#page=${book.readedPages}`,
            '_blank'
        )
    }

    return (
        <M className="paper">
            <img
                src={`${API_URL}/${book.coverPath}`}
                alt={book.title}
                width="150"
                height="250"
            />
            <Title>{book.title}</Title>
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
                <button className="button-blue" onClick={handlerOpenBookToRead}>
                    Читать
                </button>

                <button className="button-gray2" onClick={setEditBook}>
                    Редактировать
                </button>
            </Buttons>
        </M>
    )
}

export default CardBook
