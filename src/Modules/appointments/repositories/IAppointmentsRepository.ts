import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import Appointments from '../infra/typeorm/entities/Appointments';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointments>;
    findByDate(date: Date): Promise<Appointments | undefined>;
}
