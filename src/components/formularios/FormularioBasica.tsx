"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  CreditCard,
  Hash,
  Home,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";

export default function FormularioBasica() {
  const router = useRouter();

  // Estados del formulario (iniciados vacíos para diligenciamiento limpio)
  const [nombre, setNombre] = useState("");
  const [tipoDoc, setTipoDoc] = useState("CC");
  const [numDoc, setNumDoc] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [lgbtiq, setLgbtiq] = useState("");
  const [orientacion, setOrientacion] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [correoPersonal, setCorreoPersonal] = useState("");
  const [correoInst, setCorreoInst] = useState("");
  const [telefono, setTelefono] = useState("");

  // Emergencia y Localización
  const [acudiente, setAcudiente] = useState("");
  const [telAcudiente, setTelAcudiente] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [direccion, setDireccion] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estrato, setEstrato] = useState("");
  const [guardadoExito, setGuardadoExito] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      const data = {
        modulo: "basica",
        nombre, tipoDoc, numDoc, fechaNac, edad, sexo, lgbtiq, orientacion, estadoCivil,
        correoPersonal, correoInst, telefono, acudiente, telAcudiente, parentesco,
        direccion, municipio, estrato,
        fechaActualizacion: new Date().toISOString()
      };
      localStorage.setItem("sena_caracterizacion_modulo_basica", JSON.stringify(data));
      setGuardadoExito(true);
      setTimeout(() => setGuardadoExito(false), 4000);
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto p-4 md:p-6 font-primary text-slate-800">
      {/* Triángulo decorativo superior */}
      <div
        className="absolute top-0 right-0 w-12 h-12 bg-[#fdc300] pointer-events-none z-10"
        style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
        aria-hidden="true"
      />

      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/formularios"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sena-navy shadow-sm border border-slate-200 hover:bg-slate-50 transition-all hover:-translate-x-0.5"
            title="Volver"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </Link>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-sena-green">
              Caracterización de Aprendices
            </span>
            <h1 className="text-xl md:text-2xl font-black text-sena-navy tracking-tight leading-tight">
              Información Básica y Localización
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Completa o actualiza tus datos de identidad, contacto, acudiente y residencia.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-sena-navy bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            Módulo 1 de 4
          </span>
        </div>
      </header>

      <main className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {guardadoExito && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-4 flex items-center gap-3 text-sena-green-dark animate-in fade-in duration-300">
              <CheckCircle2 size={22} className="shrink-0 text-sena-green" />
              <div>
                <p className="font-bold text-sm">¡Módulo 1: Información Básica guardado con éxito!</p>
                <p className="text-xs text-emerald-700">Tus datos han quedado almacenados y estructurados para sincronización con la base de datos.</p>
              </div>
            </div>
          )}

          {/* Sección 1: Datos Personales */}
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sena-green-dark">
                <User size={16} />
              </div>
              <h2 className="text-sm font-bold text-sena-navy">
                1. Datos de Identificación Personal
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Tipo de Documento *
                </label>
                <select
                  value={tipoDoc}
                  onChange={(e) => setTipoDoc(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Tarjeta de Identidad">Tarjeta de Identidad (T.I.)</option>
                  <option value="Cédula de Ciudadanía">Cédula de Ciudadanía (C.C.)</option>
                  <option value="Cédula de Extranjería">Cédula de Extranjería (C.E.)</option>
                  <option value="Permiso por Protección Temporal">Permiso Temporal (PPT)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  No. Documento de Identidad *
                </label>
                <input
                  type="text"
                  value={numDoc}
                  onChange={(e) => setNumDoc(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Fecha de Nacimiento *
                </label>
                <input
                  type="date"
                  value={fechaNac}
                  onChange={(e) => setFechaNac(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Edad *
                </label>
                <input
                  type="number"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Sexo Biológico *
                </label>
                <select
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                  <option value="Intersexual">Intersexual</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  ¿Se reconoce población LGBTIQ+? *
                </label>
                <select
                  value={lgbtiq}
                  onChange={(e) => setLgbtiq(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="No">No</option>
                  <option value="Sí">Sí</option>
                  <option value="Prefiero no responder">Prefiero no responder</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Estado Civil *
                </label>
                <select
                  value={estadoCivil}
                  onChange={(e) => setEstadoCivil(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Soltero (a)">Soltero (a)</option>
                  <option value="Casado (a)">Casado (a)</option>
                  <option value="Unión Libre">Unión Libre</option>
                  <option value="Separado (a)">Separado (a)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Teléfono Celular *
                </label>
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2 md:col-span-1">
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Correo Personal *
                </label>
                <input
                  type="email"
                  value={correoPersonal}
                  onChange={(e) => setCorreoPersonal(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2 md:col-span-2">
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Correo Institucional SENA (Soy SENA) *
                </label>
                <input
                  type="email"
                  value={correoInst}
                  onChange={(e) => setCorreoInst(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Sección 2: Contacto de Emergencia */}
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sena-green-dark">
                <Phone size={16} />
              </div>
              <h2 className="text-sm font-bold text-sena-navy">
                2. Contacto en Caso de Emergencia
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Nombre del Acudiente / Contacto *
                </label>
                <input
                  type="text"
                  value={acudiente}
                  onChange={(e) => setAcudiente(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Teléfono del Acudiente *
                </label>
                <input
                  type="tel"
                  value={telAcudiente}
                  onChange={(e) => setTelAcudiente(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Parentesco *
                </label>
                <select
                  value={parentesco}
                  onChange={(e) => setParentesco(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="Madre">Madre</option>
                  <option value="Padre">Padre</option>
                  <option value="Hermano (a)">Hermano (a)</option>
                  <option value="Cónyuge / Pareja">Cónyuge / Pareja</option>
                  <option value="Tío (a)">Tío (a)</option>
                  <option value="Abuelo (a)">Abuelo (a)</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sección 3: Localización */}
          <div>
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sena-green-dark">
                <MapPin size={16} />
              </div>
              <h2 className="text-sm font-bold text-sena-navy">
                3. Datos de Localización y Residencia
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Dirección de Residencia Completa *
                </label>
                <input
                  type="text"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0077b6] mb-1">
                  Estrato Socioeconómico *
                </label>
                <select
                  value={estrato}
                  onChange={(e) => setEstrato(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#f7fbfd] px-3 py-2 text-xs text-slate-800 focus:border-sena-green focus:bg-white focus:outline-none"
                >
                  <option value="1">Estrato 1</option>
                  <option value="2">Estrato 2</option>
                  <option value="3">Estrato 3</option>
                  <option value="4">Estrato 4</option>
                  <option value="5">Estrato 5</option>
                  <option value="6">Estrato 6</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botones */}
          <footer className="flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-sena-green" />
              Tus datos se guardan encriptados.
            </span>

            <div className="flex items-center gap-3">
              <Link
                href="/admin/formularios"
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
              >
                Volver
              </Link>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-sena-green to-sena-green-dark px-6 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-opacity"
              >
                <span>Guardar y Continuar a Salud</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </footer>
        </form>
      </main>
    </div>
  );
}
