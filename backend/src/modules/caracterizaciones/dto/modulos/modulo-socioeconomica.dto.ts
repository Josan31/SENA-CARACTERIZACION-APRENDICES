import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ModuloSocioeconomicaDto {
  @IsString()
  @IsNotEmpty({ message: 'La jefatura del hogar / sustento principal es requerida' })
  jefaturaHogar: string;

  @IsOptional()
  personasACargo?: string | number;

  @IsOptional()
  totalPersonasHogar?: string | number;

  @IsString()
  @IsNotEmpty({ message: 'El rango de ingresos mensuales es requerido' })
  rangoIngresosMensuales: string;

  @IsString()
  @IsNotEmpty({ message: 'La fuente de ingresos es requerida' })
  fuenteIngresos: string;

  @IsString()
  @IsNotEmpty({ message: 'La respuesta de si trabaja actualmente es requerida' })
  trabajaActualmente: string;

  @IsString()
  @IsNotEmpty({ message: 'El grupo étnico es requerido' })
  grupoEtnico: string;

  @IsString()
  @IsOptional()
  apoyosEstatales?: string;
}
