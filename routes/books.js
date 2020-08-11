const router = require('express').Router()

const {
    bookValidation,
    categoryBooksValidation,
} = require('../middleware/validation')
const Book = require('../models/Book')
const CategoryBooks = require('../models/CategoryBooks')
const { saveCoverFromPdfToPng, deleteFile } = require('../utils')
const { FILE_PATH } = require('../settings')

const uploadBookAndImageCover = async (files, path) => {
    if (!files || Object.keys(files).length === 0) {
        throw new Error('No files were uploaded.')
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let bookFile = files.bookFile
    console.log('bookFile: ', bookFile)

    const pathPDFtoSave = `${path}/${bookFile.name}`

    // Use the mv() method to place the file somewhere on your server
    await bookFile.mv(pathPDFtoSave, function (err) {
        if (err) {
            throw new Error(`Error write file : ${err}`)
        }
    })

    const { namePngFile, pages } = await saveCoverFromPdfToPng(pathPDFtoSave)

    return {
        bookTitle: bookFile.name,
        bookPath: pathPDFtoSave,
        namePngFile,
        pages,
    }
}

router.get('/', async (req, res) => {
    try {
        const books = await Book.find({ user: req.user.id }).populate('user')

        res.json({
            books,
        })
    } catch (err) {
        console.log(err)
    }
})

router.post('/add', async (req, res) => {
    const baseDirToSave = `${FILE_PATH}/${req.user.name + '-' + req.user.id}`
    const bseDirWioutRootDot = baseDirToSave.substring(2)
    try {
        const {
            bookTitle,
            bookPath,
            namePngFile,
            pages,
        } = await uploadBookAndImageCover(req.files, baseDirToSave)

        
        if (req.body.title === '') {
            req.body['title'] = bookTitle.substring(0, bookTitle.length - 4)
        }
        req.body['bookPath'] = bookPath.substring(2)
        req.body['coverPath'] = `${bseDirWioutRootDot}/${namePngFile}`
        req.body['allPages'] = pages

        //validation
        const { error } = bookValidation(req.body)
        if (error)
            return res.status(422).json({ error: error.details[0].message })

        const isBookExist = await Book.findOne({
            title: req.body.title,
            user: req.user.id,
        })

        if (isBookExist)
            return res.status(400).json({ error: 'Книга с таким названием уже существует.' })

        const book = new Book({
            title: req.body.title,
            user: req.user.id,
            bookPath: req.body.bookPath,
            coverPath: req.body.coverPath,
            category: req.body.category,
            allPages: req.body.allPages,
        })

        const savedBook = await book.save()
        res.json({ book: savedBook })
    } catch (err) {
        console.log(err)
        res.status(422).json({error: "Возможно вы не прикрепили pdf файл"})
    }
})

router.patch('/book', async (req, res) => {
    try {
        const book = await Book.findOne({ _id: req.body._id })
        book.readedPages = req.body.readedPages
        book.title = req.body.title
        const savedBook = await book.save()
        res.json({ book: savedBook })
    } catch (err) {
        console.log(err)
    }
})

router.patch('/category', async (req, res) => {
    try {
        const category = await CategoryBooks.findOne({ _id: req.body._id })
        category.title = req.body.title
        const savedCategory = await category.save()
        res.json({ category: savedCategory })
    } catch (err) {
        console.log(err)
    }
})

router.post('/delete', async (req, res) => {
    try {
        const deletedBook = await Book.findOneAndDelete({
            _id: req.body.id,
            user: req.user.id,
        })
        res.json({ book: deletedBook })
        deleteFile(deletedBook.bookPath)
        deleteFile(deletedBook.coverPath)
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

router.get('/categories', async (req, res) => {
    try {
        const categories = await CategoryBooks.find({
            user: req.user.id,
        }).populate('user')

        res.json({
            categories,
        })
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

router.post('/addCategory', async (req, res) => {
    try {
        const { error } = categoryBooksValidation(req.body)
        if (error)
            return res.status(422).json({ error: error.details[0].message })

        const isCategoryExist = await CategoryBooks.findOne({
            title: req.body.title,
            user: req.user.id,
        })

        if (isCategoryExist)
            return res.status(400).json({ error: 'Category already exists' })

        const category = new CategoryBooks({
            title: req.body.title,
            user: req.user.id,
        })

        const savedCategory = await category.save()
        res.json({ category: savedCategory })
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

router.post('/delete-category', async (req, res) => {
    try {
        const deletedCategory = await CategoryBooks.findByIdAndDelete({
            _id: req.body.id,
        })
        res.json({ category: deletedCategory })
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

module.exports = router
