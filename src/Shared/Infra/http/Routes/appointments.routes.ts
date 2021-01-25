import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../../../../Modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '../../../../Modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '../Middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);


appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
})

appointmentsRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body;

    // CONVERTE A DATA E HORA PASSADA.
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({ date: parsedDate, provider_id })

    return response.json(appointment)

});


export default appointmentsRouter;
