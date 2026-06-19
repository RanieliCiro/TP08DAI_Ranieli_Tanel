// El Service es la capa de "lógica de negocio".
// Su trabajo: validar los datos y decidir si la operación puede continuar.
// No sabe nada de HTTP (eso lo maneja el controller).
// No sabe nada de SQL (eso lo maneja el repository).

import * as repository from '../repositories/province-repository.js';
import { validateProvince } from '../helpers/validaciones-helper.js';

// Trae todas → no necesita validar nada, pasa directo al repository
export async function getAll() {
    return repository.getAll();
}

// Trae una por id → tampoco necesita validar, pasa directo
export async function getById(id) {
    return repository.getById(id);
}

// Crea una provincia → SÍ necesita validar primero
export async function create(data) {

    const errors = validateProvince(data); // Revisamos si los datos son válidos

    if (errors.length > 0) {
        // Si hay errores, lanzamos una excepción.
        // throw interrumpe la ejecución y el controller la atrapa con catch.
        // Le mandamos el status 400 (Bad Request) y el mensaje de error.
        throw { status: 400, message: errors.join(' ') };
    }

    // Si llegamos acá, los datos son válidos → guardamos en la base
    return repository.create(data);
}

// Actualiza una provincia → también valida primero
export async function update(data) {

    const errors = validateProvince(data);

    if (errors.length > 0) {
        throw { status: 400, message: errors.join(' ') };
    }

    return repository.update(data);
}

// Elimina por id → no necesita validar
export async function deleteById(id) {
    return repository.deleteById(id);
}
