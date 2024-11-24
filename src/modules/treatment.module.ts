import {Module} from "@nestjs/common";
import {TreatmentService} from "../infrastrcuture/services/treatment.service";
import {TreatmentController} from "../presentation/controllers/treatment.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Treatment} from "../domain/entities/treatment.entity";

@Module({
    providers: [TreatmentService],
    controllers: [TreatmentController],
    imports: [TypeOrmModule.forFeature([Treatment])],
    exports: [TreatmentService]
})
export class TreatmentModule {}