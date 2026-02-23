// Importa o pacote Mongoose, necessário para interagir com o MongoDB
const mongoose = require('mongoose');
// Carrega todas as variáveis de ambiente (como a string de conexão)
require('dotenv').config();

/**
 * @function connectDB
 * @description Função assíncrona para estabelecer a conexão com o MongoDB.
 */
const connectDB = async () => {
    try {
        // Tenta conectar ao banco de dados usando a URL do arquivo .env
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado com sucesso!');
    } catch (err) {
        // Em caso de erro na conexão, exibe a mensagem de falha
        console.error('Erro de conexão com o MongoDB:', err.message);
        // Encerra a aplicação com código de erro (crítico)
        process.exit(1);
    }
};

// Exporta a função de conexão para que seja utilizada no arquivo principal do servidor
module.exports = connectDB;