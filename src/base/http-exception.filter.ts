import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let message =
            exception instanceof HttpException
                ? exception.message || exception.getResponse()
                : 'server error';

        response.status(status).json({
            meta: 'fail',
            code: status,
            message,
            timestamp: new Date(),
        });
    }
}
