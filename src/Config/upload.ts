import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

interface IUploadConfig {
    driver: 's3' | 'disk';
    uploadsFolder: string;
    tempFolder: string;

    multer: {
        storage: StorageEngine;
    };

    config: {
        disk: Record<string, unknown>;
        aws: {
            bucket: string;
        };
    };
}

export default {
    driver: process.env.STORAGE_DRIVER,

    tempFolder,
    uploadsFolder: path.resolve(tempFolder, 'uploads'),

    multer: {
        storage: multer.diskStorage({
            destination: tempFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const fileName = `${fileHash}-${file.originalname}`;

                return callback(null, fileName);
            },
        }),
    },

    config: {
        disk: {},
        aws: {
            bucket: 'app-gobarber-hugo',
        },
    },
} as IUploadConfig;
