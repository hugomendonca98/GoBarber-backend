import Appointments from '../infra/typeorm/entities/Appointments';

export default interface IAppointmentsRepository {
    findByDate(date: Date): Promise<Appointments | undefined>;
}
