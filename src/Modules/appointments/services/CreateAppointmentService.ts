import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/Errors/appError';

import Appointment from '../infra/typeorm/entities/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        // USA O MÉTODO CRIADO NO REPOSITORY PARA VERIFICAR SE A DATA PASSADA JÁ EXISTE.
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        // CASO JÁ EXISTA UMA DATA IGUAL A PASSADA RETORNA ESSE ERRO:
        if (findAppointmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }

        // SE A DATA PASSADA FOR UMA DATA NOVA ELE EXECUTA O MÉTODO CREATE DO NOSSO REPOSITORY.
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
