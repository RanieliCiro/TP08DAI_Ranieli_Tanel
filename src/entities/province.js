// Esta clase es el "molde" de una Provincia.
// Define qué propiedades tiene. No ejecuta lógica ni consultas.
// Sirve para que sepas exactamente qué datos maneja la app.

export class Province {
    constructor(id, name, full_name, latitude, longitude, display_order) {
        this.id            = id;            // Número único que identifica la provincia
        this.name          = name;          // Nombre corto, ej: "Buenos Aires"
        this.full_name     = full_name;     // Nombre completo, ej: "Provincia de Buenos Aires"
        this.latitude      = latitude;      // Coordenada de latitud
        this.longitude     = longitude;     // Coordenada de longitud
        this.display_order = display_order; // Orden para mostrarla (puede ser null)
    }
}
