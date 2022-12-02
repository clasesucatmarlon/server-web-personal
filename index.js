const mongoose = require('mongoose');
const app = require('./app');
const { DB_USER, DB_PASSWORD, DB_HOST, API_VERSION, IP_SERVER } = require('./constants');

const PORT = process.env.PORT || 3977;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`, (error) => {
    if (error) {
        throw error
    }
    console.log('Conexión con la ***BASE DE DATOS*** exitosa...');
    app.listen(PORT, () => {
        console.log(`Servidor funcionando en el puerto ${PORT}`);
        console.log(`Ruta: http://${IP_SERVER}:${PORT}/api/${API_VERSION}/ `);
    })
});