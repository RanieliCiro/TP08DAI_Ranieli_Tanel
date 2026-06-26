import pool      from '../configs/db-config.js';
import LogHelper from '../helpers/log-helper.js';
import { Province } from '../entities/province.js';

export async function getAll() {
    try {
        const resultado = await pool.query('SELECT * FROM provinces ORDER BY id');

        const provinces = resultado.rows.map(row => {
            return new Province(row.id, row.name, row.full_name, row.latitude, row.longitude, row.display_order);
        });

        return provinces;
    } catch (error) {
        LogHelper.logError(error);
        throw error;
    }
}

export async function getById(id) {
    try {
        const resultado = await pool.query('SELECT * FROM provinces WHERE id = $1', [id]);

        if (resultado.rows.length === 0) {
            return null;
        }

        const row = resultado.rows[0];
        return new Province(row.id, row.name, row.full_name, row.latitude, row.longitude, row.display_order);
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

        const row = resultado.rows[0];
        return new Province(row.id, row.name, row.full_name, row.latitude, row.longitude, row.display_order);
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

        if (resultado.rows.length === 0) {
            return null;
        }

        const row = resultado.rows[0];
        return new Province(row.id, row.name, row.full_name, row.latitude, row.longitude, row.display_order);
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

        if (resultado.rows.length === 0) {
            return null;
        }

        const row = resultado.rows[0];
        return new Province(row.id, row.name, row.full_name, row.latitude, row.longitude, row.display_order);
    } catch (error) {
        LogHelper.logError(error);
        throw error;
    }
}
