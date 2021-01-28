import { v4 as uuid } from 'uuid';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointments from '../../infra/typeorm/entities/Appointments';

class FakeAppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointments[] = [];

    public async findByDate(date: Date): Promise<Appointments | undefined> {
        const findAppointment = this.appointments.find(
            appointment => appointment.date === date,
        );

        return findAppointment;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointments> {
        const appointment = new Appointments();

        appointment.id = uuid();
        appointment.date = date;
        appointment.provider_id = provider_id;

        this.appointments.push(appointment);

        return appointment;
    }
}

export default FakeAppointmentsRepository;
