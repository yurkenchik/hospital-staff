import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BeforeInsert, BeforeUpdate, BeforeRemove} from 'typeorm';
import { Appointment } from './appointment.entity';
import {ForbiddenException} from "@nestjs/common";

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

    @BeforeUpdate()
    @BeforeRemove()
    preventModifications() {
        throw new ForbiddenException('Modifications to the billing table are not allowed.');
    }
}
