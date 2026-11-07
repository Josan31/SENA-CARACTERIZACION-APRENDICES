# 🚀 Portal de Caracterización Estudiantil SENA (CARACTERIZA)

Bienvenido al repositorio oficial del **Portal de Caracterización Estudiantil SENA (CARACTERIZA)**.

Este sistema institucional permite gestionar, recopilar y analizar la información integral de los aprendices del SENA (salud, localización, situación socioeconómica y perfil formativo), garantizando la protección de datos conforme a la Ley 1581 de 2012 (Habeas Data) y dotando al equipo de Bienestar al Aprendiz de herramientas para el acompañamiento y toma de decisiones estratégicas.

---

## 🏛️ Arquitectura del Sistema

El proyecto opera bajo una arquitectura desacoplada fullstack:

```mermaid
flowchart LR
    subgraph Frontend ["Frontend (Next.js 16 + Tailwind CSS v4)"]
        UI_Ap["Portal Aprendiz\n(/aprendiz)"]
        UI_Ad["Portal Administrador\n(/admin)"]
        SWR["Capa de Caché Instantánea SWR\n(cacheCaracterizacion.ts)"]
        Client["Cliente HTTP Centralizado\n(api-client.ts)"]
    end

    subgraph Backend ["Backend (NestJS 10 + TypeScript)"]
        Auth["AuthModule\n(JWT + Bcrypt)"]
        Cat["CatalogosModule\n(Catálogos Oficiales)"]
        Caract["CaracterizacionesModule\n(Transacción ACID)"]
        Users["UsuariosModule\n(CRUD + RBAC + Auditoría)"]
    end

    subgraph DB ["Persistencia (PostgreSQL 16)"]
        Prisma["Prisma ORM 6"]
        Tables["14 Tablas Satélite\n(aprendices, salud, localizacion, etc.)"]
    end

    UI_Ap --> SWR --> Client
    UI_Ad --> Client
    Client -->|REST API / Bearer JWT| Backend
    Backend --> Prisma --> Tables
```

---

## ✨ Módulos Principales Implementados

### 1. Portal del Aprendiz (`/aprendiz`)
* **Consentimiento Informado (Habeas Data):** Vista institucional con 4 aspectos legales y validación de aceptación obligatoria antes de continuar.
* **Formularios por Módulos (`/aprendiz/formularios`):** Wizard interactivo que calcula dinámicamente el progreso en tiempo real de los 4 bloques:
  - *Básica:* Datos personales, acudiente y contacto de emergencia.
  - *Salud:* EPS, régimen de afiliación, estado SISBÉN y condiciones especiales.
  - *Socioeconómica:* Jefatura de hogar, composición familiar, rango de ingresos y apoyos del Estado.
  - *Formativo:* Nivel formativo previo, expectativas y esquema de vacunación biológica.
* **Radicación Oficial Transaccional:** Al finalizar, el sistema persiste toda la encuesta en una sola **transacción atómica ACID** en PostgreSQL, validando cada campo contra los catálogos oficiales y expidiendo un radicado oficial con el formato estricto:
  $$\text{RAD-SENA-YYYY-XXXXXX}$$
* **Resultados y Folio (`/aprendiz/resultados`):** Muestra el comprobante oficial con número de radicado real, fecha de radicación y vigencia semestral.
* **Perfil del Aprendiz (`/aprendiz/perfil`):** Visualización de datos personales y académicos sincronizados en vivo con PostgreSQL.
* **Descargas (`/aprendiz/descargas`):** Espacio dedicado para la gestión y descarga de constancias y formatos institucionales.
* **Caché Instantánea SWR:** Capa en memoria (`cacheCaracterizacion.ts`) que elimina retrasos de carga y evita parpadeos (FOUC).

### 2. Portal Administrativo (`/admin`)
* **Dashboard de Métricas (`/admin`):** Tarjetas de indicadores (KPIs), accesos rápidos y panel lateral colapsable institucional.
* **Gestión de Cuentas SENA (`/admin/administracion`):** Módulo CRUD conectado a PostgreSQL para crear, editar, activar/desactivar y eliminar cuentas de funcionarios:
  - Contraseñas protegidas mediante hash `bcrypt` (10 rounds de salado).
  - Control de Acceso Basado en Roles (RBAC): `admin`, `lider_bienestar`, `coordinacion`, `direccion_regional`, `calidad`.
  - Protección de seguridad anti auto-desactivación y anti auto-eliminación para la sesión activa.
  - Registro de eventos en la tabla `auditoria_accesos`.
* **Programas y Resultados (`/admin/resultados`):** Panel para supervisar el avance de las fichas de formación.
* **Gestor de Formularios (`/admin/formularios`):** Herramienta interactiva para la parametrización de preguntas y secciones.

### 3. Backend RESTful NestJS
* **Documentación Interactiva Swagger OpenAPI:** Disponible en `http://localhost:4000/api/docs`.
* **Validación de Entradas:** DTOs con `class-validator` y `class-transformer` con respuestas HTTP semánticas (`400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `409 Conflict`, `422 Unprocessable Entity`).

---

## 🛠️ Tecnologías del Proyecto

| Capa | Tecnologías |
|---|---|
| **Frontend** | [Next.js](https://nextjs.org/) 16 (Turbopack), [React](https://react.dev/) 19, [Tailwind CSS](https://tailwindcss.com/) v4, [Lucide React](https://lucide.dev/), SWR pattern. |
| **Backend** | [NestJS](https://nestjs.com/) 10+, [Prisma ORM](https://www.prisma.io/) 6, [Bcrypt](https://github.com/kelektiv/node.bcrypt.js), [Passport JWT](http://www.passportjs.org/). |
| **Base de Datos** | [PostgreSQL](https://www.postgresql.org/) 16 en contenedor Docker con extensiones `uuid-ossp` y constraints estrictos. |
| **Testing** | Node.js Test Runner / Scripts E2E con aserciones automatizadas de integración completa. |

---

## ⚙️ Guía de Instalación y Ejecución Local

### 1. Requisitos Previos
* **Node.js:** Versión 20 o superior.
* **Docker y Docker Desktop:** Para levantar el contenedor de PostgreSQL 16.
* **npm:** Gestor de paquetes.

---

### 2. Configuración de Variables de Entorno

#### Frontend (`.env.local` en la raíz):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

#### Backend (`backend/.env`):
```env
PORT=4000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sena_caracterizacion?schema=public"
JWT_SECRET="sena_jwt_super_secret_key_2026_institutional"
JWT_EXPIRES_IN="8h"
CORS_ORIGIN="http://localhost:3001,http://localhost:3000"
```

---

### 3. Puesta en Marcha de la Base de Datos

1. Asegúrate de tener PostgreSQL corriendo en el puerto `5432`.
2. Ejecuta las migraciones y la semilla de catálogos y datos ficticios:
```bash
# Aplicar migraciones en PostgreSQL
npm run db:migrate

# Poblar catálogos oficiales y usuarios de prueba
npm run db:seed
```

> **Tip:** Puedes explorar visualmente la base de datos con Prisma Studio:
> ```bash
> npm run db:studio
> ```
> Disponible en: [http://localhost:5555](http://localhost:5555)

---

### 4. Ejecución de los Servidores

Abre dos terminales:

**Terminal 1 (Backend NestJS en puerto 4000):**
```bash
npm run dev:backend
```
*API Base:* `http://localhost:4000/api/v1`  
*Swagger Docs:* `http://localhost:4000/api/docs`

**Terminal 2 (Frontend Next.js en puerto 3001):**
```bash
npm run dev
```
*Portal Web:* [http://localhost:3001](http://localhost:3001)

---

## 🧪 Pruebas Automatizadas E2E

El proyecto incluye dos suites de pruebas automatizadas de integración de extremo a extremo que validan el backend y las reglas de negocio sin intervención manual:

```bash
# 1. Probar el módulo transaccional de Caracterizaciones (ACID, catálogos, radicado, RBAC)
npm run test:caracterizaciones

# 2. Probar el módulo de Gestión de Cuentas (CRUD usuarios, bcrypt, RBAC, toggle activo, auto-protección)
npm run test:usuarios
```

Ambas suites deben pasar con el **100% de éxito**.

---

## 🔑 Credenciales de Prueba Oficiales

> [!NOTE]
> Todos los datos de prueba son estrictamente ficticios para cumplir con el protocolo de protección de datos personales.

| Rol | Documento / Identificador | Tipo Doc | Contraseña |
|---|---|---|---|
| **Aprendiz Demo** | `109989001` (Valentina Gómez) | `TI` | `109989001` (o `123456`) |
| **Administrador Demo** | `admin.demo@ejemplo.com` | `CC` | `demo-no-produccion` (o `admin` / `12345`) |
| **Líder Bienestar Demo**| `lider.demo@ejemplo.com` | `CC` | `demo-no-produccion` |

---

## 🎨 Identidad Institucional y Estilos SENA

La interfaz del aplicativo respeta de forma estricta los lineamientos visuales oficiales de la marca SENA:

* 🟢 **Verde SENA Principal:** `#39A900`
* 🌲 **Verde SENA Oscuro:** `#00785a` / `#004e26`
* 🔵 **Azul SENA (Navy):** `#00304D`
* ⚪ **Fondos Claros:** `#edf5f7` / `#e8f8f3`
* 🔤 **Tipografía:** Work Sans (encabezados) y sans-serif legible.
