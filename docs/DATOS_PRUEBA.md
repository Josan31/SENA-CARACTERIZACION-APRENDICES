# Datos de Prueba para Tablero e Informe Regional

Este documento describe cómo ejecutar los scripts SQL de prueba para generar datos ficticios en volumen.

## Archivos

- `backend/prisma/seed_volumen.sql` - Genera 120 aprendices ficticios con distribución realista
- `backend/prisma/limpiar_volumen.sql` - Elimina solo los datos generados (marcados con `99900%`)

## Características de los datos generados

- **Marcado**: Todos los aprendices tienen `numero_documento` y `usuario` que empiezan por `99900`. Nombres ficticios tipo "Aprendiz Prueba XXX".
- **Idempotente**: Si ya existen datos con `99900%`, el script los elimina y regenera sin duplicados.
- **120 aprendices totales**: ~110 con al menos una caracterización, ~10 sin ninguna caracterización.
- **Distribución**:
  - Sexo: ~55% mujeres, ~37% hombres, ~8% intersexuales
  - Se reconoce LGBTIQ+: ~8%
  - Ciudad: ~70% Palmira (repartidos en barrios/comunas), resto otras ciudades del catálogo
  - 4 fichas (2 tecnólogos y 2 técnicos, diurna y nocturna)
  - Estados: ~70% completas (con radicado), ~20% en_curso (sin radicado)
  - 10 aprendices con 2 versiones (v1 completa, v2 completa o en_curso)
  - EPS variadas
  - ~10% con discapacidad
  - ~6% de las mujeres en gestación (semana coherente)
  - ~12% cabezas de hogar con 1 a 3 hijos
  - Vacunación COVID con dosis 0 a 3 coherentes
  - ~12% con apoyos del estado
  - Ingresos y poblaciones variadas

## Cómo ejecutar en SQL Editor de Supabase

### Opción 1: Ejecutar seed_volumen.sql

1. Abrir [Supabase Dashboard](https://supabase.com/dashboard) → Proyecto → SQL Editor
2. Crear una nueva consulta
3. Copiar y pegar el contenido completo de `backend/prisma/seed_volumen.sql`
4. Ejecutar (Run). El script está en una transacción (`BEGIN`/`COMMIT`).
5. Al final se mostrará una consulta de verificación con conteos por tabla

### Opción 2: Limpiar datos de prueba

Si deseas eliminar solo los datos generados:

1. Abrir SQL Editor de Supabase
2. Copiar y pegar el contenido de `backend/prisma/limpiar_volumen.sql`
3. Ejecutar (Run)
4. Se mostrará el conteo restante de registros con `99900%` (debe ser 0)

## Notas importantes

- **No requiere Prisma Client**: Es SQL puro con `generate_series()` y funciones aleatorias.
- **Respeta restricciones**: Cumple con NOT NULL, FKs, CHECK, UNIQUE(aprendiz_id, version), trigger de coherencia de jefatura, y asigna radicado solo en estado 'completa' usando la secuencia `radicado_seq`.
- **Usa catálogos por subconsulta**: No hay UUIDs hardcodeados, se obtienen por `(categoria, valor)`.
- **Tablas satélite coherentes**: Todas las tablas satélite tienen `aprendiz_id` y `caracterizacion_id` coherentes.
- **Idempotente**: Seguro de ejecutar múltiples veces.
