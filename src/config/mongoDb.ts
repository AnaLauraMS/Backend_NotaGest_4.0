// 1. Usamos import em vez de require
import mongoose from 'mongoose';

/**
 * @function connectDB
 * @description Função assíncrona para estabelecer a conexão com o MongoDB.
 * @returns {Promise<void>} - O TS exige saber que essa função retorna uma promessa vazia.
 */
const connectDB = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URI || '';
        
        if (!uri) {
            throw new Error("A variável MONGO_URI não está definida no .env");
        }

        await mongoose.connect(uri);
        console.log('MongoDB conectado com su su sucesso');
    } catch (err) {
        if (err instanceof Error) {
            console.error('Erro de conexão com o MongoDB :c ', err.message);
        } else {
            console.error('Erro desconhecido na conexão com o MongoDB :/ ');
        }
        
        process.exit(1);
    }
};

// export default
export default connectDB;