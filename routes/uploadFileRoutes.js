// routes/uploadFileRoutes.js

const express = require('express');
const router = express.Router();
const path = require('path'); // Módulo para manipulação de caminhos de arquivos
const { protect } = require('../middleware/auth'); // Middleware de autenticação (JWT)
// Importa a configuração do Multer para processar o arquivo
const uploadMiddleware = require('../middleware/uploads'); 

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: Rotas para envio de arquivos
 */

/**
 * @swagger
 * /api/uploadfile:
 *   post:
 *     summary: Envia um arquivo para o servidor
 *     tags: [Uploads]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo que será enviado
 *     responses:
 *       200:
 *         description: Arquivo enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Arquivo enviado com sucesso!
 *                 filePath:
 *                   type: string
 *                   example: "64f3a8c7e9c7b/myfile.pdf"
 *       400:
 *         description: Nenhum arquivo válido foi enviado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Nenhum arquivo válido foi enviado.
 */


router.post(
    '/',
    // 1. Aplica o middleware de autenticação (verifica o token)
    protect,
    // 2. Aplica o middleware de upload (processa o arquivo e salva no disco)
    uploadMiddleware,
    // 3. Controller (função final que lida com a resposta)
    (req, res) => {
        // Verifica se o arquivo foi processado com sucesso pelo Multer
        if (!req.file) {
            console.error('Tentativa de upload falhou: Nenhum arquivo recebido ou arquivo rejeitado.');
            return res.status(400).json({ message: 'Nenhum arquivo válido foi enviado.' });
        }

        // Constrói o caminho relativo do arquivo (pasta do usuário + nome do arquivo)
        // Substitui barras invertidas por barras normais para compatibilidade de URLs
        const relativePath = path.join(req.user.id.toString(), req.file.filename).replace(/\\/g, '/');

        console.log(`✅ Arquivo recebido e salvo: ${req.file.originalname} -> ${req.file.path}`);
        console.log(`   Retornando caminho relativo para o cliente: ${relativePath}`);

        // Retorna o caminho onde o arquivo pode ser encontrado para uso futuro
        res.status(200).json({
            message: 'Arquivo enviado com sucesso!',
            filePath: relativePath
        });
    }
);

// Exporta o roteador configurado
module.exports = router;