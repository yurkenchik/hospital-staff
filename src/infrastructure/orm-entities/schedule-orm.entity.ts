import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { DoctorOrmEntity } from './doctor-orm.entity';

@Entity('schedules')
export class ScheduleOrmEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    workDay: string;

    @Column()
    startTime: string;

    @Column()
    endTime: string;

    @ManyToOne(() => DoctorOrmEntity, (doctor) => doctor.schedules, { onDelete: 'CASCADE' })
    doctor: DoctorOrmEntity;

}
