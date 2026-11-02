import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CatalogosQueryDto {
  @ApiPropertyOptional({
    description: 'Filtrar por una categoría específica (ej: eps, estrato, tipo_documento)',
    example: 'eps',
  })
  @IsOptional()
  @IsString()
  categoria?: string;
}
