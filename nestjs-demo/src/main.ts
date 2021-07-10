import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // swagger
  const options = new DocumentBuilder()
    .setTitle('nestjs入门')
    .setDescription('nestjs入门接口')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'Authorization')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  // 开启全局验证
  // app.useGlobalPipes(new HttpExceptionFilter());
  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  // 开启全局自定义验证，并返回自定义错误
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     exceptionFactory: (errors = []) => {
  //       throw new HttpException({
  //           code: 1,
  //           msg: Object.values(errors[0].constraints)[0],
  //         },
  //         HttpStatus.OK,
  //       );
  //     }
  //   })
  // );
  // Helmet 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响
  app.use(helmet());
  // 跨域
  app.enableCors();
  // xss
  // app.use(csurf({ cookie: true }));
  await app.listen(3000);
}
// noinspection JSIgnoredPromiseFromCall
bootstrap();