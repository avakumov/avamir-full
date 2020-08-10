const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
dotenv.config()

// connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        console.log('connected to db   ')
        if (err) console.log(err)
    }
)

// import routes
const authRoutes = require('./routes/auth')
const tasksRoutes = require('./routes/tasks')
const booksRoutes = require('./routes/books')
const postsRoutes = require('./routes/posts')
const utilsRoutes = require('./routes/utils')
const verifyToken = require('./middleware/validate-token')

// middlewares
app.use('/api/files', express.static('files'))
app.use(fileUpload({ createParentPath: true }))
app.use(express.json()) // for body parser
app.use(cors())
// route middlewares
app.use('/api/auth', authRoutes)
app.use('/api/tasks', verifyToken, tasksRoutes)
app.use('/api/books', verifyToken, booksRoutes)
app.use('/api/posts', verifyToken, postsRoutes)
app.use('/api/utils', utilsRoutes)

if (process.env.NODE_ENV === 'production') 
{
    app.use('/', express.static(path.join(__dirname,'client', 'build')))
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    })
  }
  



app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}...`))
