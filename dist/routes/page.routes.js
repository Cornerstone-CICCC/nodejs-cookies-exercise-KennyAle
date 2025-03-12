"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const pageRouter = (0, express_1.Router)();
const users = [
    { id: '123', username: 'test', password: 'test' },
    { id: '1234', username: 'test2', password: 'test2' }
];
pageRouter.get('/', (req, res) => {
    res.status(200).render('index');
});
pageRouter.get('/login', (req, res) => {
    res.status(200).render('login');
});
pageRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        res.status(404).redirect('login');
        return;
    }
    res.cookie('isLoggedIn', true, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: true
    });
    res.status(200).redirect('profile');
});
pageRouter.get('/profile', auth_middleware_1.checkAuth, (req, res) => {
    res.status(200).render('profile');
});
pageRouter.get('/logout', (req, res) => {
    res.clearCookie('isLoggedIn');
    res.status(301).redirect('/login');
});
exports.default = pageRouter;
