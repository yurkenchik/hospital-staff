import {Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate, getRepository} from 'typeorm';
import { Appointment } from './appointment.entity';
import { MedicalRecord } from './medical-record.entity';
import {PatientTreatment} from "./patient-treatment";
import {Birthdate} from "../value-objects/birthdate.vo";
import {PhoneNumber} from "../value-objects/phone-number.vo";
import {PatientNote} from "./patient-note.entity";
import {BadRequestException} from "@nestjs/common";
import {AccessFirstNames} from "../../common/enums/access-first-names.enum";

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

    @OneToMany(() => PatientNote, (patientNote) => patientNote.patient, { cascade: true })
    patientNotes: PatientNote[];

    @BeforeInsert()
    @BeforeUpdate()
    async validatePhoneNumberEnding() {
        const phoneNumber = new PhoneNumber(this.phoneNumber).getValue();

        if (phoneNumber.endsWith("00")) {
            throw new BadRequestException("Phone number can not end with 00");
        }
    }

    @BeforeInsert()
    async validatePatientFirstName() {
        const allowedFirstNames = ["Svitlana", "Petro", "Olha", "Taras"];

        if (!allowedFirstNames.includes(this.firstName)) {
            throw new BadRequestException(
                "This first name is now allowed, allowed only Svitlana, Petro, Olha or Taras"
            );
        }
    }
}