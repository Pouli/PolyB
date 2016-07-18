'use strict';

module.exports = (router) => {
    router.get('/user', (req, res, next) => {
        // res.send([{name: 'Pouli'}, {name: 'Blabla'}]);
        var err = new Error();
        err.status = 404;
        next(err);
    });

    router.get('/user/:id', (req, res) => {
        res.send({name: 'Pouli'});
    });

    router.post('/user', (req, res) => {
        const message = req.body;
        res.status(200).json({message: 'User added', user: {name: message.name}});
    });

    router.delete('/user/:id', (req, res) => {
        res.send('User random was deleted');
    });
};