"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Heart,
  HelpCircle,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
  Users,
} from "lucide-react";

export default function FormularioAsesoriaDirecta() {
  const router = useRouter();

  // Estados para solicitar cita (iniciados vacíos para diligenciamiento limpio)
  const [tipoAsesoria, setTipoAsesoria] = useState("");
  const [profesional, setProfesional] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [horario, setHorario] = useState("");
  const [motivo, setMotivo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [prioritaria, setPrioritaria] = useState("");
  const [atencionPrevia, setAtencionPrevia] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const payload = {
          tipo: "solicitud_asesoria_directa",
          tipoAsesoria, profesional, modalidad, horario, motivo,
          telefono, correo, prioritaria, atencionPrevia,
          fechaSolicitud: new Date().toISOString()
        };
        localStorage.setItem("sena_caracterizacion_cita_asesoria", JSON.stringify(payload));
      }
      setIsSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4 md:p-6 font-primary text-slate-800">
      {/* Triángulo decorativo institucional amarillo */}
      <div
        className="absolute top-0 right-0 w-12 h-12 bg-[#fdc300] pointer-events-none z-10"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden="true"
      />

      {/* Encabezado */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/formularios"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sena-navy shadow-sm border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-x-0.5"
            title="Volver a Formularios"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </Link>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sena-green">
              Bienestar al Aprendiz
            </span>
            <h1 className="text-xl md:text-2xl font-black text-sena-navy tracking-tight leading-tight">
              Solicitud de Asesoría Directa
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Completa la información para coordinar tu cita confidencial con el equipo de Bienestar.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-sena-green border border-emerald-200">
            <span className="h-2 w-2 rounded-full bg-sena-green animate-pulse" />
            Atención Integral y Confidencial
          </span>
          <div className="hidden md:flex flex-col items-end pl-3 border-l border-slate-200">
            <span className="text-lg font-black text-sena-green leading-none">
              SENA
            </span>
            <span className="text-[8px] font-semibold text-sena-navy leading-tight mt-1">
              Tecnología e innovación
            </span>
          </div>
        </div>
      </header>

      {/* Tarjeta Principal */}
      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-6">
        {/* Cabecera de la tarjeta */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sena-green to-[#007796] text-white shadow-md shadow-sena-green/20">
            <MessageSquare size={22} strokeWidth={2.2} />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-bold text-sena-navy">
              Acompañamiento y Orientación Personalizada
            </h2>
            <p className="text-xs text-slate-500">
              Aquí puedes solicitar apoyo psicológico, asesoría socioeconómica, prevención de deserción o salud sexual.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-sena-green">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-xl font-black text-sena-navy">
              ¡Solicitud de Asesoría Radicada!
            </h3>
            <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
              Hemos registrado tu solicitud con el código de seguimiento{" "}
              <strong className="text-sena-green-dark">SOL-BIENESTAR-2026-0421</strong>. Un profesional del equipo de Bienestar al Aprendiz se pondrá en contacto contigo en un plazo máximo de 24 horas hábiles a través de tu correo o teléfono.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-sena-navy hover:bg-slate-50"
              >
                Nueva Solicitud
              </button>
              <Link
                href="/admin/formularios"
                className="rounded-full bg-sena-green px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-sena-green-dark transition-colors"
              >
                Volver a Formularios
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Tipo de Asesoría */}
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  ¿Qué tipo de asesoría o acompañamiento requieres? *
                </label>
                <div className="relative">
                  <select
                    value={tipoAsesoria}
                    onChange={(e) => setTipoAsesoria(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all appearance-none pr-8"
                    required
                  >
                    <option value="Salud Sexual y Reproductiva / Orientación Familiar">
                      Salud Sexual y Reproductiva / Orientación Familiar
                    </option>
                    <option value="Acompañamiento Psicológico y Salud Mental">
                      Acompañamiento Psicológico y Salud Mental
                    </option>
                    <option value="Apoyo Socioeconómico y Beneficios de Sostenimiento (FIC / Alimentación)">
                      Apoyo Socioeconómico y Beneficios de Sostenimiento (FIC / Alimentación)
                    </option>
                    <option value="Prevención de Deserción y Orientación Pedagógica">
                      Prevención de Deserción y Orientación Pedagógica
                    </option>
                    <option value="Resolución de Conflictos y Convivencia">
                      Resolución de Conflictos y Convivencia
                    </option>
                  </select>
                  <Heart
                    size={15}
                    className="absolute right-3 top-3 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Profesional Preferido */}
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  Especialidad o Profesional Preferido *
                </label>
                <div className="relative">
                  <select
                    value={profesional}
                    onChange={(e) => setProfesional(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all appearance-none pr-8"
                    required
                  >
                    <option value="Psicólogo(a) / Promotor de Bienestar">
                      Psicólogo(a) / Promotor de Bienestar
                    </option>
                    <option value="Trabajador(a) Social">
                      Trabajador(a) Social
                    </option>
                    <option value="Enfermero(a) Ocupacional">
                      Enfermero(a) Ocupacional
                    </option>
                    <option value="Coordinador(a) de Bienestar">
                      Coordinador(a) de Bienestar
                    </option>
                    <option value="Indiferente / El profesional asignado según agenda">
                      Indiferente / El profesional asignado según agenda
                    </option>
                  </select>
                  <User
                    size={15}
                    className="absolute right-3 top-3 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Modalidad de Atención */}
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  Modalidad de Atención *
                </label>
                <div className="relative">
                  <select
                    value={modalidad}
                    onChange={(e) => setModalidad(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all appearance-none pr-8"
                    required
                  >
                    <option value="Presencial en Centro de Formación (Oficina de Bienestar)">
                      Presencial en Centro de Formación (Oficina de Bienestar)
                    </option>
                    <option value="Virtual por Microsoft Teams / Llamada">
                      Virtual por Microsoft Teams / Llamada
                    </option>
                  </select>
                  <MapPin
                    size={15}
                    className="absolute right-3 top-3 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Horario o Disponibilidad */}
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  Jornada u Horario de Disponibilidad *
                </label>
                <div className="relative">
                  <select
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all appearance-none pr-8"
                    required
                  >
                    <option value="Jornada Diurna (08:00 AM - 12:00 M)">
                      Jornada Diurna (08:00 AM - 12:00 M)
                    </option>
                    <option value="Jornada Tarde (02:00 PM - 06:00 PM)">
                      Jornada Tarde (02:00 PM - 06:00 PM)
                    </option>
                    <option value="Jornada Nocturna (06:00 PM - 08:30 PM)">
                      Jornada Nocturna (06:00 PM - 08:30 PM)
                    </option>
                  </select>
                  <Clock
                    size={15}
                    className="absolute right-3 top-3 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Motivo de la solicitud (ancho completo) */}
            <div>
              <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                Describe brevemente el motivo de tu solicitud o tema a tratar *
              </label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={3}
                placeholder="Por favor describe tu caso de manera breve. Esta información será tratada con absoluta reserva y secreto profesional..."
                className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] p-3 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all resize-none"
                required
              />
            </div>

            {/* Fila de Contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  No. Teléfono Celular de Contacto *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="3001234567"
                    className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] pl-9 pr-3.5 py-2.5 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all"
                    required
                  />
                  <Phone
                    size={15}
                    className="absolute left-3 top-3 text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  Correo Electrónico para Notificación *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="tu.correo@sena.edu.co"
                    className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] pl-9 pr-3.5 py-2.5 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all"
                    required
                  />
                  <Mail
                    size={15}
                    className="absolute left-3 top-3 text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Fila de Prioridad y Antecedente */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  ¿Consideras que tu situación requiere atención prioritaria? *
                </label>
                <select
                  value={prioritaria}
                  onChange={(e) => setPrioritaria(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all"
                >
                  <option value="No - Cita ordinaria programada">
                    No - Cita ordinaria programada
                  </option>
                  <option value="Sí - Situación de vulnerabilidad o urgencia psicosocial">
                    Sí - Situación de vulnerabilidad o urgencia psicosocial
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1.5">
                  ¿Has recibido atención previa en Bienestar al Aprendiz? *
                </label>
                <select
                  value={atencionPrevia}
                  onChange={(e) => setAtencionPrevia(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none focus:ring-2 focus:ring-sena-green/20 transition-all"
                >
                  <option value="No">No - Es mi primera vez</option>
                  <option value="Sí">Sí - Cuento con seguimiento previo</option>
                </select>
              </div>
            </div>

            {/* Pie de formulario */}
            <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-[#0077b6]">
                <Lock size={15} />
                <span>La información de esta solicitud es confidencial bajo el principio de reserva médica y psicológica.</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/admin/formularios"
                  className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#007796] to-sena-green px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-sena-green/25 hover:opacity-95 disabled:opacity-50 transition-all"
                >
                  <span>{isSubmitting ? "Enviando..." : "Enviar Solicitud"}</span>
                  <Send size={14} />
                </button>
              </div>
            </footer>
          </form>
        )}
      </main>
    </div>
  );
}
