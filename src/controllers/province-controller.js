// El Controller maneja los pedidos HTTP.
// Recibe el request, llama al service, y manda la response.

import { Router } from 'express';
import * as service from '../services/province-service.js';

const router = Router();


// ─────────────────────────────────────────────
// GET /api/province  →  devuelve todas las provincias
// ─────────────────────────────────────────────
router.get('/', async (_req, res) => {
    try {

        const provinces = await service.getAll();
        res.status(200).json(provinces); // 200 = OK

    } catch (err) {
        res.status(500).json({ message: err.message }); // 500 = Error interno del servidor
    }
});


// ─────────────────────────────────────────────
// GET /api/province/:id  →  devuelve una provincia
// El :id viene en la URL, ej: /api/province/5
// ─────────────────────────────────────────────
router.get('/:id', async (req, res) => {
    try {

        const id = req.params.id; // Leemos el id de la URL
        const province = await service.getById(id);

        if (!province) {
            res.status(404).json({ message: 'Province not found' }); // 404 = No encontrado
            return;
        }

        res.status(200).json(province);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ─────────────────────────────────────────────
// POST /api/province  →  crea una provincia
// Los datos vienen en el Body del request (JSON)
// ─────────────────────────────────────────────
router.post('/', async (req, res) => {
    try {

        const data = req.body; // req.body tiene el JSON que escribiste en Postman
        const province = await service.create(data);
        res.status(201).json(province); // 201 = Created

    } catch (err) {
        // err.status = 400 si fue un error de validación, 500 si fue un error de base de datos
        res.status(err.status || 500).json({ message: err.message });
    }
});


// ─────────────────────────────────────────────
// PUT /api/province  →  actualiza una provincia
// El id y los nuevos datos van todos en el Body
// ─────────────────────────────────────────────
router.put('/', async (req, res) => {
    try {

        const data = req.body;
        const province = await service.update(data);

        if (!province) {
            res.status(404).json({ message: 'Province not found' });
            return;
        }

        res.status(201).json(province);

    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
});


// ─────────────────────────────────────────────
// DELETE /api/province/:id  →  elimina una provincia
// El id viene en la URL, ej: /api/province/5
// ─────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const province = await service.deleteById(id);

        if (!province) {
            res.status(404).json({ message: 'Province not found' });
            return;
        }

        res.status(200).json(province); // Devuelve la provincia eliminada como confirmación

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


export default router;
