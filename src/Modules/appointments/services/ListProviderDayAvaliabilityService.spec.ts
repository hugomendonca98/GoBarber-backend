import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import ListProviderDayAvaliabilityService from './ListProviderDayAvaliabilityService';

let listProviderDayAvaliabilityService: ListProviderDayAvaliabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvaliabilityService = new ListProviderDayAvaliabilityService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the day availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2021, 4, 20, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            date: new Date(2021, 4, 20, 10, 0, 0),
        });

        const availability = await listProviderDayAvaliabilityService.execute({
            provider_id: 'user',
            year: 2021,
            month: 5,
            day: 20,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, avaliable: false },
                { hour: 9, avaliable: true },
                { hour: 10, avaliable: false },
                { hour: 11, avaliable: true },
            ]),
        );
    });
});
