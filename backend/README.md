# 🚀 Backend SENA - Caracterización de Aprendices

Servicio de backend RESTful desarrollado con **NestJS 12**, **Prisma ORM 6** y **PostgreSQL 16**, diseñado para gestionar el ciclo de vida de la caracterización socioeconómica de aprendices, autenticación dual institucional (JWT) y tableros analíticos de bienestar.

---

## 📌 Puertos y Servicios del Ecosistema

| Servicio | Puerto | URL / Conexión | Descripción |
| :--- | :---: | :--- | :--- |
| **Frontend Next.js** | `3001` | `http://localhost:3001` | Portal web para aprendices y panel administrativo. |
| **Backend NestJS API** | `4000` | `http://localhost:4000/api/v1` | API RESTful con validaciones institucionales y RLS. |
| **Swagger / OpenAPI** | `4000` | `http://localhost:4000/api/docs` | Documentación interactiva para probar endpoints. |
| **PostgreSQL (Docker)** | `5432` | `localhost:5432` / `sena_caracterizacion` | Base de datos relacional con checks de integridad. |
| **Prisma Studio (GUI)** | `5555` | `http://localhost:5555` | Interfaz gráfica para explorar y editar registros. |

---

## ⚡ Comandos Rápidos de Trabajo Diario

Puedes ejecutar estos comandos **directamente desde la raíz del proyecto**:

```bash
# Iniciar frontend Next.js (puerto 3001)
npm run dev

# Iniciar backend NestJS en modo desarrollo con recarga en vivo (puerto 4000)
npm run dev:backend

# Abrir la interfaz visual de base de datos Prisma Studio
npm run db:studio

# Sembrar catálogos oficiales y usuarios demo
npm run db:seed

# Aplicar nuevas migraciones de base de datos
npm run db:migrate
```

---

## 🔑 Cuentas y Credenciales Demo para Pruebas

| Rol | Documento / Usuario | Tipo Doc | Contraseña | Destino | Notas |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **Administrador** | `admin` *(o `1098765432`)* | `CC` | `12345` | `/admin` | Acceso pleno a tableros y gestión. |
| **Aprendiz Demo 1** | `109989001` *(o `aprendiz`)* | `TI` | `123456` | `/aprendiz` | Valentina Gómez Mejía (ADSO). |
| **Aprendiz Demo 2** | `109989002` | `CC` | `123456` | `/aprendiz` | Aprendiz Dos Demo (Logística). |
| **Aprendiz Demo 3** | `109989003` | `CE` | `123456` | `/aprendiz` | Aprendiz Tres Demo (Extranjero). |

> [!NOTE]
> **Validación Cruzada de Documento:** Si un aprendiz matriculado con `TI` intenta ingresar seleccionando `CC` en el desplegable (o viceversa), el backend detecta la discrepancia y le exige seleccionar el tipo con el que figura matriculado en el SENA.

---

## 📁 Arquitectura del Backend (`backend/src/`)

```text
backend/src/
├── common/                  # Elementos transversales reutilizables
│   ├── constants/           # Constantes institucionales (ROLES, TIPOS_DOCUMENTO)
│   ├── decorators/          # @CurrentUser(), @Roles()
│   ├── filters/             # HttpExceptionFilter (respuestas de error unificadas)
│   ├── guards/              # JwtAuthGuard, RolesGuard
│   ├── interceptors/        # TransformInterceptor ({ success, statusCode, data })
│   ├── strategies/          # JwtStrategy (Passport JWT)
│   └── index.ts             # Barrel export unificado
├── database/                # Conexión persistente con Prisma ORM
│   ├── prisma.service.ts    # Cliente Prisma con logging y desconexión segura
│   └── prisma.module.ts
├── modules/                 # Módulos de dominio
│   ├── auth/                # Autenticación dual (bcrypt / documento) + JWT
│   ├── catalogos/           # Consulta y agrupación de opciones paramétricas
│   ├── caracterizaciones/   # Núcleo de guardado transaccional ($transaction)
│   ├── aprendices/          # Gestión de fichas y datos de aprendices
│   ├── fichas/              # Programas y matrículas
│   └── reportes/            # Informes regionales y métricas
└── main.ts                  # Punto de entrada, prefijo /api/v1 y Swagger
```

---

## 🌐 Conexión con el Frontend (`src/lib/api-client.ts`)

Para hacer llamadas HTTP al backend desde cualquier componente o hook de Next.js, utiliza el cliente institucional:

```typescript
import { apiClient } from '@/lib/api-client';

// Petición GET tipada (Bearer Token y desempaquetado automático de data)
const catalogos = await apiClient.get<CatalogoItem[]>('/catalogos');

// Petición POST
const resultado = await apiClient.post('/caracterizaciones', payload);
```
