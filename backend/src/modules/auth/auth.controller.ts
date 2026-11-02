import { Controller, Post, Get, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { AuthResponseDto, AuthUserDto } from './dto/auth-response.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../../common/decorators/current-user.decorator.js';
import type { JwtPayload } from '../../common/strategies/jwt.strategy.js';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión (Aprendices o Funcionarios SENA)',
    description:
      'Valida credenciales de acceso para personal administrativo (correo institucional + contraseña) o aprendices (número de documento + credencial). Retorna token JWT y datos de sesión.',
  })
  @ApiResponse({
    status: 200,
    description: 'Autenticación exitosa',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas o cuenta no registrada',
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Consultar perfil del usuario autenticado',
    description:
      'Requiere encabezado "Authorization: Bearer <token>". Retorna la información actualizada del usuario, rol y ficha correspondiente.',
  })
  @ApiResponse({
    status: 200,
    description: 'Perfil obtenido exitosamente',
    type: AuthUserDto,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado: token inválido o expirado',
  })
  async perfil(@CurrentUser() user: JwtPayload): Promise<AuthUserDto> {
    return this.authService.obtenerPerfil(user);
  }
}
