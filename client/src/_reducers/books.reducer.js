import { booksConstants } from '../_constants'

const initState = {
    books: [],
    categories: [],
    activeMenuItemId: 0,
}

export function books(state = initState, action) {
    switch (action.type) {
        case booksConstants.GETALL_BOOKS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case booksConstants.GETALL_BOOKS_SUCCESS:
            return {
                ...state,
                books: action.books,
                loading: false,
            }
        case booksConstants.GETALL_BOOKS_FAILURE:
            return {
                ...state,
                getAllBookError: action.error,
                loading: false,
            }
        case booksConstants.ADD_BOOK_REQUEST:
            return {
                ...state,
                addingBook: true,
            }
        case booksConstants.ADD_BOOK_SUCCESS:
            return {
                ...state,
                addingBook: false,
                books: [...state.books, action.book],
            }
        case booksConstants.ADD_BOOK_FAILURE:
            return {
                ...state,
                addBookError: action.error,
                addingBook: false,
            }
        case booksConstants.SET_MENU_ITEM_ID_BOOKS:
            return {
                ...state,
                activeMenuItemId: action.id,
            }
        case booksConstants.GETALL_CATEGORY_BOOKS_REQUEST:
            return {
                ...state,
                loadingCategory: true,
            }

        case booksConstants.GETALL_CATEGORY_BOOKS_SUCCESS:
            return {
                ...state,
                loadingCategory: false,
                categories: action.categoriesBooks,
            }
        case booksConstants.GETALL_CATEGORY_BOOKS_FAILURE:
            return {
                ...state,
                loadingCategory: false,
                getAllCategoriesError: action.error,
            }
        case booksConstants.ADD_CATEGORY_BOOKS_REQUEST:
            return {
                ...state,
                addingCategory: true,
            }
        case booksConstants.ADD_CATEGORY_BOOKS_SUCCESS:
            return {
                ...state,
                addingCategory: false,
                categories: [...state.categories, action.category],
            }
        case booksConstants.ADD_CATEGORY_BOOKS_FAILURE:
            return {
                ...state,
                addingCategory: false,
                addCategoryError: action.error,
            }
        case booksConstants.DELETE_CATEGORY_BOOKS_REQUEST:
            return {
                ...state,
                deletingCategory: true,
            }
        case booksConstants.DELETE_CATEGORY_BOOKS_SUCCESS:
            return {
                ...state,
                deletingCategory: false,
                categories: state.categories.filter(
                    (c) => c._id !== action.category._id
                ),
            }
        case booksConstants.DELETE_CATEGORY_BOOKS_FAILURE:
            return {
                ...state,
                deletingCategory: false,
                deleteCategoryError: action.error,
            }
        case booksConstants.PATCH_BOOK_REQUEST:
            return {
                ...state,
                patchingBook: true,
            }
        case booksConstants.PATCH_BOOK_SUCCESS:
            const copyBooks = [...state.books]
            const index = copyBooks.findIndex(
                (book) => book._id === action.book._id
            )
            copyBooks[index] = action.book
            return {
                ...state,
                patchingBook: false,
                books: copyBooks,
            }
        case booksConstants.PATCH_BOOK_FAILURE:
            return {
                ...state,
                patchingBook: false,
                patchingBookError: action.error,
            }

        case booksConstants.PATCH_CATEGORYBOOKS_REQUEST:
            return {
                ...state,
                patchingCategoryBooks: true,
            }
        case booksConstants.PATCH_CATEGORYBOOKS_SUCCESS:
            const copyCategories = [...state.categories]
            const idx = copyCategories.findIndex(
                (c) => c._id === action.category._id
            )
            copyCategories[idx] = action.category
            return {
                ...state,
                patchingCategoryBooks: false,
                categories: copyCategories,
            }
        case booksConstants.PATCH_CATEGORYBOOKS_FAILURE:
            return {
                ...state,
                patchingCategoryBooks: false,
                patchingCategoryBooksError: action.error,
            }

        case booksConstants.DELETE_BOOK_REQUEST:
            return {
                ...state,
                deletingBook: true,
            }
        case booksConstants.DELETE_BOOK_SUCCESS:
            return {
                ...state,
                deletingBook: false,
                books: [
                    ...state.books.filter(
                        (book) => book._id !== action.book._id
                    ),
                ],
            }
        case booksConstants.DELETE_BOOK_FAILURE:
            return {
                ...state,
                deletingBook: false,
                deletingBookError: action.error,
            }
        default:
            return state
    }
}
