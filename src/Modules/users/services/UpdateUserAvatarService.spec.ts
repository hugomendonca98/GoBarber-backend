import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/Errors/appError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let uptadeUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeStorageProvider = new FakeStorageProvider();

        uptadeUserAvatar = new UpdateUserAvatarService(
            fakeUserRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        await uptadeUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatar from non existing user', async () => {
        await expect(
            uptadeUserAvatar.execute({
                user_id: 'non-existing-user',
                avatarFilename: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when update new one', async () => {
        const deleFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        await uptadeUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });

        await uptadeUserAvatar.execute({
            user_id: user.id,
            avatarFilename: 'avatar2.jpg',
        });

        expect(deleFile).toHaveBeenCalledWith('avatar.jpg');

        expect(user.avatar).toBe('avatar2.jpg');
    });
});
