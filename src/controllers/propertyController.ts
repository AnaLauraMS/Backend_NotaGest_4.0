import { Response } from 'express';
import User from '../models/userModel.js';
import Imovel from '../models/propertyModel.js';
import Arquivo from '../models/fileModel.js';
import { IAuthRequest } from '../interfaces/IAuthRequest.js';

/**
 * @function getImoveis
 * @description Busca todos os imóveis pertencentes ao usuário autenticado.
 */
export const getImoveis = async (req: IAuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: 'ID de usuário não encontrado no token.' });
        }

        const imoveis = await Imovel.find({ user: userId }).sort({ nome: 1 });
        res.status(200).json(imoveis);
    } catch (error: any) {
        console.error('❌ Erro no getImoveis:', error.message);
        res.status(500).json({ message: 'Erro no servidor ao buscar imóveis', error: error.message });
    }
};

/**
 * @function getImoveisNomes
 * @description Retorna apenas os nomes dos imóveis do usuário autenticado
 */
export const getImoveisNomes = async (req: IAuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ message: 'ID de usuário não encontrado no token.' });
        }

        const imoveis = await Imovel.find({ user: userId }).select('nome');
        res.status(200).json(imoveis);
    } catch (error: any) {
        console.error('❌ Erro ao buscar nomes dos imóveis:', error.message);
        res.status(500).json({ message: 'Erro ao buscar nomes dos imóveis.', error: error.message });
    }
};

/**
 * @function createImovel
 * @description Registra um novo imóvel.
 */
export const createImovel = async (req: IAuthRequest, res: Response) => {
    try {
        const { nome, cep, rua, numero, bairro, cidade, estado, tipo } = req.body;

        if (!nome) {
            return res.status(400).json({ message: 'O campo "nome" é obrigatório.' });
        }

        const userEmail = req.user?.email;
        const userDoc = await User.findOne({ email: userEmail });

        if (!userDoc) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const novoImovel = await Imovel.create({
            nome,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            estado,
            tipo,
            user: userDoc._id
        });

        res.status(201).json(novoImovel);

    } catch (error: any) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((el: any) => ({
                campo: el.path,
                mensagem: el.message
            }));
            return res.status(400).json({
                message: 'Dados inválidos ao criar imóvel.',
                validationErrors: errors
            });
        } 
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: `Erro ao converter valor para o campo '${error.path}'.`,
                errorDetails: error.message
            });
        }

        res.status(500).json({
            message: 'Erro interno no servidor ao criar imóvel.',
            errorDetails: error.message
        });
    }
};

/**
 * @function deleteImovel
 * @description Deleta um imóvel se não houver notas vinculadas.
 */
export const deleteImovel = async (req: IAuthRequest, res: Response) => {
    try {
        const propertyId = req.params.id;

        if (!propertyId) {
            return res.status(400).json({ message: "ID do imóvel é obrigatório." });
        }

        // 1️⃣ Verificar se existem notas vinculadas ao imóvel
        const invoicesCount = await Arquivo.countDocuments({ property: propertyId });

        if (invoicesCount > 0) {
            return res.status(400).json({
                message: "Este imóvel possui notas vinculadas e não pode ser excluído."
            });
        }

        // 2️⃣ Excluir o imóvel
        const deleted = await Imovel.findByIdAndDelete(propertyId);

        if (!deleted) {
            return res.status(404).json({ message: "Imóvel não encontrado." });
        }

        res.json({ message: "Imóvel excluído com sucesso." });

    } catch (error: any) {
        console.error("❌ Erro ao excluir imóvel:", error.message);
        res.status(500).json({ message: "Erro no servidor ao excluir imóvel." });
    }
};