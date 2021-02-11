import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/Middlewares/ensureAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProvidersAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProvidersAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
