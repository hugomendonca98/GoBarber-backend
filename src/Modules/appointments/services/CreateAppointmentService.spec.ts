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

    /* it('should not be able to create two appointments on the same time', () => {
        expect(1 + 2).toBe(3);
    }); */
});
