import React, { useState } from 'react'
import styled from 'styled-components'

const Category = styled.div`
    display: flex;
    flex-direction: row;
`
const InputTitle = styled.input`
    width: 203px;
    font-weight: bold;
    font-family: 'pragmata-pro';
    border: 1px solid #ccc;
`

const CategoryTitle = styled.div`
    margin: auto;
    font-weight: bold;
    text-align: center;
`

const CategoryBooks = ({ category, patchCategory, deleteCategory }) => {
    const [title, setTitle] = useState(category.title)
    const [edit, setEdit] = useState(false)

    const handlerChangeCategoryTitle = (e) => {
        setTitle(e.target.value)
    }

    const patchCategoryBooks = () => {
        patchCategory({ ...category, title: title })
        setEdit(false)
    }

    return (
        <Category key={category._id}>
            {edit ? (
                <InputTitle
                    type="text"
                    value={title}
                    onChange={handlerChangeCategoryTitle}
                />
            ) : (
                <CategoryTitle style={{ width: '210px' }}>
                    {category.title}
                </CategoryTitle>
            )}
            {edit ? (
                <button className="button-gray2" onClick={patchCategoryBooks}>
                    <span
                        className="material-icons"
                        style={{ fontSize: '15px' }}
                    >
                        save
                    </span>
                </button>
            ) : (
                <button className="button-gray2" onClick={() => setEdit(true)}>
                    <span
                        className="material-icons"
                        style={{ fontSize: '15px' }}
                    >
                        edit
                    </span>
                </button>
            )}

            <button
                className="button-danger"
                onClick={() => deleteCategory(category._id)}
            >
                <span className="material-icons" style={{ fontSize: '15px' }}>
                    delete_outline
                </span>
            </button>
        </Category>
    )
}

export default CategoryBooks
