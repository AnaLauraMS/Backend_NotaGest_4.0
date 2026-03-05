import { Response } from 'express';
import Arquivo from '../models/fileModel.js';
import { IAuthRequest } from '../interfaces/IAuthRequest.js';

/**
 * @function getArquivos
 * @description Lista todos os arquivos do usuário logado
 */
export const getArquivos = async (req: IAuthRequest, res: Response) => {
  const propertyName = req.query.propertyId as string | undefined;
  const userId = req.user?.id;

  // Type Guard para garantir que o usuário está autenticado
  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  console.log(`Rota GET /api/uploads acionada. Filtro Imóvel: ${propertyName || 'Nenhum'}`);

  try {
    // Definimos o tipo do objeto de query
    const query: any = { user: userId };
    if (propertyName) query.property = propertyName;

    const arquivos = await Arquivo.find(query)
      .populate('property', 'nome') 
      .sort({ createdAt: -1 });

    res.status(200).json(arquivos);
  } catch (error: any) {
    console.error("ERRO getArquivos:", error.message);
    res.status(500).json({ message: 'Erro ao buscar arquivos', error: error.message });
  }
};

/**
 * @function createArquivo
 */
export const createArquivo = async (req: IAuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  try {
    const { 
      title, value, purchaseDate, property, 
      category, subcategory, observation, filePath 
    } = req.body;

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
      user: userId
    });

    console.log('✅ Registro de arquivo criado no DB:', novoArquivo._id);
    res.status(201).json(novoArquivo);
  } catch (error: any) {
    console.error("ERRO createArquivo:", error.message);
    res.status(400).json({ message: 'Erro ao criar registro de arquivo', errorDetails: error.message });
  }
};

/**
 * @function deleteArquivo
 */
export const deleteArquivo = async (req: IAuthRequest, res: Response) => {
  const fileId = req.params.id;
  const userId = req.user?.id;

  if (!fileId || !userId) {
    return res.status(400).json({ message: 'ID do arquivo ou usuário ausente.' });
  }

  try {
    const arquivo = await Arquivo.findById(fileId);

    if (!arquivo) {
      return res.status(404).json({ message: 'Arquivo não encontrado' });
    }

    // Verificação de dono do arquivo (segurança extra)
    if (arquivo.user.toString() !== userId) {
      return res.status(401).json({ message: 'Não autorizado a excluir este arquivo.' });
    }

    await arquivo.deleteOne();
    res.status(200).json({ id: fileId, message: 'Arquivo removido com sucesso' });
  } catch (error: any) {
    console.error("ERRO deleteArquivo:", error.message);
    res.status(500).json({ message: 'Erro no servidor ao deletar arquivo.' });
  }
};

/**
 * @function updateArquivo
 */
export const updateArquivo = async (req: IAuthRequest, res: Response) => {
  const fileId = req.params.id;
  const userId = req.user?.id;

  if (!fileId || !userId) {
    return res.status(400).json({ message: 'ID do arquivo ou usuário ausente.' });
  }

  try {
    const { title, value } = req.body;
    
    if (!title && !value) {
      return res.status(400).json({ message: 'Informe pelo menos um campo para atualizar' });
    }

    const arquivo = await Arquivo.findById(fileId);

    if (!arquivo) {
      return res.status(404).json({ message: 'Arquivo não encontrado' });
    }

    if (arquivo.user.toString() !== userId) {
      return res.status(401).json({ message: 'Não autorizado.' });
    }

    if (title) arquivo.title = title;
    if (value) arquivo.value = value;

    await arquivo.save();
    res.status(200).json(arquivo);
  } catch (error: any) {
    console.error("ERRO updateArquivo:", error.message);
    res.status(500).json({ message: 'Erro ao atualizar arquivo', error: error.message });
  }
};