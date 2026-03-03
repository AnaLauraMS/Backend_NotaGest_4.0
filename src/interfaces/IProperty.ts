import { Document, Schema } from 'mongoose';

/**
 * Interface para o Imóvel.
 * Note que o 'user' pode ser tanto um ID (Schema.Types.ObjectId) 
 * quanto o objeto IUser completo se usarmos o .populate()
 */
export interface IProperty extends Document {
  user: Schema.Types.ObjectId;
  nome: string;
  cep?: string;     // O '?' indica que é opcional, já que no seu Schema não tem 'required: true'
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  tipo?: string;
  createdAt: Date;
  updatedAt: Date;
}