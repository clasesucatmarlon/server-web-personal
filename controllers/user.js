function ghetMe (req, res) {
    res.status(200).send({Status: 'OK', Message: 'Todo está OK'});
}

module.exports = {
    ghetMe
}