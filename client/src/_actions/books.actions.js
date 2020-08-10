import { booksConstants } from '../_constants'
import { booksService } from '../_services'
//import {history} from '../_helpers'

export const booksActions = {
    getAll,
    addBook,
    setMenuItemId,
    deleteCategoryBooks,
    addCategoryBooks,
    patchBook,
    deleteBook,
    patchCategoryBooks,
}

function patchBook(book) {
    return (dispatch) => {
        dispatch(request())

        booksService.patchBook(book).then(
            (book) => dispatch(success(book)),
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: booksConstants.PATCH_BOOK_REQUEST }
    }
    function success(book) {
        return { type: booksConstants.PATCH_BOOK_SUCCESS, book }
    }
    function failure(error) {
        return { type: booksConstants.PATCH_BOOK_FAILURE, error }
    }
}

function patchCategoryBooks(category) {
    return (dispatch) => {
        dispatch(request())

        booksService.patchCategory(category).then(
            (category) => dispatch(success(category)),
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: booksConstants.PATCH_CATEGORYBOOKS_REQUEST }
    }
    function success(category) {
        return { type: booksConstants.PATCH_CATEGORYBOOKS_SUCCESS, category }
    }
    function failure(error) {
        return { type: booksConstants.PATCH_CATEGORYBOOKS_FAILURE, error }
    }
}

function addCategoryBooks(category) {
    return (dispatch) => {
        dispatch(request())

        booksService.addCategoryBooks(category).then(
            (category) => dispatch(success(category)),
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: booksConstants.ADD_CATEGORY_BOOKS_REQUEST }
    }
    function success(category) {
        return { type: booksConstants.ADD_CATEGORY_BOOKS_SUCCESS, category }
    }
    function failure(error) {
        return { type: booksConstants.ADD_CATEGORY_BOOKS_FAILURE, error }
    }
}

function deleteCategoryBooks(id) {
    return (dispatch) => {
        dispatch(request())

        booksService.deleteCategoryBooks(id).then(
            (category) => dispatch(success(category)),
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: booksConstants.DELETE_CATEGORY_BOOKS_REQUEST }
    }
    function success(category) {
        return { type: booksConstants.DELETE_CATEGORY_BOOKS_SUCCESS, category }
    }
    function failure(error) {
        return { type: booksConstants.DELETE_CATEGORY_BOOKS_FAILURE, error }
    }
}

function deleteBook(id) {
    return (dispatch) => {
        dispatch(request())

        booksService.deleteBook(id).then(
            (book) => dispatch(success(book)),
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: booksConstants.DELETE_BOOK_REQUEST }
    }
    function success(book) {
        return { type: booksConstants.DELETE_BOOK_SUCCESS, book }
    }
    function failure(error) {
        return { type: booksConstants.DELETE_BOOK_FAILURE, error }
    }
}

function getAll() {
    return (dispatch) => {
        dispatch(request())
        dispatch(requestCategory())

        booksService.getAllBooks().then(
            (books) => {
                dispatch(success(books))
            },
            (error) => dispatch(failure(error))
        )

        booksService.getCategoriesBooks().then(
            (categoriesBooks) => {
                dispatch(successCategory(categoriesBooks))
            },
            (error) => dispatch(failureCategory(error))
        )
    }

    function request() {
        return { type: booksConstants.GETALL_BOOKS_REQUEST }
    }

    function requestCategory() {
        return { type: booksConstants.GETALL_CATEGORY_BOOKS_REQUEST }
    }

    function successCategory(categoriesBooks) {
        return {
            type: booksConstants.GETALL_CATEGORY_BOOKS_SUCCESS,
            categoriesBooks,
        }
    }

    function failureCategory(error) {
        return { type: booksConstants.GETALL_CATEGORY_BOOKS_FAILURE, error }
    }

    function success(books) {
        return { type: booksConstants.GETALL_BOOKS_SUCCESS, books }
    }
    function failure(error) {
        return { type: booksConstants.GETALL_BOOKS_FAILURE, error }
    }
}

function addBook(formData) {
    return (dispatch) => {
        dispatch(request())

        booksService.addBook(formData).then(
            (book) => dispatch(success(book)),
            (error) => dispatch(failure(error))
        )
    }

    function request() {
        return { type: booksConstants.ADD_BOOK_REQUEST }
    }
    function success(book) {
        return { type: booksConstants.ADD_BOOK_SUCCESS, book }
    }
    function failure(error) {
        return { type: booksConstants.ADD_BOOK_FAILURE, error }
    }
}

function setMenuItemId(id) {
    return { type: booksConstants.SET_MENU_ITEM_ID_BOOKS, id }
}
