import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();

        listProvidersService = new ListProvidersService(fakeUserRepository);
    });

    it('should be able to show lit the providers', async () => {
        const userOne = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345',
        });

        const userTwo = await fakeUserRepository.create({
            name: 'John trê',
            email: 'johntre@example.com',
            password: '12345',
        });

        const loggedUser = await fakeUserRepository.create({
            name: 'John Qua',
            email: 'johnqua@example.com',
            password: '12345',
        });

        const providers = await listProvidersService.execute({
            except_user_id: loggedUser.id,
        });

        expect(providers).toEqual([userOne, userTwo]);
    });
});
