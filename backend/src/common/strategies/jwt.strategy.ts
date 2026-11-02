import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: string;
  nombre: string;
  correo: string;
  rol: string;
  tipo: 'funcionario' | 'aprendiz';
  numeroDocumento?: string;
  ficha?: string;
  programa?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret =
      configService.get<string>('JWT_SECRET') ||
      'sena_caracterizacion_jwt_secret_dev_key_2026_super_secure';

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload || !payload.sub || !payload.rol) {
      throw new UnauthorizedException('Token no válido o sin permisos requeridos');
    }
    return payload;
  }
}
