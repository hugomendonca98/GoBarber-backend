import AppError from '@shared/Errors/appError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let autheticanteUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
        autheticanteUser = new AuthenticateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('should be able to authenticate', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        const response = await autheticanteUser.execute({
            email: 'johndoe@example.com',
            password: '12345',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should not be able to authenticate with non existing user', async () => {
        await expect(
            autheticanteUser.execute({
                email: 'johndoe@example.com',
                password: '12345',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with wrong password', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        await expect(
            autheticanteUser.execute({
                email: 'johndoe@example.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
