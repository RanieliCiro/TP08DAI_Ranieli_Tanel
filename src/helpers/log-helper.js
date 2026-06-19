// fs es el módulo de Node para leer y escribir archivos en el disco
import fs from 'fs';

// Cargamos las variables del .env
import dotenv from 'dotenv';
dotenv.config();


class LogHelper {

    constructor() {
        // Leemos la carpeta y nombre de archivo desde el .env
        this.filePath = process.env.LOG_FILE_PATH;
        this.fileName = process.env.LOG_FILE_NAME;

        // Convertimos el string "true"/"false" del .env a un booleano real (true/false)
        this.logToFileEnabled    = process.env.LOG_TO_FILE_ENABLED.toLowerCase()    === 'true';
        this.logToConsoleEnabled = process.env.LOG_TO_CONSOLE_ENABLED.toLowerCase() === 'true';
    }


    // Este método recibe un objeto de error y lo registra donde corresponda
    logError = (errorObject) => {

        // Armamos el timestamp: la fecha y hora exacta en que ocurrió el error
        const timestamp = new Date().toISOString(); // Ej: "2024-05-02T12:34:54.007Z"

        // Armamos el texto que vamos a guardar/mostrar
        const mensaje = `${timestamp}: ${errorObject.message}\nStack Trace:\n${errorObject.stack}\n\n`;

        // Si está habilitado mostrar en consola, lo imprimimos
        if (this.logToConsoleEnabled) {
            console.error(mensaje);
        }

        // Si está habilitado guardar en archivo, lo escribimos en el disco
        if (this.logToFileEnabled) {

            // Creamos la carpeta si no existe (recursive:true evita el error si ya existe)
            fs.mkdirSync(this.filePath, { recursive: true });

            // appendFileSync agrega el texto AL FINAL del archivo (no lo borra)
            // Si el archivo no existe, lo crea automáticamente
            fs.appendFileSync(this.filePath + this.fileName, mensaje);
        }
    }
}


// Exportamos una INSTANCIA de la clase (no la clase en sí)
// Así en cualquier otro archivo hacés: LogHelper.logError(error)
export default new LogHelper();
