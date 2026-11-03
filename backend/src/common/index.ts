/**
 * Barrel export para elementos comunes del backend
 * Ubicación: backend/src/common/index.ts
 */

export * from './constants/roles.constant.js';
export * from './constants/documentos.constant.js';
export * from './decorators/current-user.decorator.js';
export * from './decorators/roles.decorator.js';
export * from './guards/jwt-auth.guard.js';
export * from './guards/roles.guard.js';
export * from './filters/http-exception.filter.js';
export * from './interceptors/transform.interceptor.js';
export * from './strategies/jwt.strategy.js';
