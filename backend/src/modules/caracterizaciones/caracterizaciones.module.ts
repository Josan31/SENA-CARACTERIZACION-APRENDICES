import { Module } from '@nestjs/common';
import { PrismaModule } from '../../database/prisma.module.js';
import { CatalogosModule } from '../catalogos/catalogos.module.js';
import { CaracterizacionesController } from './caracterizaciones.controller.js';
import { CaracterizacionesService } from './caracterizaciones.service.js';
import { CatalogoResolverService } from './services/catalogo-resolver.service.js';

@Module({
  imports: [PrismaModule, CatalogosModule],
  controllers: [CaracterizacionesController],
  providers: [CaracterizacionesService, CatalogoResolverService],
  exports: [CaracterizacionesService],
})
export class CaracterizacionesModule {}
