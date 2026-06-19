export function validateProvince(data) {

    let errors = [];

    if (!data.name) {
        errors.push('El nombre no puede estar vacío.');
    } else if (data.name.trim().length < 3) {
        errors.push('El nombre tiene que tener al menos 3 letras.');
    }

    return errors;
}
