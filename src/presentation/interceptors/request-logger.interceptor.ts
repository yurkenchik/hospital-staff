import {
    CallHandler,
    ExecutionContext,
    Injectable, Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
    private readonly logger: Logger = new Logger(RequestLoggerInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();

        const request = context.switchToHttp().getRequest<Request>();
        const { method, url, body } = request;

        this.logger.log(`\n[Request] ${method} ${url}`);
        this.logger.log(`[Time] ${new Date().toISOString()}`);
        if (body && Object.keys(body).length > 0) {
            this.logger.log(`[Body]`, body);
        }

        return next.handle().pipe(
            tap(() => this.logger.log(`[Request completed] ${method} ${url} - ${Date.now() - now}ms`)),
        );
    }
}
