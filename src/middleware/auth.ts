import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IAuthRequest } from '../interfaces/IAuthRequest.js';
import dotenv from 'dotenv';

dotenv.config();

export const protect = (req: IAuthRequest, res: Response, next: NextFunction) => {
    console.log(`\n Middleware "protect" acionado para: ${req.method} ${req.originalUrl}`); 

    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            if (!token || token === 'null') {
                 console.error(' Token é nulo ou "null". Não autorizado.');
                 return res.status(401).json({ message: 'Não autorizado, token nulo' });
            }

            const secret = process.env.JWT_SECRET as string;
            // Tipamos o decoded como um objeto que contém id e email
            const decoded = jwt.verify(token, secret) as { id: string; email: string };
    
            req.user = { 
                id: decoded.id, 
                email: decoded.email 
            }; 
   
            next();
        } catch (error: any) {
            console.error('FALHA NA VERIFICAÇÃO DO TOKEN:', error.message);
            return res.status(401).json({ message: `Token inválido: ${error.message}` });
        }
    } else {
        console.error('Não autorizado, cabeçalho de autorização não fornecido.');
        return res.status(401).json({ message: 'Não autorizado, token não fornecido.' });
    }
};

// Se o seu server.ts ou routes importam como 'import protect from...', adicione isso:
export default protect;