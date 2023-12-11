import { Request } from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            tipo: string;
            id: string;
            email: string;
            password: string
            iat: number
        };
    }
}