const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/mongoDb');
const setupSwagger = require('./config/swaggerConfig');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const arquivoRoutes = require('./routes/arquivosRoutes.js');
const imovelRoutes = require('./routes/imovelRoutes');
const uploadFileRoutes = require('./routes/uploadFileRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://nota-gest.vercel.app'
  ],
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

app.use(express.json());

// Swagger
setupSwagger(app);

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/uploads', arquivoRoutes);
app.use('/api/imoveis', imovelRoutes);
app.use('/api/uploadfile', uploadFileRoutes);
// Servir arquivos da pasta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 404
app.use((req, res) => res.status(404).json({ message: 'Rota não encontrada' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend rodando na porta ${PORT}`));
