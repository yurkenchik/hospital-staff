import { MedicalRecordOrmEntity } from "@infrastructure/orm-entities/medical-record-orm.entity";
import { MedicalRecordDomainEntity } from "@domain/medical-record/entities/medical-record-domain.entity";
import { PatientOrmMapper } from "@core/mappers/orm/patiner-orm.mapper";
import { DoctorOrmMapper } from "@core/mappers/orm/doctor-orm.mapper";

export class MedicalRecordOrmMapper {
    static toDomainEntity(ormEntity: MedicalRecordOrmEntity): MedicalRecordDomainEntity {
        return new MedicalRecordDomainEntity(
            ormEntity.id,
            ormEntity.visitDate,
            ormEntity.notes,
            ormEntity.patient?.id,
            ormEntity.doctor?.id,
        );
    }

    static toOrmEntity(domainEntity: MedicalRecordDomainEntity): MedicalRecordOrmEntity {
        const entity = new MedicalRecordOrmEntity();
        entity.id = domainEntity.id;
        entity.visitDate = domainEntity.visitDate;
        entity.notes = domainEntity.notes;
        if (domainEntity.patientId) entity.patient = PatientOrmMapper.toOrmEntityIdOnly(domainEntity.patientId);
        if (domainEntity.doctorId) entity.doctor = DoctorOrmMapper.toOrmEntityIdOnly(domainEntity.doctorId);
        return entity;
    }
}
