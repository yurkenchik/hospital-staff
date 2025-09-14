import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AppointmentOrmEntity } from './appointment-orm.entity';
import { MedicalRecordOrmEntity } from './medical-record-orm.entity';
import { Birthdate } from "../../core/value-objects/birthdate.vo";
import { PhoneNumber } from "../../core/value-objects/phone-number.vo";

@Entity('patients')
export class PatientOrmEntity {
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

    @OneToMany(() => AppointmentOrmEntity, (appointment) => appointment.patient, { cascade: true })
    appointments: Array<AppointmentOrmEntity>;

    @OneToMany(() => MedicalRecordOrmEntity, (record) => record.patient, { cascade: true })
    medicalRecords: Array<MedicalRecordOrmEntity>;

    applyUpdates(updateData: Partial<PatientOrmEntity>) {
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