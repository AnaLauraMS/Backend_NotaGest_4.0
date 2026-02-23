// controllers/arquivoController.js
const Arquivo = require('../models/arquivosModel');
const User = require('../models/userModel');

/**
 * @function getArquivos
 * @description Lista todos os arquivos do usuário logado, opcionalmente filtrando por imóvel
 * @route GET /api/uploads?propertyId=<nome_do_imovel>
 * @access Private
 */
exports.getArquivos = async (req, res) => {
  const propertyName = req.query.propertyId;
  console.log(`Rota GET /api/uploads acionada. Filtro Imóvel: ${propertyName || 'Nenhum'}`);
  console.log("Usuário autenticado ID:", req.user.id);

  try {
    const query = { user: req.user.id };
    if (propertyName) query.property = propertyName;

    const arquivos = await Arquivo.find(query)
      .populate('property', 'nome') 
      .sort({ createdAt: -1 });

    console.log(`Encontrados ${arquivos.length} arquivos para o usuário.`);
    res.status(200).json(arquivos);
  } catch (error) {
    console.error("ERRO getArquivos:", error);
    res.status(500).json({ message: 'Erro ao buscar arquivos', error: error.message });
  }
};

/**
 * @function createArquivo
 * @description Cria um novo registro de arquivo
 * @route POST /api/uploads
 * @access Private
 */
exports.createArquivo = async (req, res) => {
  try {
    const { title, value, purchaseDate, property, category, subcategory, observation, filePath } = req.body;

    if (!title || !value || !purchaseDate || !property || !category || !subcategory) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
    }

    const novoArquivo = await Arquivo.create({
      title,
      value,
      purchaseDate,
      property,
      category,
      subcategory,
      observation,
      filePath,
      user: req.user.id
    });

    console.log('✅ Arquivo criado:', novoArquivo);
    res.status(201).json(novoArquivo);
  } catch (error) {
    console.error("ERRO createArquivo:", error);
    res.status(400).json({ message: 'Erro ao criar arquivo', errorDetails: error.message });
  }
};

/**
 * @function deleteArquivo
 * @description Deleta um arquivo específico
 * @route DELETE /api/uploads/:id
 * @access Private
 */
exports.deleteArquivo = async (req, res) => {
  try {
    const arquivo = await Arquivo.findById(req.params.id);
    if (!arquivo) return res.status(404).json({ message: 'Arquivo não encontrado' });
    if (arquivo.user.toString() !== req.user.id) return res.status(401).json({ message: 'Não autorizado' });

    await arquivo.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Arquivo removido com sucesso' });
  } catch (error) {
    console.error("ERRO deleteArquivo:", error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

/**
 * @function updateArquivo
 * @description Atualiza título e valor de um arquivo
 * @route PUT /api/uploads/:id
 * @access Private
 */
exports.updateArquivo = async (req, res) => {
  try {
    const { title, value } = req.body;
    if (!title && !value) {
      return res.status(400).json({ message: 'Informe pelo menos um campo para atualizar' });
    }

    const arquivo = await Arquivo.findById(req.params.id);
    if (!arquivo) return res.status(404).json({ message: 'Arquivo não encontrado' });
    if (arquivo.user.toString() !== req.user.id) return res.status(401).json({ message: 'Não autorizado' });

    if (title) arquivo.title = title;
    if (value) arquivo.value = value;

    await arquivo.save();
    res.status(200).json(arquivo);
  } catch (error) {
    console.error("ERRO updateArquivo:", error);
    res.status(500).json({ message: 'Erro ao atualizar arquivo', error: error.message });
  }
};
