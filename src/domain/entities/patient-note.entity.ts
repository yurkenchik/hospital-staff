import {
    BeforeInsert, BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity, getRepository,
    ManyToOne,
    PrimaryGeneratedColumn, Repository,
    UpdateDateColumn
} from "typeorm";
import {Patient} from "./patient.entity";
import {PatientNotFoundException} from "../../common/exceptions/not-found/patient-not-found.exception";

@Entity()
export class PatientNote {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    note: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    patientId: string;

    @ManyToOne(() => PatientNote, (patientNote) => patientNote.patient)
    patient: Patient;

    @BeforeInsert()
    @BeforeUpdate()
    async validateExistingPatient() {
        const patientRepository: Repository<Patient> = getRepository(Patient);
        const patient = await patientRepository
            .createQueryBuilder()
            .where("id = :patientId", { patientId: this.patient.id })
            .getOne();

        if (!patient) {
            throw new PatientNotFoundException();
        }
    }
}