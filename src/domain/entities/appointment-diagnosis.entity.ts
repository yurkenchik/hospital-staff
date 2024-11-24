import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Appointment } from './appointment.entity';
import { Diagnosis } from './diagnosis.entity';

@Entity('appointment_diagnosis')
export class AppointmentDiagnosis {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Appointment, (appointment) => appointment.appointmentDiagnoses, {
        onDelete: 'CASCADE',
    })
    appointment: Appointment;

    @ManyToOne(() => Diagnosis, (diagnosis) => diagnosis.appointmentDiagnoses, {
        onDelete: 'CASCADE',
    })
    diagnosis: Diagnosis;
}