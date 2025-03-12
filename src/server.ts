import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import pageRouter from './routes/page.routes'
import path from 'path'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()

app.use(cookieParser(process.env.COOKIE_SECRET_KEY)) // The KEY is: 10000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', pageRouter)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../src/views'))

app.use((req: Request, res: Response) => {
    res.status(404).render('404')
})

const PORT = process.env.PORT || 3500
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
