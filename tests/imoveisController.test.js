// @ts-nocheck
const { getImoveis, getImoveisNomes, createImovel, deleteImovel } = require('../controllers/imovelController');
const Imovel = require('../models/imovelModel');
const User = require('../models/userModel');
const Arquivo = require('../models/arquivosModel');

jest.mock('../models/imovelModel');
jest.mock('../models/userModel');
jest.mock('../models/arquivosModel');

describe('Imoveis Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { user: { _id: '123', email: 'teste@teste.com' }, body: {}, params: { id: 'abc' } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    jest.clearAllMocks();
  });

  // getImoveis
  describe('getImoveis', () => {
    it('deve retornar lista de imóveis', async () => {
      const fakeImoveis = [{ nome: 'Casa 1' }, { nome: 'Apartamento 2' }];
      Imovel.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(fakeImoveis) });

      await getImoveis(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeImoveis);
    });

    it('deve retornar 400 se userId não existir', async () => {
      req.user = {};
      await getImoveis(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'ID de usuário não encontrado no token.' });
    });
  });

  // getImoveisNomes
  describe('getImoveisNomes', () => {
    it('deve retornar apenas nomes dos imóveis', async () => {
      const fakeImoveis = [{ nome: 'Casa 1' }, { nome: 'Apartamento 2' }];
      Imovel.find.mockReturnValue({ select: jest.fn().mockResolvedValue(fakeImoveis) });

      await getImoveisNomes(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeImoveis);
    });

    it('deve retornar 400 se userId não existir', async () => {
      req.user = {};
      await getImoveisNomes(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'ID de usuário não encontrado no token.' });
    });
  });

  // createImovel
  describe('createImovel', () => {
    it('deve criar um novo imóvel', async () => {
      req.body = { nome: 'Casa Nova', cep: '12345', rua: 'Rua A', numero: '10', bairro: 'Centro', cidade: 'Cidade', estado: 'ST', tipo: 'Apartamento' };
      User.findOne.mockResolvedValue({ _id: '123', email: 'teste@teste.com' });
      Imovel.create.mockResolvedValue({ ...req.body, user: '123' });

      await createImovel(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ ...req.body, user: '123' });
    });

    it('deve retornar 400 se nome não for informado', async () => {
      req.body = {};
      await createImovel(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'O campo "nome" é obrigatório.' });
    });

    it('deve retornar 404 se usuário não existir', async () => {
      req.body = { nome: 'Casa Nova' };
      User.findOne.mockResolvedValue(null);
      await createImovel(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado.' });
    });
  });

  // deleteImovel
  describe('deleteImovel', () => {
    it('deve excluir um imóvel sem notas vinculadas', async () => {
      Arquivo.countDocuments.mockResolvedValue(0);
      Imovel.findByIdAndDelete.mockResolvedValue({ _id: 'abc' });

      await deleteImovel(req, res);

      expect(res.json).toHaveBeenCalledWith({ message: 'Imóvel excluído com sucesso.' });
    });

    it('deve retornar 400 se houver notas vinculadas', async () => {
      Arquivo.countDocuments.mockResolvedValue(2);

      await deleteImovel(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Este imóvel possui notas vinculadas e não pode ser excluído.' });
    });

    it('deve retornar 404 se imóvel não for encontrado', async () => {
      Arquivo.countDocuments.mockResolvedValue(0);
      Imovel.findByIdAndDelete.mockResolvedValue(null);

      await deleteImovel(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Imóvel não encontrado.' });
    });
  });
});