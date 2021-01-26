import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/Errors/appError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class AuthenticateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwrodMatchd = await compare(password, user.password);

        if (!passwrodMatchd) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const { secret, expireIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expireIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
