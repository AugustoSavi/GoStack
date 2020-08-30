import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepositoty';

interface RequestDto {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    private appointmentRepository: AppointmentRepository;

    constructor(appointmentsRepository: AppointmentRepository) {
        this.appointmentRepository = appointmentsRepository;
    }

    public execute({ date, provider }: RequestDto): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentsInSameDate = this.appointmentRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentsInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
