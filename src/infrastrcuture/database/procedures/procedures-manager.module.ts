import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProceduresManagerService} from "./procedures-manager.service";
import {ProceduresManagerController} from "./procedures-manager.controller";

@Module({
    providers: [ProceduresManagerService],
    controllers: [ProceduresManagerController],
    imports: [TypeOrmModule],
    exports: [ProceduresManagerService],
})
export class ProceduresManagerModule {}