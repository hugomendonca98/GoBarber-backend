import AppError from '@shared/Errors/appError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        resetPasswordService = new ResetPasswordService(
            fakeUserRepository,
            fakeUserTokensRepository,
        );
    });

    it('should be able to reset the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        await resetPasswordService.execute({
            token,
            password: 'newPassword',
        });

        const updatedUser = await fakeUserRepository.findById(user.id);

        expect(updatedUser?.password).toBe('newPassword');
    });
});
