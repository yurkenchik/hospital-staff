import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('treatments')
export class TreatmentOrmEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    treatmentDescription: string;

    @Column()
    cost: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;
}