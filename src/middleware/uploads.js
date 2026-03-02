// middleware/upload.js
const multer = require('multer'); // Middleware para upload de arquivos
const path = require('path'); // Módulo nativo para trabalhar com caminhos de arquivos
const fs = require('fs'); // Módulo nativo para interações com o sistema de arquivos

/**
 * @function ensureUserDirExists
 * @description Garante que um diretório de upload específico para o usuário exista.
 * Se o diretório não existir, ele é criado.
 * @param {string} userId - ID do usuário logado.
 * @returns {string} O caminho completo para o diretório do usuário.
 */
const ensureUserDirExists = (userId) => {
    // Define o caminho do diretório dentro da pasta 'uploads'
    const userDirPath = path.join('uploads', userId.toString()); 
    
    // Verifica se a pasta já existe
    if (!fs.existsSync(userDirPath)) {
        // Cria a pasta, incluindo pastas pai, se necessário
        fs.mkdirSync(userDirPath, { recursive: true }); 
    }
    return userDirPath;
};

// Configuração de armazenamento do Multer (define onde e como salvar o arquivo)
const storage = multer.diskStorage({
    // Função que determina o destino final do arquivo
    destination: function (req, file, cb) {
        // Usa o ID do usuário (vindo do token JWT) para definir a pasta de destino
        const userDirPath = ensureUserDirExists(req.user.id); 
        cb(null, userDirPath);
    },
    // Função que determina o nome do arquivo salvo
    filename: function (req, file, cb) {
        // Gera uma sequência única para garantir que não haja arquivos com o mesmo nome
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Combina a sequência única com a extensão original do arquivo
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});

// Filtro de arquivo (opcional - exemplo para aceitar apenas alguns tipos)
// const fileFilter = (req, file, cb) => {
//   // Lógica para checar o tipo MIME
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
//     cb(null, true);
//   } else {
//     cb(new Error('Formato de arquivo não suportado!'), false);
//   }
// };

// Inicializa o Multer com as configurações
const upload = multer({ 
    storage: storage,
    // fileFilter: fileFilter, // Descomente para usar o filtro de tipo
    // limits: { fileSize: 1024 * 1024 * 5 } // Opcional: Define limite de tamanho
});

// Exporta o middleware configurado para lidar com um único arquivo de campo 'file'
module.exports = upload.single('file');