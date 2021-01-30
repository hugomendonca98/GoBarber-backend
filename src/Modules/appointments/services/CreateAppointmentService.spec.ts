import AppError from '@shared/Errors/appError';
import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppontmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppontmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '1234512345',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1234512345');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const fakeAppontmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppontmentsRepository,
        );

        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '1234512345',
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '1234512345',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
