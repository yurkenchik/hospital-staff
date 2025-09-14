import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AppointmentOrmEntity } from './appointment-orm.entity';
import { ScheduleOrmEntity } from './schedule-orm.entity';
import { MedicalRecordOrmEntity } from './medical-record-orm.entity';
import { Email } from "../../core/value-objects/email.vo";
import { PhoneNumber } from "../../core/value-objects/phone-number.vo";

@Entity('doctors')
export class DoctorOrmEntity {
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

    @OneToMany(() => AppointmentOrmEntity, (appointment) => appointment.doctor, { cascade: true })
    appointments: Array<AppointmentOrmEntity>;

    @OneToMany(() => ScheduleOrmEntity, (schedule) => schedule.doctor, { cascade: true })
    schedules: Array<ScheduleOrmEntity>;

    @OneToMany(() => MedicalRecordOrmEntity, (record) => record.doctor, { cascade: true })
    medicalRecords: Array<MedicalRecordOrmEntity>;

    applyUpdates(updateData: Partial<DoctorOrmEntity>) {
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
