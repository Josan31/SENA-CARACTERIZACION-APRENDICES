import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { RespuestaModuloFormulario } from "@/types/formularios";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const RESPUESTAS_FILE = path.join(DATA_DIR, "formularios_respuestas.json");

async function readRespuestasData(): Promise<RespuestaModuloFormulario[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const content = await fs.readFile(RESPUESTAS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeRespuestasData(data: RespuestaModuloFormulario[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(RESPUESTAS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const moduloId = searchParams.get("modulo");
    const aprendizDoc = searchParams.get("aprendiz");

    const all = await readRespuestasData();
    let filtered = all;

    if (moduloId) {
      filtered = filtered.filter((r) => r.moduloId === moduloId);
    }
    if (aprendizDoc) {
      filtered = filtered.filter((r) => r.aprendizDoc === aprendizDoc);
    }

    return NextResponse.json({
      success: true,
      total: filtered.length,
      respuestas: filtered,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Error al obtener respuestas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: RespuestaModuloFormulario = await req.json();

    if (!body.moduloId || !body.respuestas) {
      return NextResponse.json(
        { success: false, error: "Datos incompletos: moduloId y respuestas requeridos" },
        { status: 400 }
      );
    }

    const current = await readRespuestasData();

    // Actualizar registro existente del aprendiz para ese módulo o añadir nuevo
    const index = current.findIndex(
      (r) =>
        r.moduloId === body.moduloId &&
        (r.aprendizDoc === body.aprendizDoc || (!r.aprendizDoc && !body.aprendizDoc))
    );

    const record: RespuestaModuloFormulario = {
      ...body,
      fechaActualizacion: new Date().toISOString(),
    };

    if (index >= 0) {
      current[index] = record;
    } else {
      current.push(record);
    }

    await writeRespuestasData(current);

    // Intentar reenviar al backend NestJS si está disponible
    try {
      const nestUrl = process.env.BACKEND_API_URL || "http://localhost:4000/api/v1";
      fetch(`${nestUrl}/caracterizaciones/respuestas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      }).catch(() => {});
    } catch {
      // Silencioso
    }

    return NextResponse.json({
      success: true,
      message: `Respuestas del módulo "${body.moduloId}" guardadas exitosamente en el backend.`,
      fecha: record.fechaActualizacion,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Error al guardar respuestas" },
      { status: 500 }
    );
  }
}
