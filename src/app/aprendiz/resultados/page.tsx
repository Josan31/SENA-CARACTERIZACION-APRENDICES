"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  RefreshCw,
  Sparkles,
  ClipboardList,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Formulario10Finalizado from "@/components/formularios/Formulario10Finalizado";
import { obtenerMiCaracterizacion, MiCaracterizacionResponse } from "@/lib/caracterizacion";
import { getUser } from "@/lib/auth";

export default function AprendizResultadosPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MiCaracterizacionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarResultado() {
      try {
        setLoading(true);
        setError(null);
        const res = await obtenerMiCaracterizacion();
        setData(res);
      } catch (err: any) {
        console.error("Error al obtener caracterización del aprendiz:", err);
        setError(err.message || "No se pudo cargar la información de caracterización.");
      } finally {
        setLoading(false);
      }
    }

    cargarResultado();
  }, []);

  const user = getUser();
  const caracterizacion = data?.caracterizacion;
  const aprendiz = data?.aprendiz;

  const fechaRadicado = caracterizacion
    ? new Date(caracterizacion.fecha || caracterizacion.createdAt).toLocaleDateString("es-CO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full font-primary">
      {/* Botón Circular de Retorno */}
      <div>
        <Link
          href="/aprendiz/formularios"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#00304d] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer hover:-translate-x-0.5"
          title="Volver a Formularios"
        >
          <ArrowRight className="rotate-180" size={20} strokeWidth={2.6} />
        </Link>
      </div>

      {/* Encabezado */}
      <header className="rounded-2xl bg-gradient-to-r from-[#00304d] via-[#004e7c] to-[#0077b6] p-6 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold text-sky-100 backdrop-blur-xs mb-2">
            <Sparkles size={12} />
            Certificación Oficial de Caracterización
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Mis Resultados y Radicado
          </h1>
          <p className="text-xs md:text-sm text-sky-100/90 mt-1">
            Consulta y descarga tu constancia oficial de diligenciamiento requerida por Bienestar al Aprendiz.
          </p>
        </div>

        {caracterizacion && (
          <Link
            href="/aprendiz/formularios"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold text-sena-navy shadow-lg hover:bg-slate-50 transition-all hover:scale-105 shrink-0"
          >
            <RefreshCw size={14} />
            <span>Actualizar Datos</span>
          </Link>
        )}
      </header>

      {/* Contenido Principal */}
      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-2 sm:p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="animate-spin text-[#008f4c]" size={36} />
            <p className="text-sm font-bold text-[#00304d]">
              Consultando constancia oficial en servidores del SENA...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
            <AlertCircle className="text-rose-500" size={42} />
            <h3 className="text-lg font-bold text-slate-800">No se pudo cargar la constancia</h3>
            <p className="text-xs text-slate-500 max-w-md">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 rounded-full bg-slate-100 px-5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200"
            >
              Reintentar
            </button>
          </div>
        ) : caracterizacion ? (
          <Formulario10Finalizado
            radicado={caracterizacion.radicado || "RAD-SENA-2026-000000"}
            fechaRadicado={fechaRadicado}
            nombreAprendiz={aprendiz?.nombreCompleto || user?.nombre || "Aprendiz SENA"}
            documento={`${aprendiz?.tipoDocumento?.valor || user?.tipoDocumento || "Doc."}: ${aprendiz?.numeroDocumento || user?.numeroDocumento}`}
            programa={user?.programa || "Análisis y Desarrollo de Software"}
            ficha={user?.ficha || "2670142"}
            centro={user?.centro || "Centro de Teleinformática y Producción Industrial - Regional Cauca"}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-5">
            <div className="h-16 w-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
              <ClipboardList size={32} />
            </div>
            <div className="max-w-md space-y-2">
              <h2 className="text-xl font-bold text-[#00304d]">
                Aún no has completado tu caracterización
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Para acceder a los beneficios de Bienestar al Aprendiz y expedir tu certificado oficial, debes completar los 4 módulos de caracterización institucional.
              </p>
            </div>
            <Link
              href="/aprendiz/formularios"
              className="inline-flex items-center gap-2 rounded-full bg-[#008f4c] hover:bg-[#00763f] text-white px-7 py-3 text-xs font-bold shadow-lg transition-all hover:scale-105"
            >
              <span>Comenzar Caracterización Ahora</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
