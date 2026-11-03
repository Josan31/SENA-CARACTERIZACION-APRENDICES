import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ModuloFormativoDto {
  @IsString()
  @IsNotEmpty({ message: 'El nivel educativo previo es requerido' })
  nivelEducativoPrevio: string;

  @IsString()
  @IsNotEmpty({ message: 'La formación previa en el SENA es requerida' })
  formacionPreviaSena: string;

  @IsString()
  @IsNotEmpty({ message: 'La motivación de ingreso es requerida' })
  motivacionIngreso: string;

  @IsString()
  @IsOptional()
  expectativaLaboral?: string; // No persiste en tablas fijas

  @IsString()
  @IsOptional()
  manejoHerramientasDigitales?: string; // No persiste en tablas fijas

  @IsString()
  @IsNotEmpty({ message: 'El estado de vacunación COVID-19 es requerido' })
  vacunado: string;

  @IsString()
  @IsOptional()
  biologico?: string;

  @IsOptional()
  dosis?: string | number;

  @IsString()
  @IsOptional()
  esquemaCompleto?: string;
}
