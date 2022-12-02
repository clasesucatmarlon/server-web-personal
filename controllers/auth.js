function register (req, res) {
    console.log('*'.repeat(60))
    console.log('Se está ejecutando REGISTER correctamente...');
    res.status(200).send({ message: 'TODO ESTA OK.....'} );
};

module.exports = {
    register
};