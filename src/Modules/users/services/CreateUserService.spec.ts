import AppError from '@shared/Errors/appError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import FakeUserRepository from '../repositories/fakes/fakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with same eamil another', async () => {
        const fakeUserRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        expect(
            createUser.execute({
                name: 'John Doe',
                email: 'johndoe@example.com',
                password: '12345',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
