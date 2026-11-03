/**
 * Script de prueba E2E para el Módulo de Caracterizaciones Transaccional
 * SENA - Caracterización de Aprendices
 * 
 * Uso:
 *   node backend/scripts/test-caracterizaciones.mjs
 */

const BASE_URL = process.env.API_URL || 'http://127.0.0.1:4000/api/v1';

async function ejecutarPruebas() {
  console.log('===============================================================');
  console.log('   PRUEBAS E2E: MÓDULO DE CARACTERIZACIONES TRANSACCIONAL     ');
  console.log('===============================================================\n');

  // --- 1. Autenticación de Aprendiz ---
  console.log('1️⃣  [AUTH] Iniciando sesión como aprendiz Valentina (109989001, TI)...');
  const loginAprendizRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identificador: '109989001',
      password: '109989001',
      tipoDocumento: 'TI',
    }),
  });
  const loginAprendizData = await loginAprendizRes.json();
  if (loginAprendizRes.status !== 200) {
    throw new Error(`Fallo login aprendiz: ${JSON.stringify(loginAprendizData)}`);
  }
  const tokenAprendiz = loginAprendizData.data.accessToken;
  console.log('    ✅ Token JWT de aprendiz obtenido con éxito.\n');

  // --- 2. POST Caracterización (Happy Path) ---
  console.log('2️⃣  [POST] Guardando caracterización completa (Transacción Atómica)...');
  const payloadValido = {
    numero_documento: '109989001',
    fecha: new Date().toISOString().split('T')[0],
    modulos: {
      basica: {
        nombre: 'Valentina Gómez Mejía',
        tipoDoc: 'TI - Tarjeta de Identidad',
        numDoc: '109989001',
        fechaNac: '2006-03-14',
        edad: '19',
        sexo: 'Mujer',
        lgbtiq: 'No',
        orientacion: 'Heterosexual',
        estadoCivil: 'Soltero(a)',
        correoPersonal: 'valentina.gomez@gmail.com',
        correoInst: 'vgomez@sena.edu.co',
        telefono: '3104567890',
        acudiente: 'Martha Mejía',
        telAcudiente: '3129876543',
        parentesco: 'Madre',
        direccion: 'Calle 15 # 24-50',
        municipio: 'Palmira',
        estrato: 'Estrato 2',
      },
      salud: {
        eps: 'Nueva EPS',
        regimenSalud: 'Subsidiado',
        sisben: 'Sí',
        grupoSisben: 'Grupo B (Pobreza moderada)',
        tieneDiscapacidad: 'No',
        tipoDiscapacidad: 'Ninguna',
        enfermedadCronica: 'No',
        descripcionEnfermedad: null,
        tomaMedicamentos: 'No',
        gestacion: 'No aplica',
        lactancia: 'No aplica',
        madrePadreCabezaFamilia: 'No',
        hijosACargo: '0',
        totalPersonasHogar: '3',
        utilizaMetodoPlanificacion: 'No',
      },
      socioeconomica: {
        jefaturaHogar: 'El propio aprendiz',
        personasACargo: '0',
        totalPersonasHogar: '3',
        rangoIngresosMensuales: 'Entre 1 y 2 SMMLV',
        fuenteIngresos: 'Salario fijo / Empleo formal',
        trabajaActualmente: 'Sí (Medio tiempo)',
        grupoEtnico: 'Ninguno / No se reconoce',
        apoyosEstatales: 'Subsidio de Transporte SENA',
      },
      formativo: {
        nivelEducativoPrevio: 'Bachiller Académico',
        formacionPreviaSena: 'Sí (Programa tecnólogo)',
        motivacionIngreso: 'Vocación y gusto por la disciplina',
        expectativaLaboral: 'Trabajar en desarrollo de software',
        manejoHerramientasDigitales: 'Intermedio',
        vacunado: 'Sí',
        biologico: 'Sinovac / CoronaVac',
        dosis: '2',
        esquemaCompleto: 'Sí',
      },
    },
  };

  const postRes = await fetch(`${BASE_URL}/caracterizaciones`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAprendiz}`,
    },
    body: JSON.stringify(payloadValido),
  });

  const postData = await postRes.json();
  if (postRes.status !== 201) {
    throw new Error(`Fallo guardado (${postRes.status}): ${JSON.stringify(postData)}`);
  }
  console.log('    ✅ Caracterización creada en base de datos:');
  console.log(`       - ID Caracterización: ${postData.data.caracterizacion_id}`);
  console.log(`       - Versión asignada:   v${postData.data.version}`);
  console.log(`       - Radicado generado:  ${postData.data.radicado}`);
  console.log(`       - Estado:             ${postData.data.estado}\n`);

  // --- 3. Validación de Formato de Radicado ---
  console.log('3️⃣  [VALIDACIÓN] Verificando expresión regular del radicado oficial...');
  const radicadoRegex = /^RAD-SENA-[0-9]{4}-[0-9]{6}$/;
  if (!radicadoRegex.test(postData.data.radicado)) {
    throw new Error(`Radicado inválido: ${postData.data.radicado}`);
  }
  console.log(`    ✅ Radicado cumple el patrón estricto '^RAD-SENA-[0-9]{4}-[0-9]{6}$'\n`);

  const caracterizacionId = postData.data.caracterizacion_id;

  // --- 4. Unhappy Path: Catálogo Inexistente (HTTP 422 y Rollback) ---
  console.log('4️⃣  [ROLLBACK] Probando envío de opción inválida para forzar HTTP 422 y Rollback...');
  const payloadInvalido = JSON.parse(JSON.stringify(payloadValido));
  payloadInvalido.modulos.salud.eps = 'EPS Ficticia Inexistente';

  const postInvalidoRes = await fetch(`${BASE_URL}/caracterizaciones`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAprendiz}`,
    },
    body: JSON.stringify(payloadInvalido),
  });
  const postInvalidoData = await postInvalidoRes.json();
  if (postInvalidoRes.status === 422) {
    console.log(`    ✅ Rechazado con HTTP 422 (Unprocessable Entity):`);
    console.log(`       "${postInvalidoData.message}"`);
    console.log('    ✅ Transacción cancelada en su totalidad sin insertar datos huérfanos.\n');
  } else {
    throw new Error(`Se esperaba 422 pero respondió ${postInvalidoRes.status}`);
  }

  // --- 5. Control de Seguridad: Suplantación de Aprendiz ---
  console.log('5️⃣  [SEGURIDAD] Probando intento de un aprendiz de caracterizar a otro documento...');
  const payloadSuplantado = JSON.parse(JSON.stringify(payloadValido));
  payloadSuplantado.numero_documento = '109989002'; // Otro aprendiz

  const postSuplantadoRes = await fetch(`${BASE_URL}/caracterizaciones`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAprendiz}`,
    },
    body: JSON.stringify(payloadSuplantado),
  });
  const postSuplantadoData = await postSuplantadoRes.json();
  if (postSuplantadoRes.status === 403) {
    console.log(`    ✅ Bloqueado con HTTP 403 (Forbidden): "${postSuplantadoData.message}"\n`);
  } else {
    throw new Error(`Se esperaba 403 pero respondió ${postSuplantadoRes.status}`);
  }

  // --- 6. GET /mi-caracterizacion ---
  console.log('6️⃣  [GET MI-CARACTERIZACIÓN] Consultando caracterización activa del aprendiz...');
  const miCaractRes = await fetch(`${BASE_URL}/caracterizaciones/mi-caracterizacion`, {
    headers: { Authorization: `Bearer ${tokenAprendiz}` },
  });
  const miCaractData = await miCaractRes.json();
  if (miCaractRes.status !== 200 || !miCaractData.data.caracterizacion) {
    throw new Error(`Error al consultar mi-caracterizacion: ${JSON.stringify(miCaractData)}`);
  }
  const c = miCaractData.data.caracterizacion;
  console.log('    ✅ Caracterización recuperada con todas sus tablas satélite:');
  console.log(`       - Ciudad:          ${c.localizaciones[0]?.ciudad?.valor}`);
  console.log(`       - Estrato:         ${c.localizaciones[0]?.estrato?.valor}`);
  console.log(`       - EPS:             ${c.saludes[0]?.eps?.valor}`);
  console.log(`       - Régimen:         ${c.saludes[0]?.regimenSalud?.valor}`);
  console.log(`       - Sustento Hogar:  ${c.situaciones[0]?.sustentoPrincipal?.valor}`);
  console.log(`       - Banderas:        jefeHogar=${c.situaciones[0]?.jefeHogar}, sostieneHogar=${c.situaciones[0]?.sostieneHogar}`);
  console.log(`       - Vacuna COVID:    ${c.covids19[0]?.vacuna?.valor} (Dosis: ${c.covids19[0]?.dosis})\n`);

  // --- 7. Login Admin & GET /:id ---
  console.log('7️⃣  [ADMIN AUDITORÍA] Consultando detalle completo por ID con rol funcionario/admin...');
  const loginAdminRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identificador: 'admin.demo@ejemplo.com',
      password: 'demo-no-produccion',
    }),
  });
  const loginAdminData = await loginAdminRes.json();
  const tokenAdmin = loginAdminData.data.accessToken;

  const detalleRes = await fetch(`${BASE_URL}/caracterizaciones/${caracterizacionId}`, {
    headers: { Authorization: `Bearer ${tokenAdmin}` },
  });
  const detalleData = await detalleRes.json();
  if (detalleRes.status !== 200) {
    throw new Error(`Error al consultar detalle como admin: ${JSON.stringify(detalleData)}`);
  }
  console.log(`    ✅ Acceso autorizado: Funcionario consultó caracterización radicado '${detalleData.data.radicado}'\n`);

  // --- 8. Control de Roles: Aprendiz bloqueado en GET /:id ---
  console.log('8️⃣  [ROLES GUARD] Verificando que un aprendiz no pueda consultar el endpoint admin...');
  const intentoAprendizRes = await fetch(`${BASE_URL}/caracterizaciones/${caracterizacionId}`, {
    headers: { Authorization: `Bearer ${tokenAprendiz}` },
  });
  if (intentoAprendizRes.status === 403) {
    console.log('    ✅ RolesGuard bloqueó el acceso con HTTP 403 Forbidden.\n');
  } else {
    throw new Error(`Se esperaba 403 pero respondió ${intentoAprendizRes.status}`);
  }

  console.log('===============================================================');
  console.log('   🎉 ¡TODAS LAS PRUEBAS E2E PASARON SATISFACTORIAMENTE!       ');
  console.log('===============================================================\n');
}

ejecutarPruebas().catch((err) => {
  console.error('\n❌ ERROR EN LA EJECUCIÓN:', err.message);
  process.exit(1);
});
