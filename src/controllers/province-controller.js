import { Router } from 'express';
import * as service from '../services/province-service.js';

const router = Router();

router.get('/', async (_req, res) => {
    try {
        const provinces = await service.getAll();
        res.status(200).json(provinces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const province = await service.getById(id);

        if (!province) {
            res.status(404).json({ message: 'Province not found' });
            return;
        }

        res.status(200).json(province);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const province = await service.create(data);
        res.status(201).json(province);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
});

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

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const province = await service.deleteById(id);

        if (!province) {
            res.status(404).json({ message: 'Province not found' });
            return;
        }

        res.status(200).json(province);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
