import { Router, Request, Response } from "express";
import { checkAuth } from "../middleware/auth.middleware";
import { User } from "../types/user.td";

const pageRouter = Router()


const users: User[] = [
    { id: '123', username: 'test', password: 'test' },
    { id: '1234', username: 'test2', password: 'test2' }
]

pageRouter.get('/', (req: Request, res: Response) => {
    res.status(200).render('index')
})

pageRouter.get('/login', (req: Request, res: Response) => {
    res.status(200).render('login')
})

pageRouter.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username && u.password === password)
    if(!user) {
        res.status(404).redirect('login')
        return
    }
    res.cookie('isLoggedIn', true, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: true
    })
    res.status(200).redirect('profile')
})

pageRouter.get('/profile', checkAuth, (req: Request, res: Response) => {
    res.status(200).render('profile')
})

pageRouter.get('/logout', (req: Request, res: Response) => {
    res.clearCookie('isLoggedIn')
    res.status(301).redirect('/login')
})

export default pageRouter