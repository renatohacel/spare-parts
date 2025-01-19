import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config/config.js';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies['acces-token'];
    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_JWT_KEY);
        req.session = { user: decoded };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
};


