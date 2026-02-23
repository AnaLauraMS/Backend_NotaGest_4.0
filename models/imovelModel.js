const mongoose = require('mongoose');

const imovelSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    nome: { type: String, required: true },
    cep: { type: String },
    rua: { type: String },
    numero: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    estado: { type: String },
    tipo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Imovel', imovelSchema);