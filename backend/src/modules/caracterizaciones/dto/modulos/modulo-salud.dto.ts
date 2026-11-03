import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ModuloSaludDto {
  @IsString()
  @IsNotEmpty({ message: 'La EPS es requerida' })
  eps: string;

  @IsString()
  @IsNotEmpty({ message: 'El régimen de salud es requerido' })
  regimenSalud: string;

  @IsString()
  @IsNotEmpty({ message: 'El estado del Sisbén es requerido' })
  sisben: string;

  @IsString()
  @IsOptional()
  grupoSisben?: string;

  @IsString()
  @IsNotEmpty({ message: 'La respuesta de discapacidad es requerida' })
  tieneDiscapacidad: string;

  @IsString()
  @IsOptional()
  tipoDiscapacidad?: string;

  @IsString()
  @IsOptional()
  enfermedadCronica?: string;

  @IsString()
  @IsOptional()
  descripcionEnfermedad?: string;

  @IsString()
  @IsOptional()
  tomaMedicamentos?: string;

  @IsString()
  @IsOptional()
  gestacion?: string;

  @IsOptional()
  semanaGestacion?: string | number;

  @IsString()
  @IsOptional()
  lactancia?: string;

  @IsString()
  @IsOptional()
  madrePadreCabezaFamilia?: string;

  @IsOptional()
  hijosACargo?: string | number;

  @IsOptional()
  totalPersonasHogar?: string | number;

  @IsString()
  @IsOptional()
  utilizaMetodoPlanificacion?: string;
}
