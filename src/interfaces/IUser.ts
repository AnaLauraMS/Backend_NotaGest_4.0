import { Document } from 'mongoose';

/**
 * Interface da estrutura de um usuário
 */

export interface IUser extends Document {
  nome: string;
  email: string;
  senha: string;
  createdAt: Date;
  updatedAt: Date;
}