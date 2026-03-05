import express, { Response } from 'express';
import path from 'path';
import { protect } from '../middleware/auth.js';
import uploadMiddleware from '../middleware/uploads.js';
import { IAuthRequest } from '../interfaces/IAuthRequest.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Uploads
 * description: Rotas para envio de arquivos físicos para o servidor
 */

/**
 * @swagger
 * /api/uploadfile:
 * post:
 * summary: Envia um arquivo para o servidor
 * tags: [Uploads]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * properties:
 * file:
 * type: string
 * format: binary
 */
router.post(
    '/',
    // 1. Verifica o token
    protect,
    // 2. Processa o arquivo (Multer)
    uploadMiddleware,
    // 3. Controller final
    (req: IAuthRequest, res: Response) => {
        // O Multer coloca os dados do arquivo em req.file
        if (!req.file) {
            console.error('Tentativa de upload falhou: Nenhum arquivo recebido.');
            return res.status(400).json({ message: 'Nenhum arquivo válido foi enviado.' });
        }

        // Verificação de segurança para o ID do usuário (Type Guard)
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'Usuário não identificado.' });
        }

        // Constrói o caminho relativo para salvar no banco de dados depois
        // Usamos path.join para ser compatível com Windows/Linux e replace para URL
        const relativePath = path.join(userId.toString(), req.file.filename).replace(/\\/g, '/');

        console.log(`✅ Arquivo salvo: ${req.file.originalname}`);
        console.log(`🔗 Caminho relativo: ${relativePath}`);

        res.status(200).json({
            message: 'Arquivo enviado com sucesso!',
            filePath: relativePath
        });
    }
);

export default router;