import { ApiProperty } from '@nestjs/swagger';

export class UsuarioResponseDto {
  @ApiProperty({ example: 'ea337ef3-a6fd-4801-a83b-e615320f9984' })
  id: string;

  @ApiProperty({ example: 'Carlos Arturo Díaz Herrera' })
  nombre: string;

  @ApiProperty({ example: 'cdiaz@sena.edu.co' })
  correo: string;

  @ApiProperty({ example: 'coordinador' })
  rol: string;

  @ApiProperty({ example: true })
  activo: boolean;

  @ApiProperty({ example: '2026-11-02T22:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-11-02T22:00:00.000Z' })
  updatedAt: Date;
}
