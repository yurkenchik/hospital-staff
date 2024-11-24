import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {PatientTreatment} from "./patient-treatment";

@Entity('treatments')
export class Treatment {
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

    @OneToMany(() => PatientTreatment, patientTreatment => patientTreatment.treatment, {
        cascade: true,
    })
    patientTreatments: PatientTreatment[];
}