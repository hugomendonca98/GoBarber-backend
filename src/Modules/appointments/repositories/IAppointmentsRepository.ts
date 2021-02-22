import IFindAllInDayFromProviderDTO from '../dtos/findAllInDayFromProviderDTO';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import Appointments from '../infra/typeorm/entities/Appointments';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointments>;

    findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointments | undefined>;

    findAllInMonthFromProvider(
        data: IFindAllInMonthFromProviderDTO,
    ): Promise<Appointments[]>;

    findAllInDayFromProvider(
        data: IFindAllInDayFromProviderDTO,
    ): Promise<Appointments[]>;
}
