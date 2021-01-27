import 'reflect-metadata'; // para poder o ts entender a sintax de entidades.

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/upload';
import AppError from '@shared/Errors/appError';
import routes from './Routes';

import '@shared/Infra/Typeorm';

import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.error(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log('Server Started on port 3333');
});
