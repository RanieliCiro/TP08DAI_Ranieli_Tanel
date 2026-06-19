// El Repository es el único lugar de la app que habla con la base de datos.
// Usamos try/catch en cada función para atrapar errores de SQL y registrarlos.

import pool      from '../configs/db-config.js';
import LogHelper from '../helpers/log-helper.js';


// ─────────────────────────────────────────────
// Trae TODAS las provincias de la tabla
// ─────────────────────────────────────────────
export async function getAll() {
    try {

        const resultado = await pool.query('SELECT * FROM provinces ORDER BY id');
        return resultado.rows; // Array con todas las filas

    } catch (error) {
        LogHelper.logError(error); // Guardamos el error en el archivo de log
        throw error;               // Relanzamos el error para que lo maneje el controller
    }
}


// ─────────────────────────────────────────────
// Trae UNA provincia según su id
// ─────────────────────────────────────────────
export async function getById(id) {
    try {

        // $1 es un placeholder que PostgreSQL reemplaza con el valor de [id]
        const resultado = await pool.query('SELECT * FROM provinces WHERE id = $1', [id]);

        if (resultado.rows[0]) {
            return resultado.rows[0]; // Encontró la provincia
        } else {
            return null; // No encontró ninguna con ese id
        }

    } catch (error) {
        LogHelper.logError(error);
        throw error;
    }
}


// ─────────────────────────────────────────────
// Inserta una nueva provincia
// ─────────────────────────────────────────────
export async function create(data) {
    try {

        const resultado = await pool.query(
            // RETURNING * le dice a PostgreSQL que nos devuelva la fila que acaba de crear
            `INSERT INTO provinces (name, full_name, latitude, longitude, display_order)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [data.name, data.full_name, data.latitude, data.longitude, data.display_order]
        );

        return resultado.rows[0]; // La provincia recién creada con su nuevo id

    } catch (error) {
        LogHelper.logError(error);
        throw error;
    }
}


// ─────────────────────────────────────────────
// Actualiza una provincia existente
// ─────────────────────────────────────────────
export async function update(data) {
    try {

        const resultado = await pool.query(
            `UPDATE provinces
             SET name=$1, full_name=$2, latitude=$3, longitude=$4, display_order=$5
             WHERE id=$6 RETURNING *`,
            [data.name, data.full_name, data.latitude, data.longitude, data.display_order, data.id]
        );

        if (resultado.rows[0]) {
            return resultado.rows[0]; // Provincia actualizada
        } else {
            return null; // No existía ese id
        }

    } catch (error) {
        LogHelper.logError(error);
        throw error;
    }
}


// ─────────────────────────────────────────────
// Elimina una provincia por id
// ─────────────────────────────────────────────
export async function deleteById(id) {
    try {

        const resultado = await pool.query(
            'DELETE FROM provinces WHERE id=$1 RETURNING *',
            [id]
        );

        if (resultado.rows[0]) {
            return resultado.rows[0]; // La provincia que se eliminó
        } else {
            return null; // No existía ese id
        }

    } catch (error) {
        LogHelper.logError(error);
        throw error;
    }
}
