const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth')

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    //console.log(req.body);
    const { name_book, author, date_public, information } = req.body;
    const newLink = {
        name_book,
        author,
        date_public,
        information,
        users_idusers: req.user.idusers
    };
    //console.log(newLink);
    await pool.query('INSERT INTO favorite_books set ?', [newLink]);
    req.flash('success', 'Libro guardado correctamente');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM favorite_books WHERE users_idusers = ?', [req.user.idusers]);
    console.log(links);
    res.render('links/list', {links});
});

router.get('/delete/:idbooks', isLoggedIn, async (req, res) =>{
    const { idbooks } = req.params;
    await pool.query('DELETE FROM favorite_books WHERE idbooks = ?', [idbooks]);
    req.flash('success', 'Datos eliminados correctamente');
    res.redirect('/links');
});

router.get('/edit/:idbooks', isLoggedIn, async (req, res) => {
    const { idbooks } = req.params;
    const links = await pool.query('SELECT * FROM favorite_books WHERE idbooks = ?', [idbooks]);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:idbooks', isLoggedIn, async (req, res) => {
    const { idbooks } = req.params;
    const { name_book, author, date_public, information } = req.body;
    const newLink = {
        name_book,
        author,
        date_public,
        information
    };
    await pool.query('UPDATE favorite_books set ? WHERE idbooks = ?', [newLink, idbooks]);
    req.flash('success', 'Cambios guradados correctamente');
    res.redirect('/links');
});

module.exports = router;