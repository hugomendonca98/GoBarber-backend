import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';
import authConfig from '../Config/auth';

import AppError from '../Errors/appError';

import User from '../Models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwrodMatchd = await compare(password, user.password);

        if (!passwrodMatchd) {
            throw new AppError('Incorrect email/password combination.', 401)
        }

        const { secret, expireIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expireIn,
        });

        return {
            user,
            token,
        }
    }
}

export default AuthenticateUserService;
