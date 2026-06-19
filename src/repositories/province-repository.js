import pool      from '../configs/db-config.js';
import LogHelper from '../helpers/log-helper.js';

export async function getAll() {
    try {
        const resultado = await pool.query('SELECT * FROM provinces ORDER BY id');
        return resultado.rows;
    } catch (error) {
        LogHelper.logError(error);
        throw error;
    }
}

export async function getById(id) {
    try {
        const resultado = await pool.query('SELECT * FROM provinces WHERE id = $1', [id]);

        if (resultado.rows[0]) {
            return resultado.rows[0];
        } else {
            return null;
        }
    } catch (error) {
        LogHelper.logError(error);
        throw error;
    }
}

export async function create(data) {
    try {
        const resultado = await pool.query(
            `INSERT INTO provinces (name, full_name, latitude, longitude, display_order)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [data.name, data.full_name, data.latitude, data.longitude, data.display_order]
        );
        return resultado.rows[0];
    } catch (error) {
        LogHelper.logError(error);
        throw error;
    }
}

export async function update(data) {
    try {
        const resultado = await pool.query(
            `UPDATE provinces
             SET name=$1, full_name=$2, latitude=$3, longitude=$4, display_order=$5
             WHERE id=$6 RETURNING *`,
            [data.name, data.full_name, data.latitude, data.longitude, data.display_order, data.id]
        );

        if (resultado.rows[0]) {
            return resultado.rows[0];
        } else {
            return null;
        }
    } catch (error) {
        LogHelper.logError(error);
        throw error;
    }
}

export async function deleteById(id) {
    try {
        const resultado = await pool.query(
            'DELETE FROM provinces WHERE id=$1 RETURNING *',
            [id]
        );

        if (resultado.rows[0]) {
            return resultado.rows[0];
        } else {
            return null;
        }
    } catch (error) {
        LogHelper.logError(error);
        throw error;
    }
}
