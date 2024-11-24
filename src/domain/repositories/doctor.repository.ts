import {Doctor} from "../entities/doctor.entity";

export abstract class DoctorRepository {
    abstract getDoctorById(doctorId: string): Promise<Doctor>;
    abstract getDoctors(): Promise<Array<Doctor>>;
}