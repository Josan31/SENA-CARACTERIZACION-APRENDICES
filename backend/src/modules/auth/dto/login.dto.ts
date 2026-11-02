import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Documento de identidad del aprendiz, usuario del sistema o correo electrónico institucional',
    example: 'admin',
  })
  @IsNotEmpty({ message: 'El identificador (documento/correo) es obligatorio' })
  @IsString({ message: 'El identificador debe ser una cadena de texto' })
  identificador: string;

  @ApiProperty({
    description: 'Contraseña de acceso',
    example: '12345',
  })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(4, { message: 'La contraseña debe tener al menos 4 caracteres' })
  password: string;
}
