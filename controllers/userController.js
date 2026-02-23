
const userService = require('../services/userService');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');



// ==========================
// 📘 OPENAPI (Swagger) DOCUMENTAÇÃO
// ==========================

/**
 * @openapi
 * tags:
 *   - name: Usuários
 *     description: Cadastro, login e gerenciamento de usuários
 */

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     tags: [Usuários]
 *     summary: Registra um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               name: "Ana Laura"
 *               email: "ana@example.com"
 *               password: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Usuário já existe
 */

/**
 * @openapi
 * /api/users/login:
 *   post:
 *     tags: [Usuários]
 *     summary: Realiza login e retorna o token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             example:
 *               email: "ana@example.com"
 *               password: "123456"
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             example:
 *               _id: "671a9a2239fbd101bf4d3cc5"
 *               name: "Ana Laura"
 *               email: "ana@example.com"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     tags: [Usuários]
 *     summary: Retorna dados do usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         example: 671a9a2239fbd101bf4d3cc5
 *     responses:
 *       200:
 *         description: Dados do usuário
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Usuário não encontrado
 */


// ==========================
// 🧩 CONTROLADORES DE USUÁRIO
// ==========================


// --- A. READ (GET /users/:id) ---
const getUserProfile = async (req, res) => {
  const profileId = req.params.id;
  const authenticatedUserId = req.user.id;

  if (profileId !== authenticatedUserId) {
    return res.status(403).json({ message: 'Acesso proibido.' });
  }

  try {
    const user = await userService.getProfileById(profileId);
    if (!user) return res.status(404).json({ message: 'Perfil não encontrado.' });
    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error.message);
    res.status(500).json({ message: 'Erro interno ao buscar perfil.' });
  }
};


// --- B. UPDATE (PUT /users/:id) ---
const updateUserProfile = async (req, res) => {
  const profileId = req.params.id;
  const authenticatedUserId = req.user.id;

  if (profileId !== authenticatedUserId) {
    return res.status(403).json({
      message: "Acesso Proibido. Você só pode atualizar seu próprio perfil."
    });
  }

  try {
    const updatedUser = await userService.updateProfileById(profileId, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Perfil de usuário não encontrado.' });
    }

    res.status(200).json({
      message: 'Perfil atualizado com sucesso!',
      data: updatedUser
    });

  } catch (error) {
    console.error('Erro ao atualizar perfil:', error.message);
    res.status(500).json({ message: 'Erro ao atualizar o perfil.' });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userEmail = req.user.email; // obtido via middleware 'protect'

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    // Verifica senha atual
    const isMatch = await bcrypt.compare(currentPassword, user.senha);
    if (!isMatch) return res.status(400).json({ message: 'Senha atual incorreta.' });

    // Hash nova senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Atualiza no banco
    user.senha = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Senha alterada com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao alterar senha.' });
  }
};


// --- C. DELETE (DELETE /users/:id) ---
const deleteUser = async (req, res) => {
  const profileId = req.params.id;
  const authenticatedUserId = req.user.id;

  if (profileId !== authenticatedUserId) {
    return res.status(403).json({
      message: "Acesso Proibido. Você só pode deletar seu próprio perfil."
    });
  }

  try {
    const wasDeleted = await userService.deleteProfileById(profileId);
    if (!wasDeleted) {
      return res.status(404).json({ message: 'Perfil não encontrado para exclusão.' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar perfil:', error.message);
    res.status(500).json({ message: 'Erro ao tentar deletar o perfil.' });
  }
};


// --- D. ROTA INTERNA DE CRIAÇÃO (POST /users/internal) ---
const createProfileInternal = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    const newProfile = await userService.createProfile(email, nome, senha);
    res.status(201).json({ 
      message: 'Perfil criado com sucesso.', 
      user: newProfile 
    });
  } catch (err) {
    if (err.message.includes('existe')) {
      return res.status(409).json({ message: 'Perfil já existe.' });
    }
    console.error(err);
    res.status(500).json({ message: 'Erro interno.' });
  }
};


// --- E. OBTÉM DADOS PELO TOKEN (GET /users/token) ---
const getUserByToken = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const user = await User.findOne({ email: userEmail }).select('nome email');

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado no banco principal' });
    }

    res.status(200).json({
      name: user.nome,
      email: user.email
    });
  } catch (err) {
    console.error('Erro ao buscar o usuário.', err);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  createProfileInternal,
  getUserByToken,
  changePassword
};
