import {Injectable} from "@nestjs/common";
import {DataSource} from "typeorm";
import {InsertIntoTableDto} from "../../../domain/dto/procedurs-manager/insert-into-table.dto";
import {InsertNonameStringDto} from "../../../domain/dto/procedurs-manager/insert-noname-strins.dto";
import {GetColumnStatsDto} from "../../../domain/dto/procedurs-manager/get-column-stats.dto";
import {InsertMmRelationDto} from "../../../domain/dto/patient-note/insert-mm-relation.dto";

@Injectable()
export class ProceduresManagerService {
    constructor(
        private readonly dataSource: DataSource
    ) {}

    async insertIntoTable(insertIntoTableDto: InsertIntoTableDto): Promise<any> {
        const { tableName, columnList, valueList } = insertIntoTableDto;
        const fullColumnList = `id, ${columnList}`;

        const valuesArray = valueList
            .split(',')
            .map(value => `'${value.trim()}'`);
        const fullValueList = `CONCAT("'", UUID(), "'", ",", "${valuesArray.join(", ")}")`;

        const query = `CALL insert_into_table(
            '${tableName}',
            '${fullColumnList}',
            ${fullValueList}
        )`

        const result = await this.dataSource.query(query);
        return result;
    }

    async insertNonameStrings(insertNonameStringDto: InsertNonameStringDto): Promise<void> {
        const { tableName, columnName } = insertNonameStringDto;

        const query = `CALL hospital_staff.InsertNonameStrings(?, ?)`;
        await this.dataSource.query(query, [tableName, columnName]);
    }

    async getColumnStats(getColumnStatsDto: GetColumnStatsDto): Promise<any> {
        const { tableName, columnName } = getColumnStatsDto;

        const query = `CALL hospital_staff.GetColumnStats(?, ?)`;
        const result = await this.dataSource.query(query, [tableName, columnName]);
        return result[0];
    }

    async insertMMRelation(insertMmRelationDto: InsertMmRelationDto): Promise<void> {
        const {
            joinTableName,
            mainTable1,
            mainTable2,
            column1,
            column2,
            value1,
            value2,
        } = insertMmRelationDto;

        const query = `CALL hospital_staff.InsertMMRelation(?, ?, ?, ?, ?, ?, ?)`;
        await this.dataSource.query(query, [
            joinTableName,
            mainTable1,
            mainTable2,
            column1,
            column2,
            value1,
            value2,
        ]);
    }

    async createDynamicTables(): Promise<void> {
        const query = `CALL hospital_staff.create_dynamic_tables()`;
        await this.dataSource.query(query);
    }
}