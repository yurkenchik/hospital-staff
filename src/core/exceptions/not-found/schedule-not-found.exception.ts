import {HttpException, HttpStatus} from "@nestjs/common";

export class ScheduleNotFoundException extends HttpException {
    constructor() {
        super("Schedule not found", HttpStatus.NOT_FOUND)
    }
}