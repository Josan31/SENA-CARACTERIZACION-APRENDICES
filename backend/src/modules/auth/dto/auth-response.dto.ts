import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({ description: 'ID único del usuario', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ description: 'Nombre completo', example: 'Carlos Alberto Restrepo' })
  nombre: string;

  @ApiProperty({ description: 'Correo electrónico', example: 'carestrepo@sena.edu.co' })
  correo: string;

  @ApiProperty({ description: 'Rol asignado', example: 'admin' })
  rol: string;

  @ApiProperty({ description: 'Tipo de cuenta', enum: ['funcionario', 'aprendiz'], example: 'funcionario' })
  tipo: 'funcionario' | 'aprendiz';

  @ApiPropertyOptional({ description: 'Tipo de documento (CC, TI, etc.)', example: 'CC' })
  tipoDocumento?: string;

  @ApiPropertyOptional({ description: 'Número de documento', example: '109989001' })
  numeroDocumento?: string;

  @ApiPropertyOptional({ description: 'Ficha de formación activa', example: '2670142' })
  ficha?: string;

  @ApiPropertyOptional({ description: 'Programa de formación', example: 'ADSO - Análisis y Desarrollo de Software' })
  programa?: string;

  @ApiPropertyOptional({ description: 'Centro de formación', example: 'Centro de Teleinformática y Producción Industrial - Cauca' })
  centro?: string;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'Token de acceso JWT', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken: string;

  @ApiProperty({ description: 'Tiempo de vigencia del token', example: '8h' })
  expiresIn: string;

  @ApiProperty({ description: 'Información del usuario autenticado', type: AuthUserDto })
  user: AuthUserDto;
}
