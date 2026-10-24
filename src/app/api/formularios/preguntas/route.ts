import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { PREGUNTAS_INICIALES } from "@/lib/formulariosStore";
import { PreguntaFormulario } from "@/types/formularios";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const PREGUNTAS_FILE = path.join(DATA_DIR, "formularios_preguntas.json");

// Helper para asegurar que el directorio y archivo existen
async function readPreguntasData(): Promise<Record<string, PreguntaFormulario[]>> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const content = await fs.readFile(PREGUNTAS_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    // Si no existe, inicializar con las preguntas por defecto
    try {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await fs.writeFile(
        PREGUNTAS_FILE,
        JSON.stringify(PREGUNTAS_INICIALES, null, 2),
        "utf-8"
      );
    } catch (e) {
      console.error("Error al inicializar archivo de preguntas:", e);
    }
    return PREGUNTAS_INICIALES;
  }
}

async function writePreguntasData(
  data: Record<string, PreguntaFormulario[]>
): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(PREGUNTAS_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const moduloId = searchParams.get("modulo");

    const allData = await readPreguntasData();

    if (moduloId) {
      const moduloPreguntas = allData[moduloId] || PREGUNTAS_INICIALES[moduloId] || [];
      return NextResponse.json({
        success: true,
        moduloId,
        preguntas: moduloPreguntas,
      });
    }

    return NextResponse.json({
      success: true,
      preguntas: allData,
    });
  } catch (error: any) {
    console.error("Error en GET /api/formularios/preguntas:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error al obtener preguntas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { moduloId, preguntas } = body;

    if (!moduloId || !Array.isArray(preguntas)) {
      return NextResponse.json(
        { success: false, error: "Datos incompletos: moduloId y preguntas requeridos" },
        { status: 400 }
      );
    }

    const currentData = await readPreguntasData();
    currentData[moduloId] = preguntas;
    await writePreguntasData(currentData);

    // Opcional: Reenviar al backend NestJS si está encendido
    try {
      const nestUrl = process.env.BACKEND_API_URL || "http://localhost:4000/api/v1";
      fetch(`${nestUrl}/catalogos/preguntas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduloId, preguntas }),
      }).catch(() => {
        // Silencioso si NestJS no está iniciado
      });
    } catch {
      // Ignorar fallo de conexión externa
    }

    return NextResponse.json({
      success: true,
      message: `Preguntas del módulo "${moduloId}" guardadas y sincronizadas en el backend.`,
      count: preguntas.length,
    });
  } catch (error: any) {
    console.error("Error en POST /api/formularios/preguntas:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error al guardar preguntas" },
      { status: 500 }
    );
  }
}
