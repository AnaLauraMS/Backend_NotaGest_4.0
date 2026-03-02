const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/arquivosController');
const { protect } = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Arquivos
 *   description: Rotas para gerenciar arquivos do usuário
 */

/**
 * @swagger
 * /api/uploads:
 *   get:
 *     summary: Lista todos os arquivos do usuário autenticado
 *     tags: [Arquivos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: propertyId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filtra arquivos por imóvel
 *     responses:
 *       200:
 *         description: Lista de arquivos do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Arquivo'
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/uploads:
 *   post:
 *     summary: Cria um novo arquivo
 *     tags: [Arquivos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Arquivo'
 *     responses:
 *       201:
 *         description: Arquivo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Arquivo'
 *       400:
 *         description: Campos obrigatórios faltando
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Usuário não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/uploads/{id}:
 *   delete:
 *     summary: Deleta um arquivo específico pelo ID
 *     tags: [Arquivos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do arquivo a ser deletado
 *     responses:
 *       200:
 *         description: Arquivo removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 message:
 *                   type: string
 *       401:
 *         description: Usuário não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Arquivo não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

router.use(protect);

router.get('/', uploadController.getArquivos);
router.post('/', uploadController.createArquivo);
router.delete('/:id', uploadController.deleteArquivo);

module.exports = router;
