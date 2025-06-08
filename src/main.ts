import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './middleware/exceptions.filter';
import { LoggerService } from './infra/logger/logger.service';
import { LoggingInterceptor } from './middleware/interceptors/logger.interceptor';
import {
  ResponseFormat,
  ResponseInterceptor,
} from './middleware/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());
  app.use(helmet());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('tcc_backend')
    .setDescription('Backend do projeto tcc')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [ResponseFormat],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0');
}

bootstrap();
