import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ROLES } from '../../../common/constants/roles.constant.js';

export class UpdateUsuarioDto {
  @ApiPropertyOptional({
    description: 'Nombre completo del funcionario o administrador SENA',
    example: 'Carlos Arturo Díaz Herrera',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsOptional()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre?: string;

  @ApiPropertyOptional({
    description: 'Correo electrónico institucional SENA',
    example: 'cdiaz@sena.edu.co',
  })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  @IsOptional()
  correo?: string;

  @ApiPropertyOptional({
    description: 'Nueva contraseña de acceso (si se desea cambiar)',
    example: 'NuevaClave2026*',
    minLength: 6,
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsOptional()
  @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres' })
  password?: string;

  @ApiPropertyOptional({
    description: 'Rol institucional asignado al usuario',
    enum: [ROLES.ADMIN, ROLES.LIDER_BIENESTAR, ROLES.COORDINACION, ROLES.DIRECCION_REGIONAL, ROLES.CALIDAD],
    example: 'coordinacion',
  })
  @IsString({ message: 'El rol debe ser una cadena de texto' })
  @IsOptional()
  @IsIn([ROLES.ADMIN, ROLES.LIDER_BIENESTAR, ROLES.COORDINACION, ROLES.DIRECCION_REGIONAL, ROLES.CALIDAD], {
    message: 'El rol seleccionado no es válido',
  })
  rol?: string;

  @ApiPropertyOptional({
    description: 'Estado activo o inactivo de la cuenta',
    example: true,
  })
  @IsBoolean({ message: 'El estado activo debe ser verdadero o falso' })
  @IsOptional()
  activo?: boolean;
}
