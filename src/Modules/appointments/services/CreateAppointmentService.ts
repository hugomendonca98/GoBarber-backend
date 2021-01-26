import { startOfHour } from 'date-fns';

import AppError from '@shared/Errors/appError';

import Appointment from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    constructor(private appointmentsRepository: IAppointmentsRepository) {}

    public async execute({
        provider_id,
        date,
    }: IRequestDTO): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        // USA O MÉTODO CRIADO NO REPOSITORY PARA VERIFICAR SE A DATA PASSADA JÁ EXISTE.
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        // CASO JÁ EXISTA UMA DATA IGUAL A PASSADA RETORNA ESSE ERRO:
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        // SE A DATA PASSADA FOR UMA DATA NOVA ELE EXECUTA O MÉTODO CREATE DO NOSSO REPOSITORY.
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
