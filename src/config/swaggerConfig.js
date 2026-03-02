const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 5000;

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Principal - NotaGest',
      version: '1.0.0',
      description: 'Backend principal da aplicação NotaGest, responsável por usuários, uploads e gerenciamento de imóveis.',
      contact: { name: 'Equipe NotaGest', email: 'contato@notagest.com' },
    },
    servers: [
      { 
        url: process.env.BACKEND_URL || `http://localhost:${PORT}`, 
        description: 'Servidor da API NotaGest'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '671a9a2239fbd101bf4d3cc5' },
            name: { type: 'string', example: 'Ana Laura' },
            email: { type: 'string', example: 'ana@example.com' },
            createdAt: { type: 'string', example: '2025-10-20T12:00:00Z' },
          }
        },
        Arquivo: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '671a9b5d39fbd101bf4d3cc7' },
            user: { type: 'string', example: '671a9a2239fbd101bf4d3cc5' },
            title: { type: 'string', example: 'Nota fiscal de cimento' },
            value: { type: 'number', example: 350.5 },
            purchaseDate: { type: 'string', example: '2025-09-01' },
            property: { type: 'string', example: 'Obra da Casa Nova' },
            category: { type: 'string', example: 'Materiais' },
            subcategory: { type: 'string', example: 'Construção' },
            observation: { type: 'string', example: 'Compra feita na loja ConstruMais' },
            filePath: { type: 'string', example: '/uploads/1718205958340-nota-cimento.pdf' },
          }
        },
        Imovel: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '671a9cdd39fbd101bf4d3cca' },
            nome: { type: 'string', example: 'Casa Nova' },
            cep: { type: 'string', example: '18040-300' },
            rua: { type: 'string', example: 'Rua das Palmeiras' },
            numero: { type: 'string', example: '123' },
            bairro: { type: 'string', example: 'Centro' },
            cidade: { type: 'string', example: 'Sorocaba' },
            estado: { type: 'string', example: 'SP' },
            tipo: { type: 'string', example: 'Residencial' },
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Mensagem de erro' }
          }
        }
      }
    }
  },
  apis: ['./../docs/swaggerPaths.js', './routes/**/*.js'] 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger rodando em /api-docs");
};

module.exports = setupSwagger;
