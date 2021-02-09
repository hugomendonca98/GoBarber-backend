import AppError from '@shared/Errors/appError';
import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppontmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppontmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppontmentsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            user_id: '123123',
            provider_id: '1234512345',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1234512345');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            user_id: '123123',
            provider_id: '1234512345',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: '123123',
                provider_id: '1234512345',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
