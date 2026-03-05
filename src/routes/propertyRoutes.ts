import express from 'express';
import * as imovelController from '../controllers/propertyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

//middleware de proteção aplicada para todas as rotas de imóveis
router.use(protect);

/**
 * @swagger
 * tags:
 * name: Imóveis
 * description: Gerenciamento de imóveis do usuário
 */

/**
 * @swagger
 * /api/imoveis:
 * get:
 * summary: Lista completa de imóveis do usuário
 * tags: [Imóveis]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de imóveis retornada com sucesso
 */
router.get('/', imovelController.getImoveis);

/**
 * @swagger
 * /api/imoveis/nome:
 * get:
 * summary: Lista simplificada de imóveis (nome + id) para preenchimento de selects
 * tags: [Imóveis]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de nomes de imóveis
 */
router.get('/nome', imovelController.getImoveisNomes);

/**
 * @swagger
 * /api/imoveis:
 * post:
 * summary: Cria um novo imóvel
 * tags: [Imóveis]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Imovel'
 * responses:
 * 201:
 * description: Imóvel criado com sucesso
 */
router.post('/', imovelController.createImovel);

/**
 * @swagger
 * /api/imoveis/{id}:
 * delete:
 * summary: Remove um imóvel pelo ID
 * tags: [Imóveis]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: ID do imóvel a ser removido
 * responses:
 * 200:
 * description: Imóvel removido com sucesso
 * 404:
 * description: Imóvel não encontrado
 */
router.delete('/:id', imovelController.deleteImovel);

export default router;