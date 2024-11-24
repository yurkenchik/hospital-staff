import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';
import { MedicalRecord } from './medical-record.entity';
import {PatientTreatment} from "./patient-treatment";
import {Birthdate} from "../value-objects/birthdate.vo";
import {PhoneNumber} from "../value-objects/phone-number.vo";

@Entity('patients')
export class Patient {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthdate: string;

    @Column()
    phoneNumber: string;

    @OneToMany(() => Appointment, (appointment) => appointment.patient, {
        cascade: true,
    })
    appointments: Appointment[];

    @OneToMany(() => MedicalRecord, (record) => record.patient, {
        cascade: true,
    })
    medicalRecords: MedicalRecord[];

    @OneToMany(() => PatientTreatment, patientTreatment => patientTreatment.patient, {
        cascade: true,
    })
    patientTreatments: PatientTreatment[];

    applyUpdates(updateData: Partial<Patient>) {
        if (updateData.firstName) this.firstName = updateData.firstName;
        if (updateData.lastName) this.lastName = updateData.lastName;
        if (updateData.birthdate) {
            this.birthdate = new Birthdate(updateData.birthdate).getValue();
        }
        if (updateData.phoneNumber) {
            this.phoneNumber = new PhoneNumber(updateData.phoneNumber).getValue();
        }
    }
}