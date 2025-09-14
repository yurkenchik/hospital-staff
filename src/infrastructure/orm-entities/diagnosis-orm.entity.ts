import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('diagnoses')
export class DiagnosisOrmEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "diagnosis_name" })
    diagnosisName: string;

    @Column({ nullable: true })
    description: string;
}