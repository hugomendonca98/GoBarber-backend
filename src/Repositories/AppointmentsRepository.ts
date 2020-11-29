import Appointments from '../Models/Appointments';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(Appointments)
class AppointmentsRepository extends Repository<Appointments> {
    public async findByDate(date: Date): Promise<Appointments | null> {

        const findAppointment = await this.findOne({
            where: { date }, // baiscamente pega um que a data for igual.
        });

        return findAppointment || null;
    }

}

export default AppointmentsRepository;
