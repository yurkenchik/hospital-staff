import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeUpdate} from 'typeorm';
import { Appointment } from './appointment.entity';
import { Schedule } from './schedule.entity';
import { MedicalRecord } from './medical-record.entity';
import {Email} from "../value-objects/email.vo";
import {PhoneNumber} from "../value-objects/phone-number.vo";

@Entity('doctors')
export class Doctor {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    specialization: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @OneToMany(() => Appointment, (appointment) => appointment.doctor, {
        cascade: true
    })
    appointments: Appointment[];

    @OneToMany(() => Schedule, (schedule) => schedule.doctor, {
        cascade: true
    })
    schedules: Schedule[];

    @OneToMany(() => MedicalRecord, (record) => record.doctor, {
        cascade: true
    })
    medicalRecords: MedicalRecord[];

    applyUpdates(updateData: Partial<Doctor>) {
        if (updateData.email) {
            this.email = new Email(updateData.email).getValue();
        }
        if (updateData.phoneNumber) {
            this.phoneNumber = new PhoneNumber(updateData.phoneNumber).getValue();
        }
        if (updateData.firstName) this.firstName = updateData.firstName;
        if (updateData.lastName) this.lastName = updateData.lastName;
        if (updateData.specialization) this.specialization = updateData.specialization;
    }
}
