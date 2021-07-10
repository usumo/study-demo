import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Response {
  data: object;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
    return next.handle().pipe(
      map(data => {
        return {
          code: 0,
          msg: 'success',
          data
        };
      })
    )
  }
}
