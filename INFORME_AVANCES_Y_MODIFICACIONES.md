# INFORME TÉCNICO DE MODIFICACIONES, NUEVAS IMPLEMENTACIONES Y AVANCES
## SISTEMA INSTITUCIONAL DE CARACTERIZACIÓN DE APRENDICES — SENA
**Fecha de Actualización:** 7 de Noviembre de 2026  
**Versión del Software:** 2.5.0 (Release Fullstack Transaccional & Gestión de Cuentas)  
**Proyecto:** `SENA-CARACTERIZACION-APRENDICES`  
**Entorno Tecnológico:** Next.js 16 (App Router), React 19, Tailwind CSS v4, NestJS 10, Prisma ORM 6, PostgreSQL 16 (Docker)  

---

## 1. Resumen Ejecutivo de la Versión 2.5.0

El presente informe consolida los avances técnicos correspondientes a la integración de la arquitectura fullstack del aplicativo, conectando los componentes visuales de Next.js con una API RESTful empresarial en NestJS y la base de datos relacional PostgreSQL.

### Hitos Técnicos Consolidados:
1. **Autenticación Dual Unificada y Seguridad JWT (`/api/v1/auth/login`)**:
   - Soporte diferenciado para **Aprendices** (búsqueda por número de documento o correo, validación cruzada obligatoria del tipo de documento seleccionado vs. registrado en BD) y **Personal SENA / Funcionarios** (búsqueda en tabla `usuarios` y validación con hash `bcrypt`).
   - Tokens de acceso Bearer JWT firmados con payload institucional (roles: `admin`, `lider_bienestar`, `coordinacion`, `direccion_regional`, `calidad`, `aprendiz`).
   - Bloqueo en tiempo real de cuentas inactivas (`401 Unauthorized: Cuenta inactiva o deshabilitada`).
   - Endpoint de perfil institucional autenticado: `GET /api/v1/auth/perfil`.
2. **Módulo de Catálogos Oficiales Normalizados (`/api/v1/catalogos`)**:
   - Endpoints dinámicos para consulta de opciones institucionales (`ciudades`, `estratos`, `eps`, `regímenes`, `grupos SISBÉN`, etc.) vinculados a llaves foráneas en PostgreSQL.
3. **Módulo Transaccional de Caracterizaciones ACID (`/api/v1/caracterizaciones`)**:
   - Guardado de la encuesta completa en una **única transacción atómica** que puebla de manera consistente la tabla principal `caracterizaciones` y sus **14 tablas satélite** relacionales (`aprendiz_basica`, `aprendiz_localizacion`, `aprendiz_salud`, `aprendiz_socioeconomica`, `aprendiz_formativa`, `vacunacion_covid`, etc.).
   - Validación estricta de catálogos en backend (reglas R1-R7): si una opción no coincide con los catálogos de base de datos, la transacción se cancela (Rollback automático) y retorna `422 Unprocessable Entity`.
   - Generación de radicado oficial con expresión regular estricta:
     $$\text{^RAD-SENA-[0-9]\{4\}-[0-9]\{6\}\$}$$
   - Endpoint activo del estudiante: `GET /api/v1/caracterizaciones/mi-caracterizacion`.
4. **Capa de Rendimiento y Sincronización Frontend (SWR Cache)**:
   - Implementación de `cacheCaracterizacion.ts`: caché en memoria con invalidación reactiva que elimina por completo el parpadeo de pantalla y la espera de 2 segundos al recargar o navegar entre módulos.
   - Cálculo en vivo del porcentaje de avance diligenciado por formulario según respuestas válidas en PostgreSQL.
5. **Módulo de Usuarios y Gestión de Cuentas (`/api/v1/usuarios`)**:
   - CRUD completo de funcionarios para administradores: `GET /usuarios`, `GET :id`, `POST /usuarios`, `PUT :id`, `PATCH :id/toggle-activo`, `DELETE :id`.
   - Encriptación automática de contraseñas con `bcrypt` (10 rounds de sal).
   - Control de unicidad de correo electrónico institucional (`409 Conflict`).
   - Registro de accesos y modificaciones en la tabla `auditoria_accesos`.
   - Protecciones de seguridad institucionales: restricción contra auto-desactivación y auto-eliminación para el administrador que se encuentra en sesión activa (`400 Bad Request`).
   - Interfaz conectada en tiempo real en [`/admin/administracion`](http://localhost:3001/admin/administracion) con filtros, selector de roles institucionales y confirmación en 2 pasos.
6. **Suites de Pruebas Automatizadas de Extremo a Extremo (E2E)**:
   - `npm run test:caracterizaciones`: 8 pruebas que certifican login, guardado ACID, radicado oficial, rollback por error 422, bloqueo RBAC y consulta satélite.
   - `npm run test:usuarios`: 14 pruebas que certifican CRUD, login con usuario nuevo, bloqueo de cuentas inactivas, reactivación, borrado y auto-protección.
   - **Tasa de éxito:** 100% (22/22 pruebas pasadas satisfactoriamente).

---

## 2. Matriz Maestra de Archivos del Proyecto

| Archivo / Componente | Ruta Relativa | Capa | Descripción Técnica |
| :--- | :--- | :---: | :--- |
| `main.ts` | `backend/src/main.ts` | Backend | Configuración de prefijo `/api/v1`, CORS global y Swagger OpenAPI. |
| `auth.service.ts` | `backend/src/modules/auth/auth.service.ts` | Backend | Autenticación dual, verificación bcrypt, validación cruzada TI/CC y bloqueo inactivo. |
| `caracterizaciones.service.ts` | `backend/src/modules/caracterizaciones/caracterizaciones.service.ts` | Backend | Motor de transacción ACID en 14 tablas, validación de catálogos y radicado oficial. |
| `usuarios.service.ts` | `backend/src/modules/usuarios/usuarios.service.ts` | Backend | CRUD de funcionarios, bcrypt, control de correo único y auditoría en BD. |
| `usuarios.controller.ts` | `backend/src/modules/usuarios/usuarios.controller.ts` | Backend | Controlador RESTful con guards `JwtAuthGuard` y `RolesGuard`. |
| `test-caracterizaciones.mjs` | `scripts/test-caracterizaciones.mjs` | Testing | Suite E2E para el módulo de Caracterizaciones Transaccionales. |
| `test-usuarios.mjs` | `scripts/test-usuarios.mjs` | Testing | Suite E2E para el módulo de Gestión de Usuarios y Roles. |
| `api-client.ts` | `src/lib/api-client.ts` | Frontend | Cliente HTTP tipado con inyección de JWT, manejo de errores 401 y parseo de respuestas. |
| `cacheCaracterizacion.ts` | `src/lib/cacheCaracterizacion.ts` | Frontend | Capa de precarga SWR que elimina tiempos de espera y parpadeos en formularios. |
| `usuarios.ts` | `src/lib/usuarios.ts` | Frontend | Cliente API tipado para el módulo de usuarios y catálogo de roles. |
| `page.tsx` (Administración) | `src/app/admin/administracion/page.tsx` | Frontend | Panel administrativo interactivo para gestionar cuentas directamente en PostgreSQL. |
| `page.tsx` (Resultados Aprendiz)| `src/app/aprendiz/resultados/page.tsx` | Frontend | Vista con radicado oficial emitido por la base de datos y vigencia semestral. |
| `page.tsx` (Perfil Aprendiz) | `src/app/aprendiz/perfil/page.tsx` | Frontend | Vista del perfil del estudiante con datos sincronizados en tiempo real. |
| `page.tsx` (Formularios) | `src/app/aprendiz/formularios/page.tsx` | Frontend | Tablero de formularios con cálculo dinámico de progreso por módulo. |

---

## 3. Guía de Ejecución y Validación

```bash
# 1. Ejecutar pruebas automatizadas de caracterización
npm run test:caracterizaciones

# 2. Ejecutar pruebas automatizadas de usuarios y roles
npm run test:usuarios

# 3. Compilación de producción frontend
npm run build
```

---

## 4. Estado de los Paneles Administrativos

1. **Gestión de Cuentas (`/admin/administracion`)**: 100% Conectado y operativo con la base de datos real.
2. **Dashboard de Métricas (`/admin`)**: Listo para recibir el módulo de reportes consolidados (`ReportesModule`).
3. **Resultados de Fichas (`/admin/resultados`)**: Listo para conectar con el módulo de fichas formativas (`FichasModule`).
