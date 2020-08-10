import axios from 'axios'

import { API_URL } from '../constants'
import { authHeader } from '../_helpers'

export const booksService = {
    getAllBooks,
    addBook,
    getCategoriesBooks,
    addCategoryBooks,
    deleteCategoryBooks,
    patchBook,
    deleteBook,
    patchCategory,
}

function getAllBooks() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }

    return fetch(`${API_URL}/books`, requestOptions).then(handleResponse)
}

function getCategoriesBooks() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }

    return fetch(`${API_URL}/books/categories`, requestOptions).then(
        handleResponseCategories
    )
}

function addBook(formData) {
    let config = {
        headers: authHeader(),
    }
    return axios.post(`${API_URL}/books/add`, formData, config).then((res) => {
        const book = res.data.book
        return book
    })
}

function patchBook(book) {
    let config = {
        headers: authHeader(),
    }
    return axios.patch(`${API_URL}/books/book`, book, config).then((res) => {
        const book = res.data.book
        return book
    })
}

function patchCategory(category) {
    let config = {
        headers: authHeader(),
    }
    return axios
        .patch(`${API_URL}/books/category`, category, config)
        .then((res) => {
            const category = res.data.category
            return category
        })
}

function addCategoryBooks(formData) {
    let config = {
        headers: authHeader(),
    }
    return axios
        .post(`${API_URL}/books/addCategory`, formData, config)
        .then((res) => {
            const category = res.data.category
            return category
        })
}

function deleteCategoryBooks(id) {
    let config = {
        headers: authHeader(),
    }

    let data = {
        id,
    }
    return axios
        .post(`${API_URL}/books/delete-category`, data, config)
        .then((res) => {
            const category = res.data.category
            return category
        })
}

function deleteBook(id) {
    let config = {
        headers: authHeader(),
    }

    let data = {
        id,
    }
    return axios.post(`${API_URL}/books/delete`, data, config).then((res) => {
        const book = res.data.book
        return book
    })
}

function handleResponse(response) {
    return response.text().then((text) => {
        const { books } = text && JSON.parse(text)

        return books
    })
}

function handleResponseCategories(response) {
    return response.text().then((text) => {
        const { categories } = text && JSON.parse(text)

        return categories
    })
}
