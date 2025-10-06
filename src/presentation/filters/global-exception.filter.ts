import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    private readonly logger: Logger = new Logger(GlobalExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : exception;

        this.logger.error('Exception caught:', exception);

        if (response) {
            response.status(status).json({
                statusCode: status,
                message,
            });
        }
    }
}
