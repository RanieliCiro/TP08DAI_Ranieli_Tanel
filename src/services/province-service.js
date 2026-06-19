import * as repository from '../repositories/province-repository.js';
import { validateProvince } from '../helpers/validaciones-helper.js';

export async function getAll() {
    return repository.getAll();
}

export async function getById(id) {
    return repository.getById(id);
}

export async function create(data) {
    const errors = validateProvince(data);

    if (errors.length > 0) {
        throw { status: 400, message: errors.join(' ') };
    }

    return repository.create(data);
}

export async function update(data) {
    const errors = validateProvince(data);

    if (errors.length > 0) {
        throw { status: 400, message: errors.join(' ') };
    }

    return repository.update(data);
}

export async function deleteById(id) {
    return repository.deleteById(id);
}
