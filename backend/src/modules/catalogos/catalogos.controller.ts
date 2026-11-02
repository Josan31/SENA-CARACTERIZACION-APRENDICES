import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CatalogosService } from './catalogos.service.js';
import { CatalogoItemDto } from './dto/catalogo-item.dto.js';
import { CatalogosQueryDto } from './dto/catalogos-query.dto.js';

@ApiTags('Catálogos')
@Controller('catalogos')
export class CatalogosController {
  constructor(private readonly catalogosService: CatalogosService) {}

  @Get()
  @ApiOperation({
    summary: 'Consultar catálogos del sistema',
    description:
      'Retorna todos los catálogos activos agrupados por categoría. Si se proporciona el parámetro query "categoria", retorna únicamente las opciones de dicha categoría.',
  })
  @ApiQuery({ name: 'categoria', required: false, description: 'Filtrar por categoría (ej: eps, estrato, tipo_documento)' })
  @ApiResponse({ status: 200, description: 'Catálogos obtenidos correctamente' })
  async obtenerCatalogos(@Query() query: CatalogosQueryDto) {
    if (query.categoria) {
      return this.catalogosService.obtenerPorCategoria(query.categoria);
    }
    return this.catalogosService.obtenerTodosAgrupados();
  }

  @Get('categorias/lista')
  @ApiOperation({
    summary: 'Listar categorías disponibles',
    description: 'Retorna un arreglo con todos los nombres de categorías registrados en la base de datos.',
  })
  @ApiResponse({ status: 200, description: 'Lista de nombres de categorías', type: [String] })
  async listarCategorias() {
    return this.catalogosService.obtenerCategoriasDisponibles();
  }

  @Get(':categoria')
  @ApiOperation({
    summary: 'Consultar opciones de una categoría específica',
    description: 'Retorna las opciones activas ordenadas para una categoría dada (ej: eps, estrato, ciudad).',
  })
  @ApiParam({ name: 'categoria', description: 'Nombre de la categoría (ej: eps, estrato, ciudad, tipo_documento)' })
  @ApiResponse({ status: 200, description: 'Opciones de la categoría seleccionada', type: [CatalogoItemDto] })
  async obtenerPorCategoria(@Param('categoria') categoria: string) {
    return this.catalogosService.obtenerPorCategoria(categoria);
  }
}
