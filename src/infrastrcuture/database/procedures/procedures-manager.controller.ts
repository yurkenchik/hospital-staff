import {
    Controller,
    Post,
    Body,
    Get,
    HttpCode,
    HttpStatus, Query,
} from '@nestjs/common';
import {InsertIntoTableDto} from "../../../domain/dto/procedurs-manager/insert-into-table.dto";
import {InsertNonameStringDto} from "../../../domain/dto/procedurs-manager/insert-noname-strins.dto";
import {ProceduresManagerService} from "./procedures-manager.service";
import {GetColumnStatsDto} from "../../../domain/dto/procedurs-manager/get-column-stats.dto";
import {InsertMmRelationDto} from "../../../domain/dto/patient-note/insert-mm-relation.dto";

@Controller('procedures-manager')
export class ProceduresManagerController {
    constructor(private readonly proceduresManagerService: ProceduresManagerService) {}

    @Post('insert-into-table')
    @HttpCode(HttpStatus.CREATED)
    async insertIntoTable(
        @Body() insertIntoTableDto: InsertIntoTableDto,
    ): Promise<void> {
        await this.proceduresManagerService.insertIntoTable(insertIntoTableDto);
    }

    @Post('insert-noname-strings')
    @HttpCode(HttpStatus.CREATED)
    async insertNonameStrings(
        @Body() insertNonameStringDto: InsertNonameStringDto,
    ): Promise<void> {
        await this.proceduresManagerService.insertNonameStrings(insertNonameStringDto);
    }

    @Get('column-stats')
    @HttpCode(HttpStatus.OK)
    async getColumnStats(
        @Query() getColumnStatsDto: GetColumnStatsDto,
    ): Promise<any> {
        return this.proceduresManagerService.getColumnStats(getColumnStatsDto);
    }

    @Post('insert-mm-relation')
    @HttpCode(HttpStatus.CREATED)
    async insertMMRelation(
        @Body() insertMmRelationDto: InsertMmRelationDto,
    ): Promise<void> {
        await this.proceduresManagerService.insertMMRelation(insertMmRelationDto);
    }

    @Post('create-dynamic-tables')
    @HttpCode(HttpStatus.CREATED)
    async createDynamicTables(): Promise<void> {
        await this.proceduresManagerService.createDynamicTables();
    }
}
