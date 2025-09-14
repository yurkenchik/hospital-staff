import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AppointmentOrmEntity } from './appointment-orm.entity';

@Entity('billing')
export class BillingOrmEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    amount: number;

    @Column()
    paymentDate: Date;

    @ManyToOne(() => AppointmentOrmEntity, (appointment) => appointment.billings, { onDelete: 'CASCADE' })
    appointment: AppointmentOrmEntity;
}
