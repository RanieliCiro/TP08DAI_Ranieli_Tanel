// dotenv nos permite leer las variables que están en el archivo .env
import dotenv from 'dotenv';
dotenv.config();

// pg es el módulo que nos conecta con PostgreSQL
import pg from 'pg';
const { Pool } = pg;

// Pool = "pileta de conexiones". Maneja varias conexiones a la base al mismo tiempo.
// Los datos los lee desde el .env para no hardcodearlos acá.
const pool = new Pool({
    host:     process.env.DB_HOST,      // Dirección del servidor, ej: localhost
    port:     process.env.DB_PORT,      // Puerto de PostgreSQL, por defecto 5432
    database: process.env.DB_NAME,      // Nombre de la base de datos
    user:     process.env.DB_USER,      // Usuario de PostgreSQL
    password: process.env.DB_PASSWORD,  // Contraseña de PostgreSQL
});

// Exportamos pool para usarlo en el repository
export default pool;
