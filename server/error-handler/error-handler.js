module.exports = function(err, req, res, next) {
    res.status(err.status).send({ error: err });
};