import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

class LogHelper {

    constructor() {
        this.filePath            = process.env.LOG_FILE_PATH;
        this.fileName            = process.env.LOG_FILE_NAME;
        this.logToFileEnabled    = process.env.LOG_TO_FILE_ENABLED.toLowerCase()    === 'true';
        this.logToConsoleEnabled = process.env.LOG_TO_CONSOLE_ENABLED.toLowerCase() === 'true';
    }

    logError = (errorObject) => {

        const timestamp = new Date().toISOString();
        const mensaje   = `${timestamp}: ${errorObject.message}\nStack Trace:\n${errorObject.stack}\n\n`;

        if (this.logToConsoleEnabled) {
            console.error(mensaje);
        }

        if (this.logToFileEnabled) {
            fs.mkdirSync(this.filePath, { recursive: true });
            fs.appendFileSync(this.filePath + this.fileName, mensaje);
        }
    }
}

export default new LogHelper();
