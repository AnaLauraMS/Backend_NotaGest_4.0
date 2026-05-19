import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/server.js';

describe('Rotas e Middleware de Autenticação - Integration Tests', () => {
  it('Deve retornar 401 Unauthorized ao tentar acessar /api/uploads sem token', async () => {
    const response = await request(app).get('/api/uploads');
    expect(response.status).toBe(401);
    expect(response.body.message).toContain('Não autorizado');
  });

  it('Deve retornar 401 Unauthorized ao tentar acessar com token nulo ou vazio', async () => {
    const response = await request(app)
      .get('/api/uploads')
      .set('Authorization', 'Bearer null');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Não autorizado, token nulo');
  });

  it('Deve retornar 401 com mensagem de erro caso o token seja inválido/malformado', async () => {
    const response = await request(app)
      .get('/api/uploads')
      .set('Authorization', 'Bearer invalid-token-string');
    expect(response.status).toBe(401);
    expect(response.body.message).toContain('Token inválido');
  });
});
