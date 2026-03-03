import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser.js'; // Importando a interface que criamos

const userSchema = new Schema<IUser>({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true // Dica: isso gerencia o createdAt e updatedAt automaticamente para você
});

const User = model<IUser>('User', userSchema);

export default User;