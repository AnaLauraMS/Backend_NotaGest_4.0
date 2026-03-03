import { Schema, model } from 'mongoose';
import { IProperty } from '../interfaces/IProperty.js';

const imovelSchema = new Schema<IProperty>({
  // Referência ao Model de Usuário
  user: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
  },
  nome: { type: String, required: true },
  cep: { type: String },
  rua: { type: String },
  numero: { type: String },
  bairro: { type: String },
  cidade: { type: String },
  estado: { type: String },
  tipo: { type: String }
}, { 
  timestamps: true // Isso já cria o createdAt e updatedAt automaticamente
});

const Property = model<IProperty>('Imovel', imovelSchema);

export default Property;