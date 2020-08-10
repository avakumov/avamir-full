import React, { useState } from 'react'
import { booksActions } from '../../../_actions'
import { connect } from 'react-redux'
import styled from 'styled-components'
import CategoryBooks from './categoryBooks'

const InputTitle = styled.input`
    width: 204px;
    font-weight: bold;
    font-family: 'pragmata-pro';
    border: 1px solid #ccc;
`

const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
`

const CategoriesBooks = ({
    categories,
    addCategory,
    patchCategory,
    deleteCategory,
}) => {
    const [title, setTitle] = useState('')

    const handlerAddCategory = (e) => {
        e.preventDefault()
        addCategory({ title: title })
        setTitle('')
    }

    const onHandlerChange = (e) => {
        setTitle(e.target.value)
    }

    return (
        <div>
            <form
                onSubmit={handlerAddCategory}
                id="category"
                method="post"
                encType="multipart/form-data"
            >
                <FlexRow>
                    <InputTitle
                        type="text"
                        value={title}
                        onChange={onHandlerChange}
                        id="title"
                        name="title"
                    />
                    <button type="submit" className="button-blue">
                        <span
                            className="material-icons"
                            style={{ fontSize: '15px' }}
                        >
                            add
                        </span>
                    </button>
                </FlexRow>
            </form>

            {categories
                ? categories.map((c) => (
                      <CategoryBooks
                          key={c._id}
                          category={c}
                          patchCategory={patchCategory}
                          deleteCategory={deleteCategory}
                      />
                  ))
                : 'Категорий нет'}
        </div>
    )
}

const mapStateToProps = (state) => {
    const { categories } = state.books
    return {
        categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCategory: (category) =>
            dispatch(booksActions.addCategoryBooks(category)),
        deleteCategory: (id) => dispatch(booksActions.deleteCategoryBooks(id)),
        patchCategory: (category) =>
            dispatch(booksActions.patchCategoryBooks(category)),
    }
}

const connectedCategoriesBooks = connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesBooks)

export default connectedCategoriesBooks
