import AppError from '@shared/Errors/appError';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();

        showProfileService = new ShowProfileService(fakeUserRepository);
    });

    it('should be able show the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        const profile = await showProfileService.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('John Doe');
        expect(profile.email).toBe('johndoe@example.com');
    });

    it('should not be able show the profile from non-existing user', async () => {
        expect(
            showProfileService.execute({
                user_id: 'non-existing-user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
