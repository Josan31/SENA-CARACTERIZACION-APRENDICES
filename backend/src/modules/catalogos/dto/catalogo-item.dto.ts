import { ApiProperty } from '@nestjs/swagger';

export class CatalogoItemDto {
  @ApiProperty({ description: 'Identificador único UUID de la opción', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id: string;

  @ApiProperty({ description: 'Categoría a la que pertenece la opción', example: 'tipo_documento' })
  categoria: string;

  @ApiProperty({ description: 'Texto visible de la opción para el aprendiz/usuario', example: 'CC - Cédula de Ciudadanía' })
  valor: string;

  @ApiProperty({ description: 'Orden de visualización en selectores o formularios', example: 1, required: false })
  orden?: number | null;

  @ApiProperty({ description: 'Indica si la opción se encuentra activa', example: true })
  activo: boolean;
}
