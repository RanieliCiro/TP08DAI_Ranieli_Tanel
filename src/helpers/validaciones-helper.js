// Esta función revisa si los datos de una provincia son válidos.
// Devuelve un array de mensajes de error.
// Si el array está vacío → todo está bien. Si tiene algo → hay un error.

export function validateProvince(data) {

    let errors = []; // Empezamos con una lista vacía de errores

    // Validación del nombre
    if (!data.name) {
        // !data.name es true cuando name es undefined, null, o string vacío ""
        errors.push('El nombre no puede estar vacío.');

    } else if (data.name.trim().length < 3) {
        // .trim() saca los espacios del principio y fin antes de contar las letras
        errors.push('El nombre tiene que tener al menos 3 letras.');
    }

    return errors;
}
