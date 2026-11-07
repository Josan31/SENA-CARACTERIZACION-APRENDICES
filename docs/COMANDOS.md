# Comandos del Proyecto

# Estructura

- Raíz: frontend Next.js
- `backend/`: API NestJS + Prisma
- `backend/.env`: variables de la base de datos (`DATABASE_URL`, `DIRECT_URL`)

> No uses `npx prisma` desde la raíz: descarga Prisma 7 y falla. Usa los scripts de abajo, que usan el Prisma 6 local de `backend/node_modules`.

# Frontend (raíz)

```bash
npm run dev       # servidor de desarrollo Next.js (http://localhost:3000)
npm run build     # compilar para producción
npm start         # servir build de producción
npm run lint      # ESLint
```

## Backend

```bash
npm run backend:dev   # NestJS en modo watch (http://localhost:4000/api/v1)
```

Otros comandos desde `backend/`:

```bash
npm run start         # NestJS sin watch
npm run start:prod    # ejecutar dist compilado
npm run build         # compilar
npm run lint          # oxlint
npm run format        # prettier
```

Documentación Swagger: http://localhost:4000/api/docs

## Base de datos

```bash
npm run db:status     # verificar conexión y estado de migraciones
npm run db:migrate    # aplicar/crear migraciones (prisma migrate dev)
npm run db:generate   # regenerar Prisma Client tras cambiar el schema
npm run db:studio     # abrir Prisma Studio (interfaz visual)
```

### Validar la conexión

```bash
npm run db:status
```

Salida esperada:

```
Datasource "db": PostgreSQL database "postgres", schema "public" at "...pooler.supabase.com:5432"
3 migrations found in prisma/migrations
Database schema is up to date!
```

Al arrancar `npm run backend:dev`, el log debe mostrar:

```
Conectado exitosamente a PostgreSQL mediante Prisma
```

> `backend/src/database/prisma.service.ts` captura el error y **no detiene** el arranque, por eso `db:status` es la verificación más confiable.
