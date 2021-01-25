import 'reflect-metadata'; // para poder o ts entender a sintax de entidades.

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './Shared/Routes'
import uploadConfig from './Config/upload';
import AppError from './Shared/Errors/appError';

import './Shared/Database/index';

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
    console.log('Server Started on port 3333')
});
