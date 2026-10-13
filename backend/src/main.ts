import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Prefijo global de la API
  app.setGlobalPrefix('api/v1');

  // Habilitar CORS para comunicación segura con el frontend
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  // Filtro global de excepciones unificadas
  app.useGlobalFilters(new HttpExceptionFilter());

  // Interceptor global para respuestas homogéneas
  app.useGlobalInterceptors(new TransformInterceptor());

  // Tubería global de validación de datos
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuración de OpenAPI / Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SENA - API de Caracterización de Aprendices')
    .setDescription(
      'Documentación de servicios RESTful para el Portal de Caracterización, Bienestar al Aprendiz y Dirección Regional.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT ?? 4000;
  await app.listen(port);

  logger.log(`🚀 Servidor Backend corriendo en: http://localhost:${port}/api/v1`);
  logger.log(`📚 Documentación Swagger disponible en: http://localhost:${port}/api/docs`);
}

await bootstrap();
