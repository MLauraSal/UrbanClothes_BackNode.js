import "dotenv/config";


// Configuración del puerto desde variables de entorno

export const configDotenvPort = () => { return {port: process.env.PORT || 3002}; };

