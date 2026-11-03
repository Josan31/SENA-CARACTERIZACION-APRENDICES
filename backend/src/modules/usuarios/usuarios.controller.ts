import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service.js';
import { CreateUsuarioDto } from './dto/create-usuario.dto.js';
import { UpdateUsuarioDto } from './dto/update-usuario.dto.js';
import { UsuarioResponseDto } from './dto/usuario-response.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/decorators/roles.decorator.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import { ROLES } from '../../common/constants/roles.constant.js';
import type { JwtPayload } from '../../common/strategies/jwt.strategy.js';

@ApiTags('usuarios')
@ApiBearerAuth()
@Controller('usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLES.ADMIN, ROLES.LIDER_BIENESTAR)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar usuarios del sistema',
    description: 'Permite filtrar por nombre/correo o rol institucional.',
  })
  @ApiQuery({ name: 'q', required: false, description: 'Búsqueda por nombre o correo' })
  @ApiQuery({ name: 'rol', required: false, description: 'Filtrar por rol institucional' })
  @ApiQuery({ name: 'activo', required: false, type: Boolean, description: 'Filtrar por estado activo/inactivo' })
  @ApiResponse({ status: 200, type: [UsuarioResponseDto] })
  async listar(
    @Query('q') query?: string,
    @Query('rol') rol?: string,
    @Query('activo') activoStr?: string,
  ) {
    let activo: boolean | undefined = undefined;
    if (activoStr === 'true') activo = true;
    if (activoStr === 'false') activo = false;

    return this.usuariosService.listar(query, rol, activo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por su UUID' })
  @ApiResponse({ status: 200, type: UsuarioResponseDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async obtenerPorId(@Param('id', ParseUUIDPipe) id: string) {
    return this.usuariosService.obtenerPorId(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario funcionario o administrador' })
  @ApiResponse({ status: 201, type: UsuarioResponseDto })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 409, description: 'Correo electrónico ya registrado' })
  async crear(
    @Body() dto: CreateUsuarioDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.usuariosService.crear(dto, user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar datos de una cuenta de usuario' })
  @ApiResponse({ status: 200, type: UsuarioResponseDto })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 409, description: 'El nuevo correo ya está en uso' })
  async actualizar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUsuarioDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.usuariosService.actualizar(id, dto, user);
  }

  @Patch(':id/toggle-activo')
  @ApiOperation({ summary: 'Activar o desactivar una cuenta de usuario' })
  @ApiResponse({ status: 200, type: UsuarioResponseDto })
  @ApiResponse({ status: 400, description: 'No puedes desactivar tu propia cuenta' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async toggleActivo(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.usuariosService.toggleActivo(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una cuenta de usuario' })
  @ApiResponse({ status: 200, description: 'Cuenta eliminada exitosamente' })
  @ApiResponse({ status: 400, description: 'No puedes eliminar tu propia cuenta' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async eliminar(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.usuariosService.eliminar(id, user);
  }
}
