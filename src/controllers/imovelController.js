const User = require('../models/userModel');
const Imovel = require('../models/imovelModel');

const Arquivo = require('../models/arquivosModel'); 


/**
 * @function getImoveis
 * @description Controller para buscar todos os imóveis pertencentes ao usuário autenticado.
 * @route GET /api/imoveis
 * @access Private
 */
exports.getImoveis = async (req, res) => {
    try {
        console.log('📦 GET /api/imoveis acionado');
        console.log('👤 Usuário autenticado:', req.user);

        const userId = req.user._id || req.user.id;
        if (!userId) {
            return res.status(400).json({ message: 'ID de usuário não encontrado no token.' });
        }

        console.log('🧩 ID usado na busca:', userId);
        const imoveis = await Imovel.find({ user: userId }).sort({ nome: 1 });
        console.log('🏠 Imóveis encontrados:', imoveis);

        res.status(200).json(imoveis);
    } catch (error) {
        console.error('❌ Erro no getImoveis:', error);
        res.status(500).json({ message: 'Erro no servidor ao buscar imóveis', error: error.message });
    }
};


/**
 * @function getImoveisNomes
 * @description Retorna apenas os nomes dos imóveis do usuário autenticado
 * @route GET /api/imoveis/nome
 * @access Private
 */
exports.getImoveisNomes = async (req, res) => {
    try {
        const userId = req.user._id || req.user.id;
        if (!userId) {
            return res.status(400).json({ message: 'ID de usuário não encontrado no token.' });
        }

        // Busca apenas os campos _id e nome
        const imoveis = await Imovel.find({ user: userId }).select('nome');
        res.status(200).json(imoveis);
    } catch (error) {
        console.error('❌ Erro ao buscar nomes dos imóveis:', error);
        res.status(500).json({ message: 'Erro ao buscar nomes dos imóveis.', error: error.message });
    }
};

/**
 * @function createImovel
 * @description Controller para registrar um novo imóvel.
 * @route POST /api/imoveis
 * @access Private
 */
exports.createImovel = async (req, res) => {
    console.log('🏁 Entrou na função createImovel!');
    console.log('➡️ Requisição POST /api/imoveis recebida com dados:', req.body);

    try {
        const { nome, cep, rua, numero, bairro, cidade, estado, tipo } = req.body;

        if (!nome) {
            return res.status(400).json({ message: 'O campo "nome" é obrigatório.' });
        }

        const userDoc = await User.findOne({ email: req.user.email });

        if (!userDoc) {
            console.error('❌ Usuário não encontrado no banco de dados.');
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

        console.log('✅ Imóvel criado com sucesso:', novoImovel);
        res.status(201).json(novoImovel);

    } catch (error) {
        console.error('❌ ERRO 400 NO CONTROLLER createImovel:');

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(el => ({
                campo: el.path,
                mensagem: el.message
            }));
            console.error('   Detalhes dos Campos Inválidos:', errors);
            return res.status(400).json({
                message: 'Dados inválidos ao criar imóvel. Verifique os campos.',
                validationErrors: errors
            });
        } else if (error.name === 'CastError') {
            return res.status(400).json({
                message: `Erro ao converter valor para o campo '${error.path}'.`,
                errorDetails: error.message
            });
        } else {
            console.error('   Mensagem:', error.message);
            return res.status(500).json({
                message: 'Erro interno no servidor ao criar imóvel.',
                errorDetails: error.message
            });
        }
    }
};

/**
 * @function deleteImovel
 * @description Controller para deletar um imóvel específico.
 * @route DELETE /api/imoveis/:id
 * @access Private
 */
exports.deleteImovel = async (req, res) => {
    try {
        const propertyId = req.params.id;

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

        return res.json({ message: "Imóvel excluído com sucesso." });

    } catch (error) {
        console.error("❌ Erro ao excluir imóvel:", error);
        res.status(500).json({ message: "Erro no servidor ao excluir imóvel." });
    }
};

