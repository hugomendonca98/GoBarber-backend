import { getRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointments from '../entities/Appointments';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointments>;
    constructor() {
        this.ormRepository = getRepository(Appointments);
    }
    public async findByDate(date: Date): Promise<Appointments | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment || undefined;
    }

    public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointments> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
