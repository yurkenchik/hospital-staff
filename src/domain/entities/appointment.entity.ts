import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';
import { Billing } from './billing.entity';
import { AppointmentDiagnosis } from './appointment-diagnosis.entity';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Patient, (patient) => patient.appointments, {
        onDelete: 'CASCADE',
    })
    patient: Patient;

    @ManyToOne(() => Doctor, (doctor) => doctor.appointments, {
        onDelete: 'CASCADE'
    })
    doctor: Doctor;

    @Column()
    appointmentDate: Date;

    @Column()
    cost: number;

    @OneToMany(() => Billing, (billing) => billing.appointment, {
        cascade: true,
    })
    billings: Billing[];

    @OneToMany(() => AppointmentDiagnosis, (ad) => ad.appointment, {
        cascade: true
    })
    appointmentDiagnoses: AppointmentDiagnosis[];
}
