import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../Repositories/AppointmentsRepository';
import CreateAppointmentService from '../Services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.all();

    return response.json(appointments);
})

appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        // CONVERTE A DATA E HORA PASSADA.
        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(appointmentsRepository);

        const appointment = createAppointment.execute({ date: parsedDate, provider })

        return response.json(appointment)
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }
});


export default appointmentsRouter;
