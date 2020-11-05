import { isEqual } from 'date-fns';
import Appointments from '../Models/Appointments';

// DATA TRANSFER OBJECT
interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointments[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointments[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointments | null {
        // VERIFICA SE JÁ TEM UMA DATA IGUAL A ENVIADA PELO USUARIO, CASO NÃO EXISTA ELE RETORNA FALSE, CASO EXISTA ELE RETORNA O OBJ APPOINTMENT IGUAL.
        const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date));

        return findAppointment || null;
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointments {
        // MANDANDO OS DADOS PARA O MODEL QUE VAI DEFINIR O TIPO E MONTAR O OBJ PARA SER ARMAZENADO.
        const appointment = new Appointments({ provider, date })

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
