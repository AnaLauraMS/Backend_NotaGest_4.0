const express = require('express');
const router = express.Router();
const imovelController = require('../controllers/imovelController');
const { protect } = require('../middleware/auth');

router.use(protect);

/**
 * @swagger
 * /api/imoveis:
 *   get:
 *     summary: Lista completa de imóveis do usuário
 *     tags: [Imóveis]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de imóveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Imovel'
 */
router.get('/', imovelController.getImoveis);

/**
 * @swagger
 * /api/imoveis/nome:
 *   get:
 *     summary: Lista simplificada de imóveis (nome + id) para selects
 *     tags: [Imóveis]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de nomes de imóveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "671a9cdd39fbd101bf4d3cca"
 *                   nome:
 *                     type: string
 *                     example: "Casa Nova"
 */
router.get('/nome', imovelController.getImoveisNomes);

/**
 * @swagger
 * /api/imoveis:
 *   post:
 *     summary: Cria um novo imóvel
 *     tags: [Imóveis]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Imovel'
 *     responses:
 *       201:
 *         description: Imóvel criado com sucesso
 */
router.post('/', imovelController.createImovel);

/**
 * @swagger
 * /api/imoveis/{id}:
 *   delete:
 *     summary: Remove um imóvel pelo ID
 *     tags: [Imóveis]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do imóvel a ser removido
 *     responses:
 *       200:
 *         description: Imóvel removido com sucesso
 *       404:
 *         description: Imóvel não encontrado
 */
router.delete('/:id', imovelController.deleteImovel);

module.exports = router;
