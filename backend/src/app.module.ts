import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CatalogosModule } from './modules/catalogos/catalogos.module.js';
import { FichasModule } from './modules/fichas/fichas.module.js';
import { AprendicesModule } from './modules/aprendices/aprendices.module.js';
import { CaracterizacionesModule } from './modules/caracterizaciones/caracterizaciones.module.js';
import { SaludModule } from './modules/salud/salud.module.js';
import { ReportesModule } from './modules/reportes/reportes.module.js';
import { UsuariosModule } from './modules/usuarios/usuarios.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    CatalogosModule,
    FichasModule,
    AprendicesModule,
    CaracterizacionesModule,
    SaludModule,
    ReportesModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
