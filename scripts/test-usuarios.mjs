/**
 * Script de prueba E2E para el Módulo de Usuarios y Gestión de Cuentas (Fase B)
 * SENA - Caracterización de Aprendices
 * 
 * Uso:
 *   node scripts/test-usuarios.mjs
 */

const BASE_URL = process.env.API_URL || 'http://127.0.0.1:4000/api/v1';

async function ejecutarPruebas() {
  console.log('===============================================================');
  console.log('    PRUEBAS E2E: MÓDULO DE USUARIOS Y GESTIÓN DE CUENTAS      ');
  console.log('===============================================================\n');

  // --- 1. Autenticación de Administrador ---
  console.log('1️⃣  [AUTH] Iniciando sesión como Administrador (admin.demo@ejemplo.com)...');
  const loginAdminRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identificador: 'admin.demo@ejemplo.com',
      password: 'demo-no-produccion',
    }),
  });
  const loginAdminData = await loginAdminRes.json();
  if (loginAdminRes.status !== 200 || !loginAdminData.data?.accessToken) {
    throw new Error(`Fallo login de admin (${loginAdminRes.status}): ${JSON.stringify(loginAdminData)}`);
  }
  const tokenAdmin = loginAdminData.data.accessToken;
  const adminId = loginAdminData.data.user?.id;
  console.log(`    ✅ Token de Administrador obtenido con éxito. ID: ${adminId}\n`);

  // --- 2. GET /usuarios (Listar Usuarios) ---
  console.log('2️⃣  [GET /usuarios] Listando usuarios existentes...');
  const getUsuariosRes = await fetch(`${BASE_URL}/usuarios`, {
    headers: { Authorization: `Bearer ${tokenAdmin}` },
  });
  const usuariosData = await getUsuariosRes.json();
  if (getUsuariosRes.status !== 200) {
    throw new Error(`Fallo GET /usuarios (${getUsuariosRes.status}): ${JSON.stringify(usuariosData)}`);
  }
  console.log(`    ✅ Total usuarios encontrados: ${usuariosData.data.length}`);
  const tienePassword = usuariosData.data.some(u => 'password' in u);
  if (tienePassword) {
    throw new Error('❌ Fallo de seguridad: La lista de usuarios expone el campo password!');
  }
  console.log('    ✅ Verificación de seguridad: Ningún usuario expone su contraseña.\n');

  // Asegurar limpieza de usuario de prueba si existiera de una ejecución previa
  const testEmail = 'coordinador.test@sena.edu.co';
  const previo = usuariosData.data.find(u => u.correo === testEmail);
  if (previo) {
    await fetch(`${BASE_URL}/usuarios/${previo.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
  }

  // --- 3. POST /usuarios (Crear nuevo usuario) ---
  console.log(`3️⃣  [POST /usuarios] Creando usuario '${testEmail}' con rol coordinacion...`);
  const postRes = await fetch(`${BASE_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAdmin}`,
    },
    body: JSON.stringify({
      nombre: 'Coordinador Pruebas E2E',
      correo: testEmail,
      password: 'PasswordSegura2026*',
      rol: 'coordinacion',
      activo: true,
    }),
  });
  const postData = await postRes.json();
  if (postRes.status !== 201) {
    throw new Error(`Fallo POST /usuarios (${postRes.status}): ${JSON.stringify(postData)}`);
  }
  const nuevoUsuario = postData.data;
  console.log(`    ✅ Usuario creado exitosamente con ID: ${nuevoUsuario.id}`);
  if (nuevoUsuario.password) {
    throw new Error('❌ Fallo de seguridad: El endpoint de creación retornó el hash del password!');
  }
  console.log('    ✅ El response DTO excluyó el password correctamente.\n');

  // --- 4. POST /usuarios (Validar unicidad de correo - Conflicto 409) ---
  console.log('4️⃣  [POST /usuarios - CONFLICT] Intentando duplicar el correo...');
  const dupRes = await fetch(`${BASE_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAdmin}`,
    },
    body: JSON.stringify({
      nombre: 'Duplicado',
      correo: testEmail,
      password: 'OtraPassword123*',
      rol: 'calidad',
    }),
  });
  if (dupRes.status !== 409) {
    throw new Error(`Se esperaba status 409 Conflict pero se obtuvo: ${dupRes.status}`);
  }
  console.log('    ✅ Control de unicidad validado correctamente (HTTP 409 Conflict).\n');

  // --- 5. Login con el usuario recién creado ---
  console.log(`5️⃣  [AUTH] Verificando login con las credenciales creadas (${testEmail})...`);
  const loginNuevoRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identificador: testEmail,
      password: 'PasswordSegura2026*',
    }),
  });
  const loginNuevoData = await loginNuevoRes.json();
  if (loginNuevoRes.status !== 200 || loginNuevoData.data?.user?.rol !== 'coordinacion') {
    throw new Error(`Fallo login con nuevo usuario (${loginNuevoRes.status}): ${JSON.stringify(loginNuevoData)}`);
  }
  console.log(`    ✅ Autenticación exitosa! Rol obtenido en token: ${loginNuevoData.data.user.rol}\n`);

  // --- 6. PUT /usuarios/:id (Actualizar datos) ---
  console.log(`6️⃣  [PUT /usuarios/${nuevoUsuario.id}] Actualizando nombre del usuario...`);
  const putRes = await fetch(`${BASE_URL}/usuarios/${nuevoUsuario.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenAdmin}`,
    },
    body: JSON.stringify({
      nombre: 'Coordinador Académico Principal Actualizado',
    }),
  });
  const putData = await putRes.json();
  if (putRes.status !== 200 || putData.data?.nombre !== 'Coordinador Académico Principal Actualizado') {
    throw new Error(`Fallo PUT /usuarios (${putRes.status}): ${JSON.stringify(putData)}`);
  }
  console.log('    ✅ Usuario actualizado correctamente en base de datos.\n');

  // --- 7. PATCH /usuarios/:id/toggle-activo (Desactivar usuario) ---
  console.log(`7️⃣  [PATCH /usuarios/${nuevoUsuario.id}/toggle-activo] Desactivando cuenta...`);
  const toggleOffRes = await fetch(`${BASE_URL}/usuarios/${nuevoUsuario.id}/toggle-activo`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${tokenAdmin}` },
  });
  const toggleOffData = await toggleOffRes.json();
  if (toggleOffRes.status !== 200 || toggleOffData.data?.activo !== false) {
    throw new Error(`Fallo desactivación (${toggleOffRes.status}): ${JSON.stringify(toggleOffData)}`);
  }
  console.log('    ✅ Cuenta desactivada correctamente (activo = false).\n');

  // --- 8. Login con usuario desactivado (Debe rechazar 401) ---
  console.log('8️⃣  [AUTH - BLOQUEO] Intentando iniciar sesión con la cuenta desactivada...');
  const loginBloqueadoRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identificador: testEmail,
      password: 'PasswordSegura2026*',
    }),
  });
  if (loginBloqueadoRes.status !== 401) {
    throw new Error(`Se esperaba status 401 Unauthorized pero se obtuvo: ${loginBloqueadoRes.status}`);
  }
  console.log('    ✅ Acceso bloqueado exitosamente para cuenta inactiva (HTTP 401).\n');

  // --- 9. PATCH /usuarios/:id/toggle-activo (Reactivar usuario) ---
  console.log(`9️⃣  [PATCH /usuarios/${nuevoUsuario.id}/toggle-activo] Reactivando cuenta...`);
  const toggleOnRes = await fetch(`${BASE_URL}/usuarios/${nuevoUsuario.id}/toggle-activo`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${tokenAdmin}` },
  });
  const toggleOnData = await toggleOnRes.json();
  if (toggleOnRes.status !== 200 || toggleOnData.data?.activo !== true) {
    throw new Error(`Fallo reactivación (${toggleOnRes.status}): ${JSON.stringify(toggleOnData)}`);
  }
  console.log('    ✅ Cuenta reactivada correctamente (activo = true).\n');

  // --- 10. Protección contra auto-desactivación y auto-eliminación ---
  if (adminId) {
    console.log('🔟 [SEGURIDAD] Probando auto-desactivación del propio administrador activo...');
    const selfToggleRes = await fetch(`${BASE_URL}/usuarios/${adminId}/toggle-activo`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    if (selfToggleRes.status !== 400) {
      throw new Error(`Se esperaba 400 Bad Request pero se obtuvo: ${selfToggleRes.status}`);
    }
    console.log('    ✅ Protección anti auto-desactivación operativa (HTTP 400).\n');

    console.log('1️⃣1️⃣ [SEGURIDAD] Probando auto-eliminación del propio administrador activo...');
    const selfDeleteRes = await fetch(`${BASE_URL}/usuarios/${adminId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${tokenAdmin}` },
    });
    if (selfDeleteRes.status !== 400) {
      throw new Error(`Se esperaba 400 Bad Request pero se obtuvo: ${selfDeleteRes.status}`);
    }
    console.log('    ✅ Protección anti auto-eliminación operativa (HTTP 400).\n');
  }

  // --- 11. DELETE /usuarios/:id (Eliminar usuario creado) ---
  console.log(`1️⃣2️⃣ [DELETE /usuarios/${nuevoUsuario.id}] Eliminando usuario de prueba...`);
  const deleteRes = await fetch(`${BASE_URL}/usuarios/${nuevoUsuario.id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${tokenAdmin}` },
  });
  const deleteData = await deleteRes.json();
  if (deleteRes.status !== 200) {
    throw new Error(`Fallo DELETE /usuarios (${deleteRes.status}): ${JSON.stringify(deleteData)}`);
  }
  console.log('    ✅ Usuario eliminado exitosamente.\n');

  // --- 12. GET /usuarios/:id (Comprobar 404 Not Found tras eliminación) ---
  console.log(`1️⃣3️⃣ [GET /usuarios/${nuevoUsuario.id}] Verificando 404 tras borrado...`);
  const get404Res = await fetch(`${BASE_URL}/usuarios/${nuevoUsuario.id}`, {
    headers: { Authorization: `Bearer ${tokenAdmin}` },
  });
  if (get404Res.status !== 404) {
    throw new Error(`Se esperaba status 404 pero se obtuvo: ${get404Res.status}`);
  }
  console.log('    ✅ Confirmado 404 Not Found.\n');

  // --- 13. RBAC: Aprendiz no puede acceder al módulo de usuarios ---
  console.log('1️⃣4️⃣ [RBAC] Comprobando que un aprendiz no tenga permiso a /usuarios...');
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
  const tokenAprendiz = loginAprendizData.data?.accessToken;
  const rbacRes = await fetch(`${BASE_URL}/usuarios`, {
    headers: { Authorization: `Bearer ${tokenAprendiz}` },
  });
  if (rbacRes.status !== 403) {
    throw new Error(`Se esperaba status 403 Forbidden pero se obtuvo: ${rbacRes.status}`);
  }
  console.log('    ✅ Control de Acceso Basado en Roles (RBAC) validado (HTTP 403 Forbidden).\n');

  console.log('===============================================================');
  console.log('   🎉 TODAS LAS PRUEBAS E2E DEL MÓDULO DE USUARIOS PASARON!    ');
  console.log('===============================================================');
}

ejecutarPruebas().catch((err) => {
  console.error('\n❌ ERROR EN PRUEBAS E2E:', err.message);
  process.exit(1);
});
