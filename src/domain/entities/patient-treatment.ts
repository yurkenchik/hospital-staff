import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Patient } from './patient.entity';
import { Treatment } from './treatment.entity';

@Entity('patient_treatment')
export class PatientTreatment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Patient, (patient) => patient.patientTreatments, {
        onDelete: 'CASCADE',
    })
    patient: Patient;

    @ManyToOne(() => Treatment, (treatment) => treatment.patientTreatments, {
        onDelete: 'CASCADE',
    })
    treatment: Treatment;
}