import { Router, Request, Response } from 'express';
import * as userController from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import User from '../models/userModel.js';

const router = Router();

/**
 * @swagger
 * tags:
 * name: Usuários
 * description: Rotas para gerenciamento de usuários
 */

// NOTA: Para as rotas abaixo, o ideal é que essa lógica vá para o Controller futuramente.
// Por enquanto, vamos apenas tipar para funcionar a migração.

/**
 * @swagger
 * /api/users/me:
 * get:
 * summary: Retorna o usuário logado
 * tags: [Usuários]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Usuário encontrado
 */
router.get('/me', protect, async (req: Request, res: Response) => {
  try {
    // req.user geralmente é injetado pelo middleware protect
    const user = await User.findOne({ email: (req as any).user.email }).select('_id nome email');
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (error: any) {
    console.error('Erro ao buscar usuário:', error.message);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
});

/**
 * @swagger
 * /api/users/byEmail/{email}:
 * get:
 * summary: Busca usuário pelo e-mail
 * tags: [Usuários]
 */
router.get('/byEmail/:email', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuário.' });
  }
});

// As rotas abaixo já chamam o controller, o que é o padrão correto
router.put('/change-password', protect, userController.changePassword);
router.post('/internal', userController.createProfileInternal);

router.get('/:id', protect, userController.getUserProfile);
router.put('/:id', protect, userController.updateUserProfile);
router.delete('/:id', protect, userController.deleteUser);

export default router;