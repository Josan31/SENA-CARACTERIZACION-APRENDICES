import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    _context: ExecutionContext,
    _status?: any,
  ): TUser {
    if (err || !user) {
      let mensaje = 'Acceso no autorizado: debes incluir un token JWT válido';
      if (info?.name === 'TokenExpiredError') {
        mensaje = 'La sesión ha expirado. Por favor inicia sesión nuevamente.';
      } else if (info?.name === 'JsonWebTokenError') {
        mensaje = 'Token JWT inválido o malformado.';
      }
      throw err || new UnauthorizedException(mensaje);
    }
    return user;
  }
}
