//main URL API
//export const API_URL = 'http://localhost:5000'
export const API_URL = process.env.REACT_APP_API_URL

//main MENU items
export const MENU_ITEMS = [
    { to: '/blog', title: 'Блог', id: '2' },
    { to: '/', title: 'Книги', id: '0' },
    { to: '/sapper-page', title: 'Сапер(игра)', id: '1' },
]
