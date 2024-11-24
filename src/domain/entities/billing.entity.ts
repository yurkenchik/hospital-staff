import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity('billing')
export class Billing {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Appointment, (appointment) => appointment.billings, {
        onDelete: 'CASCADE',
    })
    appointment: Appointment;

    @Column()
    amount: number;

    @Column()
    paymentDate: Date;
}
