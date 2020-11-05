import { startOfHour } from 'date-fns';
import Appointment from '../Models/Appointments';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';

interface RequestDTO {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;
    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;

    }
    public execute({ provider, date }: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date);

        // USA O MÉTODO CRIADO NO REPOSITORY PARA VERIFICAR SE A DATA PASSADA JÁ EXISTE.
        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

        // CASO JÁ EXISTA UMA DATA IGUAL A PASSADA RETORNA ESSE ERRO:
        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        // SE A DATA PASSADA FOR UMA DATA NOVA ELE EXECUTA O MÉTODO CREATE DO NOSSO REPOSITORY.
        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
