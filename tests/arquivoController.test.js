// @ts-nocheck
const { getArquivos, createArquivo, deleteArquivo, updateArquivo } = require('../controllers/arquivosController');
const Arquivo = require('../models/arquivosModel');

jest.mock('../models/arquivosModel');

describe('Arquivo Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { user: { id: '123' }, body: {}, params: { id: 'abc' }, query: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  // getArquivos
  describe('getArquivos', () => {
    it('deve retornar lista de arquivos', async () => {
      const fakeArquivos = [{ title: 'Arquivo 1' }, { title: 'Arquivo 2' }];
      Arquivo.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockResolvedValue(fakeArquivos)
        })
      });

      await getArquivos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeArquivos);
    });

    it('deve filtrar por imóvel se query.propertyId existir', async () => {
      req.query.propertyId = 'Casa 1';
      const fakeArquivos = [{ title: 'Arquivo Casa 1' }];
      Arquivo.find.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          sort: jest.fn().mockResolvedValue(fakeArquivos)
        })
      });

      await getArquivos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeArquivos);
    });
  });

  // createArquivo
  describe('createArquivo', () => {
    it('deve criar um novo arquivo', async () => {
      req.body = { title: 'Doc', value: 100, purchaseDate: '2025-01-01', property: 'abc', category: 'Cat', subcategory: 'Sub', observation: '', filePath: '/file/path' };
      Arquivo.create.mockResolvedValue({ ...req.body, user: '123' });

      await createArquivo(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ ...req.body, user: '123' });
    });

    it('deve retornar 400 se faltar campos obrigatórios', async () => {
      req.body = { title: 'Doc' }; // incompleto
      await createArquivo(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Campos obrigatórios faltando.' });
    });
  });

  // deleteArquivo
  describe('deleteArquivo', () => {
    it('deve deletar arquivo com usuário correto', async () => {
      const mockArquivo = { user: '123', deleteOne: jest.fn().mockResolvedValue() };
      Arquivo.findById.mockResolvedValue(mockArquivo);

      await deleteArquivo(req, res);

      expect(mockArquivo.deleteOne).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ id: 'abc', message: 'Arquivo removido com sucesso' });
    });

    it('deve retornar 404 se arquivo não existir', async () => {
      Arquivo.findById.mockResolvedValue(null);
      await deleteArquivo(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Arquivo não encontrado' });
    });

    it('deve retornar 401 se usuário não autorizado', async () => {
      const mockArquivo = { user: '999', deleteOne: jest.fn() };
      Arquivo.findById.mockResolvedValue(mockArquivo);

      await deleteArquivo(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Não autorizado' });
    });
  });

  // updateArquivo
  describe('updateArquivo', () => {
    it('deve atualizar título e valor de um arquivo', async () => {
      req.body = { title: 'Novo Título', value: 200 };
      const mockArquivo = { user: '123', save: jest.fn().mockResolvedValue(), title: '', value: 0 };
      Arquivo.findById.mockResolvedValue(mockArquivo);

      await updateArquivo(req, res);

      expect(mockArquivo.save).toHaveBeenCalled();
      expect(mockArquivo.title).toBe('Novo Título');
      expect(mockArquivo.value).toBe(200);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockArquivo);
    });

    it('deve retornar 400 se não informar title ou value', async () => {
      req.body = {};
      await updateArquivo(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Informe pelo menos um campo para atualizar' });
    });

    it('deve retornar 404 se arquivo não existir', async () => {
      Arquivo.findById.mockResolvedValue(null);
      req.body = { title: 'Novo' };
      await updateArquivo(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Arquivo não encontrado' });
    });

    it('deve retornar 401 se usuário não autorizado', async () => {
      const mockArquivo = { user: '999', save: jest.fn() };
      Arquivo.findById.mockResolvedValue(mockArquivo);
      req.body = { title: 'Novo' };

      await updateArquivo(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Não autorizado' });
    });
  });
});
