import express from 'express';
// Importamos o controller com as funções nomeadas que refatoramos antes
import * as uploadController from '../controllers/fileController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Arquivos
 * description: Rotas para gerenciar arquivos do usuário
 */

// Aplicamos o middleware de proteção para todas as rotas deste arquivo
router.use(protect);

/**
 * @swagger
 * /api/uploads:
 * get:
 * summary: Lista todos os arquivos do usuário autenticado
 * tags: [Arquivos]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: query
 * name: propertyId
 * schema:
 * type: string
 * required: false
 * description: Filtra arquivos por imóvel
 * responses:
 * 200:
 * description: Lista de arquivos
 */
router.get('/', uploadController.getArquivos);

/**
 * @swagger
 * /api/uploads:
 * post:
 * summary: Cria um novo registro de arquivo
 * tags: [Arquivos]
 * security:
 * - bearerAuth: []
 * responses:
 * 201:
 * description: Arquivo criado com sucesso
 */
router.post('/', uploadController.createArquivo);

/**
 * @swagger
 * /api/uploads/{id}:
 * delete:
 * summary: Deleta um arquivo específico pelo ID
 * tags: [Arquivos]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * responses:
 * 200:
 * description: Arquivo removido com sucesso
 */
router.delete('/:id', uploadController.deleteArquivo);

// Em TS/ESM usamos export default
export default router;