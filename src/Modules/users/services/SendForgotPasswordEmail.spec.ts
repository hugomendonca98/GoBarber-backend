import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import FakeUserRepository from '../repositories/fakes/fakeUsersRepository';
import SendForgotPasswordMailService from './SendForgotPasswordEmail';

describe('SendForgotPasswordEmail', () => {
    it('should be able to recovery the password using the email', async () => {
        const fakeUserRepository = new FakeUserRepository();

        const fakeMailProvider = new FakeMailProvider();

        const sendForgotPasswordMail = new SendForgotPasswordMailService(
            fakeUserRepository,
            fakeMailProvider,
        );

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        await sendForgotPasswordMail.execute({
            email: 'johndoe@example.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });
});
