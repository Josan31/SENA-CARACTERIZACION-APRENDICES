import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ROLES } from '../../../common/constants/roles.constant.js';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nombre completo del funcionario o administrador SENA',
    example: 'Carlos Arturo Díaz Herrera',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombre: string;

  @ApiProperty({
    description: 'Correo electrónico institucional SENA',
    example: 'cdiaz@sena.edu.co',
  })
  @IsEmail({}, { message: 'El correo electrónico no tiene un formato válido' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  correo: string;

  @ApiProperty({
    description: 'Contraseña de acceso inicial a la plataforma',
    example: 'Sena2026*Segura',
    minLength: 6,
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener mínimo 6 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Rol institucional asignado al usuario',
    enum: [ROLES.ADMIN, ROLES.LIDER_BIENESTAR, ROLES.COORDINACION, ROLES.DIRECCION_REGIONAL, ROLES.CALIDAD],
    example: 'coordinacion',
  })
  @IsString({ message: 'El rol debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  @IsIn([ROLES.ADMIN, ROLES.LIDER_BIENESTAR, ROLES.COORDINACION, ROLES.DIRECCION_REGIONAL, ROLES.CALIDAD], {
    message: 'El rol seleccionado no es válido',
  })
  rol: string;

  @ApiPropertyOptional({
    description: 'Estado activo o inactivo de la cuenta',
    default: true,
  })
  @IsBoolean({ message: 'El estado activo debe ser verdadero o falso' })
  @IsOptional()
  activo?: boolean;
}
