import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/fakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointmentsService: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderAppointmentsService', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();
        listProviderAppointmentsService = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the appointments on a specific day', async () => {
        const appoitment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: '123123',
            date: new Date(2021, 4, 20, 14, 0, 0),
        });

        const appoitment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: '123123',
            date: new Date(2021, 4, 20, 15, 0, 0),
        });

        const appointments = await listProviderAppointmentsService.execute({
            provider_id: 'provider',
            year: 2021,
            month: 5,
            day: 20,
        });

        expect(appointments).toEqual([appoitment1, appoitment2]);
    });
});
