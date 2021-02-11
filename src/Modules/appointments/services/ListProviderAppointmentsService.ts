import { injectable, inject } from 'tsyringe';

import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

@injectable()
class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        day,
        year,
        month,
    }: IRequest): Promise<Appointments[]> {
        const appointments = this.appointmentsRepository.findAllInDayFromProvider(
            {
                provider_id,
                day,
                year,
                month,
            },
        );

        return appointments;
    }
}

export default ListProviderAppointmentsService;
