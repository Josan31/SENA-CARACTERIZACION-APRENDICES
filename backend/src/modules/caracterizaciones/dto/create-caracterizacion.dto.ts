import { IsString, IsNotEmpty, IsOptional, ValidateNested, Matches } from 'class-validator';
import { Type } from 'class-transformer';
import { ModuloBasicaDto } from './modulos/modulo-basica.dto.js';
import { ModuloSaludDto } from './modulos/modulo-salud.dto.js';
import { ModuloSocioeconomicaDto } from './modulos/modulo-socioeconomica.dto.js';
import { ModuloFormativoDto } from './modulos/modulo-formativo.dto.js';

export class ModulosContainerDto {
  @ValidateNested()
  @Type(() => ModuloBasicaDto)
  @IsNotEmpty({ message: 'El módulo basica es obligatorio' })
  basica: ModuloBasicaDto;

  @ValidateNested()
  @Type(() => ModuloSaludDto)
  @IsNotEmpty({ message: 'El módulo salud es obligatorio' })
  salud: ModuloSaludDto;

  @ValidateNested()
  @Type(() => ModuloSocioeconomicaDto)
  @IsNotEmpty({ message: 'El módulo socioeconomica es obligatorio' })
  socioeconomica: ModuloSocioeconomicaDto;

  @ValidateNested()
  @Type(() => ModuloFormativoDto)
  @IsNotEmpty({ message: 'El módulo formativo es obligatorio' })
  formativo: ModuloFormativoDto;
}

export class CreateCaracterizacionDto {
  @IsString()
  @IsNotEmpty({ message: 'El numero_documento es obligatorio' })
  numero_documento: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha de la caracterización debe tener formato YYYY-MM-DD',
  })
  fecha?: string;

  @ValidateNested()
  @Type(() => ModulosContainerDto)
  @IsNotEmpty({ message: 'El objeto modulos es obligatorio' })
  modulos: ModulosContainerDto;
}
