import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { CaracterizacionesService } from './caracterizaciones.service.js';
import { CreateCaracterizacionDto } from './dto/create-caracterizacion.dto.js';
import { CaracterizacionResponseDto } from './dto/caracterizacion-response.dto.js';
import {
  JwtAuthGuard,
  RolesGuard,
  Roles,
  CurrentUser,
  ROLES,
} from '../../common/index.js';
import type { JwtPayload } from '../../common/index.js';

@ApiTags('Caracterizaciones')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('caracterizaciones')
export class CaracterizacionesController {
  constructor(
    private readonly caracterizacionesService: CaracterizacionesService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Guardar caracterización completa (Transacción Atómica)',
    description:
      'Registra todas las respuestas de los 4 módulos (básica, salud, socioeconómica, formativa) mapeándolas a sus ~14 tablas satélite en una única transacción de base de datos.',
  })
  @ApiResponse({
    status: 201,
    description: 'Caracterización guardada con éxito',
    type: CaracterizacionResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Opción de catálogo no válida o regla de integridad violada',
  })
  async crear(
    @Body() dto: CreateCaracterizacionDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const data = await this.caracterizacionesService.crearCaracterizacion(dto, user);
    return {
      statusCode: HttpStatus.CREATED,
      data,
      message: 'Caracterización guardada exitosamente',
    };
  }

  @Get('mi-caracterizacion')
  @ApiOperation({
    summary: 'Consultar caracterización del aprendiz autenticado',
    description:
      'Retorna el estado y los datos completos de la caracterización más reciente del aprendiz autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Caracterización del aprendiz obtenida con éxito',
  })
  async obtenerMiCaracterizacion(@CurrentUser() user: JwtPayload) {
    const data = await this.caracterizacionesService.obtenerMiCaracterizacion(user);
    return {
      statusCode: HttpStatus.OK,
      data,
      message: 'Caracterización obtenida exitosamente',
    };
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(
    ROLES.ADMIN,
    ROLES.LIDER_BIENESTAR,
    ROLES.COORDINADOR,
  )
  @ApiOperation({
    summary: 'Consultar caracterización por ID (Solo Funcionarios/Admin)',
    description:
      'Retorna la vista detallada de una caracterización específica incluyendo todas sus relaciones satélites.',
  })
  @ApiParam({
    name: 'id',
    description: 'UUID de la caracterización',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalle de caracterización obtenido correctamente',
  })
  async obtenerPorId(@Param('id') id: string) {
    const data = await this.caracterizacionesService.obtenerPorId(id);
    return {
      statusCode: HttpStatus.OK,
      data,
      message: 'Detalle de caracterización obtenido',
    };
  }
}
