import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { PatientOrmEntity } from './patient-orm.entity';
import { DoctorOrmEntity } from './doctor-orm.entity';
import { BillingOrmEntity } from './billing-orm.entity';

@Entity('appointments')
export class AppointmentOrmEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    appointmentDate: Date;

    @Column()
    cost: number;

    @OneToMany(() => BillingOrmEntity, (billing) => billing.appointment, { cascade: true })
    billings: Array<BillingOrmEntity>;

    @ManyToOne(() => PatientOrmEntity, (patient) => patient.appointments, { onDelete: 'CASCADE' })
    patient: PatientOrmEntity;

    @ManyToOne(() => DoctorOrmEntity, (doctor) => doctor.appointments, { onDelete: 'CASCADE' })
    doctor: DoctorOrmEntity;
}
