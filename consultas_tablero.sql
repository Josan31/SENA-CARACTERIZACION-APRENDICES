-- ============================================================
-- CONSULTAS DE EJEMPLO PARA EL TABLERO Y EL INFORME CONSOLIDADO
-- Úsalas con datos de prueba. Supabase -> SQL Editor: resalta UNA
-- consulta y dale Run.
-- Los nombres de columnas siguen el diseño; si una consulta da error
-- de columna o tabla, copia el mensaje y se ajusta.
-- ============================================================

-- 1. Estado de las caracterizaciones
SELECT estado, count(*) AS total
FROM caracterizaciones
GROUP BY estado
ORDER BY total DESC;

-- 2. Porcentaje de aprendices con caracterización completa
SELECT round(
         100.0 * count(DISTINCT c.aprendiz_id) FILTER (WHERE c.estado = 'completa')
         / nullif((SELECT count(*) FROM aprendices), 0), 1
       ) AS porcentaje_completo
FROM caracterizaciones c;

-- 3. Aprendices por sexo
SELECT s.valor AS sexo, count(*) AS total
FROM aprendices a
JOIN catalogos s ON s.id = a.sexo_id
GROUP BY s.valor
ORDER BY total DESC;

-- 4. Aprendices por ciudad
SELECT c.valor AS ciudad, count(*) AS total
FROM localizacion l
JOIN catalogos c ON c.id = l.ciudad_id
GROUP BY c.valor
ORDER BY total DESC;

-- 5. Residentes en Palmira por barrio o comuna
SELECT coalesce(b.valor, 'Sin dato') AS barrio, count(*) AS total
FROM localizacion l
JOIN catalogos c ON c.id = l.ciudad_id
LEFT JOIN catalogos b ON b.id = l.barrio_id
WHERE c.valor ILIKE '%palmira%'
GROUP BY 1
ORDER BY total DESC;

-- 6. Cabezas de hogar por sexo y promedio de hijos (ejemplo pedido en la reunión)
SELECT s.valor AS sexo,
       count(*) FILTER (WHERE r.cabeza_familia) AS cabezas_de_hogar,
       round(avg(r.num_hijos) FILTER (WHERE r.cabeza_familia), 1) AS promedio_hijos
FROM aprendices a
JOIN catalogos s ON s.id = a.sexo_id
JOIN salud_sexual_reproductiva r ON r.aprendiz_id = a.id
GROUP BY s.valor;

-- 7. Aprendices por EPS
SELECT e.valor AS eps, count(*) AS total
FROM salud sa
JOIN catalogos e ON e.id = sa.eps_id
GROUP BY e.valor
ORDER BY total DESC;

-- 8. Aprendices por ficha y programa
SELECT f.numero_ficha, p.valor AS programa, count(DISTINCT fo.aprendiz_id) AS aprendices
FROM formacion fo
JOIN fichas f ON f.id = fo.ficha_id
JOIN catalogos p ON p.id = f.programa_id
GROUP BY f.numero_ficha, p.valor
ORDER BY aprendices DESC;

-- 9. INFORME CONSOLIDADO PARA LA REGIONAL: solo totales, sin datos individuales
-- (el dato "con contrato / sin contrato" aún no existe en la base: pendiente con Edwin)
-- Nota: en el informe real conviene ocultar los grupos con muy pocas personas.
SELECT s.valor AS sexo,
       count(*) AS total,
       count(*) FILTER (WHERE a.se_reconoce_lgbtiq) AS lgbtiq
FROM aprendices a
JOIN catalogos s ON s.id = a.sexo_id
GROUP BY s.valor
ORDER BY total DESC;

-- 10. Aprendices que aún NO tienen caracterización completa
SELECT a.numero_documento, a.nombre_completo
FROM aprendices a
WHERE NOT EXISTS (
  SELECT 1 FROM caracterizaciones c
  WHERE c.aprendiz_id = a.id AND c.estado = 'completa'
)
ORDER BY a.nombre_completo;

-- 11. Aprendices recaracterizados (2 o más versiones completas)
SELECT a.numero_documento, count(*) AS versiones_completas
FROM caracterizaciones c
JOIN aprendices a ON a.id = c.aprendiz_id
WHERE c.estado = 'completa'
GROUP BY a.numero_documento
HAVING count(*) >= 2
ORDER BY versiones_completas DESC;

-- 12. CASOS DE SALUD (dato sensible, acceso restringido): aprendices con discapacidad
SELECT a.numero_documento, coalesce(t.valor, 'Sin especificar') AS tipo_discapacidad
FROM salud sa
JOIN aprendices a ON a.id = sa.aprendiz_id
LEFT JOIN catalogos t ON t.id = sa.tipo_discapacidad_id
WHERE sa.presenta_discapacidad = true;
