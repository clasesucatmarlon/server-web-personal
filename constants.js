// CONEXIÓN CON LA BASE DE DATOS - MONGODB
const DB_USER = "marlongarcia";
const DB_PASSWORD = 'marlongarcia12345';
const DB_HOST = 'web-personal.aupl3ri.mongodb.net';

// ESTABLEVER LA VERSIÓN DE LA API
const API_VERSION = 'v1';

// ESTABLECER INFORMACIÓN DE LA IP DEL SERVIDOR
const IP_SERVER = 'localhost';

// ESTABLECER LA KEY PARA EL JSON WEB TOKEN - CUALQUIERA
const JWT_SECRET_KEY = 'personalweb'

module.exports = {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    API_VERSION,
    IP_SERVER,
    JWT_SECRET_KEY,
}