import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Navbar from '../../components/navbar/navbar'
import ContentBooks from './components/contentBooks'
import { menuItems } from './constants'
import { booksActions } from '../../_actions'

const M = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
`

const Books = ({ categories, getAll, activeMenuItemId, setMenuItemId }) => {
    useEffect(() => {
        getAll()
        setMenuItemId('0')
    }, [getAll, setMenuItemId])

    const getMenuWithCategories = (items, categories) => {
        const changedCategories = categories.map((category) => {
            return { title: category.title, _id: category._id }
        })
        return [
            ...items.slice(0, 1),
            ...changedCategories,
            ...items.slice(1, 3),
        ]
    }

    return (
        <M>
            <Navbar
                menuItems={getMenuWithCategories(menuItems, categories)}
                setMenuItemId={setMenuItemId}
                activeMenuItemId={activeMenuItemId}
                direction="column"
                colorActiveItem="purple"
                colorActiveItemText="white"
            />
            <ContentBooks />
        </M>
    )
}
const mapStateToProps = (state) => {
    const { books, activeMenuItemId, categories } = state.books
    return {
        books,
        activeMenuItemId,
        categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAll: () => dispatch(booksActions.getAll()),
        setMenuItemId: (id) => dispatch(booksActions.setMenuItemId(id)),
    }
}

const connectedBooks = connect(mapStateToProps, mapDispatchToProps)(Books)
export default connectedBooks
