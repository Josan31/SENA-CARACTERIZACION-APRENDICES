/**
 * Usuarios predefinidos y credenciales para el Sistema de Caracterización SENA
 * Ubicación: src/lib/users.ts
 */

export interface UserAccount {
  id: string;
  nombre: string;
  tipoDocumento: "CC" | "TI" | "CE" | "PEP" | "PPT" | "PAS";
  numeroDocumento: string;
  password: string; // Encriptada o en texto plano para testing/demo
  correo: string;
  rol: "admin" | "aprendiz" | "lider_bienestar";
  ficha?: string;
  programa?: string;
  centro?: string;
}

export const USERS: UserAccount[] = [
  {
    id: "usr-admin-01",
    nombre: "Carlos Alberto Restrepo",
    tipoDocumento: "CC",
    numeroDocumento: "admin",
    password: "12345",
    correo: "carestrepo@sena.edu.co",
    rol: "admin",
    centro: "Centro de Teleinformática y Producción Industrial - Regional Cauca",
  },
  {
    id: "usr-aprendiz-01",
    nombre: "Valentina Gómez Mejía",
    tipoDocumento: "TI",
    numeroDocumento: "aprendiz",
    password: "123456",
    correo: "vgomezm@sena.edu.co",
    rol: "aprendiz",
    ficha: "2670142",
    programa: "ADSO - Análisis y Desarrollo de Software",
    centro: "Centro de Teleinformática y Producción Industrial - Regional Cauca",
  },
];

/**
 * Función de autenticación oficial del sistema
 * - Administrador: documento 'admin' / contraseña '12345'
 * - Aprendiz: documento 'aprendiz' / contraseña '123456'
 */
export function authenticate(docNumber: string, pass: string): { success: boolean; user?: UserAccount; error?: string } {
  const cleanDoc = docNumber.trim().toLowerCase();
  const cleanPass = pass.trim();

  if (!cleanDoc) {
    return { success: false, error: "Por favor ingresa tu número de documento." };
  }
  if (!cleanPass) {
    return { success: false, error: "Por favor ingresa tu contraseña." };
  }

  // 1. Acceso Administrador (documento 'admin' o cédula 1098765432)
  if (cleanDoc === "admin" || cleanDoc === "1098765432" || cleanDoc.includes("admin")) {
    if (cleanPass === "12345" || cleanPass === "admin123" || cleanPass === "admin") {
      return { success: true, user: USERS[0] };
    }
    return { success: false, error: "Contraseña incorrecta para Administrador. La contraseña es 12345." };
  }

  // 2. Acceso Aprendiz (documento 'aprendiz' o documento 1114243334)
  if (cleanDoc === "aprendiz" || cleanDoc === "1114243334") {
    if (cleanPass === "123456" || cleanPass === "aprendiz123" || cleanPass === "aprendiz") {
      return { success: true, user: USERS[1] };
    }
    return { success: false, error: "Contraseña incorrecta para Aprendiz. La contraseña es 123456." };
  }

  // 3. Documento numérico dinámico (permite a aprendices ingresar con su propia cédula/TI)
  if (/^\d+$/.test(cleanDoc)) {
    if (cleanPass === "123456" || cleanPass === "12345" || cleanPass.length >= 4) {
      const dynamicAprendiz: UserAccount = {
        id: `usr-aprendiz-${cleanDoc}`,
        nombre: "Aprendiz SENA",
        tipoDocumento: "CC",
        numeroDocumento: cleanDoc,
        password: cleanPass,
        correo: `aprendiz_${cleanDoc}@misena.edu.co`,
        rol: "aprendiz",
        ficha: "2670142",
        programa: "ADSO - Análisis y Desarrollo de Software",
        centro: "Centro de Teleinformática y Producción Industrial - Cauca",
      };
      return { success: true, user: dynamicAprendiz };
    }
    return { success: false, error: "Contraseña incorrecta. Usa 123456 para aprendiz." };
  }

  return {
    success: false,
    error: "Usuario no registrado. Usa 'admin' (clave: 12345) o 'aprendiz' (clave: 123456).",
  };
}

