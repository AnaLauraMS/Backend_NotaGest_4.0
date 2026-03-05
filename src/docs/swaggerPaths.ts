/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/uploadfile:
 * post:
 * summary: Faz upload físico de um arquivo para o servidor
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
 * description: O arquivo (PDF, imagem, etc) a ser enviado.
 * responses:
 * 200:
 * description: Arquivo enviado com sucesso
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * filePath:
 * type: string
 * example: "ID_DO_USUARIO/nome_do_arquivo.pdf"
 * 400:
 * description: Nenhum arquivo enviado ou formato inválido
 */
