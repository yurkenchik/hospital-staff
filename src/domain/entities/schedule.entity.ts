import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from './doctor.entity';

@Entity('schedules')
export class Schedule {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Doctor, (doctor) => doctor.schedules, {
        onDelete: 'CASCADE',
    })
    doctor: Doctor;

    @Column()
    workDay: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;
}
