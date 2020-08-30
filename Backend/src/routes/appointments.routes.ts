import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepositoty';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.get('/', (Request, Response) => {
    const appointments = appointmentRepository.all();

    return Response.json(appointments);
});

appointmentsRouter.post('/', (Request, Response) => {
    try {
        const { provider, date } = Request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(
            appointmentRepository,
        );

        const appointment = createAppointment.execute({
            date: parsedDate,
            provider,
        });

        return Response.json(appointment);
    } catch (err) {
        return Response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
