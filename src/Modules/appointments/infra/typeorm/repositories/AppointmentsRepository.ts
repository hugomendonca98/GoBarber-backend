import { EntityRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointments from '../entities/Appointments';

@EntityRepository(Appointments)
class AppointmentsRepository
    extends Repository<Appointments>
    implements IAppointmentsRepository {
    public async findByDate(date: Date): Promise<Appointments | undefined> {
        const findAppointment = await this.findOne({
            where: { date }, // baiscamente pega um que a data for igual.
        });

        return findAppointment || undefined;
    }
}

export default AppointmentsRepository;
