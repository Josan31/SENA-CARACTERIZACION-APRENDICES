"use client";

import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    ChevronDown,
    CreditCard,
    Mail,
    Pencil,
    Save,
    Search,
    ShieldCheck,
    Trash2,
    User,
    UserPlus,
    Users,
    X
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */
interface Admin {
  id: string;
  nombre: string;
  rol: string;
  documento: string;
  tipoDocumento: string;
  correo: string;
  genero: "M" | "F";
}

type FormData = {
  nombre: string;
  tipoDocumento: string;
  documento: string;
  correo: string;
  rol: string;
};

type Toast = { type: "success" | "error"; message: string } | null;

/* ─────────────────────────────────────────────────────────
   Seed data
───────────────────────────────────────────────────────── */
const SEED_ADMINS: Admin[] = [
  {
    id: "1",
    nombre: "Ana María López Vargas",
    rol: "Coordinadora Académica",
    tipoDocumento: "CC",
    documento: "1234567890",
    correo: "alopez@sena.edu.co",
    genero: "F",
  },
  {
    id: "2",
    nombre: "Carlos Arturo Díaz Herrera",
    rol: "Director de Programa",
    tipoDocumento: "CC",
    documento: "9876543210",
    correo: "cdiaz@sena.edu.co",
    genero: "M",
  },
  {
    id: "3",
    nombre: "Elena Beatriz Torres Gómez",
    rol: "Jefe de Bienestar",
    tipoDocumento: "CC",
    documento: "4567890123",
    correo: "etorres@sena.edu.co",
    genero: "F",
  },
  {
    id: "4",
    nombre: "Miguel Ángel Ríos Castillo",
    rol: "Instructor Líder",
    tipoDocumento: "CC",
    documento: "7890123456",
    correo: "mrios@sena.edu.co",
    genero: "M",
  },
];

const TIPOS_DOC = ["CC", "TI", "CE", "Pasaporte", "PPT"];
const ROLES = [
  "Coordinador Académico",
  "Director de Programa",
  "Jefe de Bienestar",
  "Instructor Líder",
  "Administrador del Sistema",
];

const EMPTY_FORM: FormData = {
  nombre: "",
  tipoDocumento: "",
  documento: "",
  correo: "",
  rol: "",
};

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */
function AdminRow({
  admin,
  onEdit,
  onDelete,
}: {
  admin: Admin;
  onEdit: (a: Admin) => void;
  onDelete: (id: string) => void;
}) {
  const initial = admin.nombre.charAt(0).toUpperCase();
  const isFemale = admin.genero === "F";

  return (
    <article className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Avatar badge */}
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#e8f8f0] to-[#c8eedd]">
        <span
          className="absolute left-0 top-0 h-4 w-4 bg-gradient-to-br from-sena-green to-sena-green-dark"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          aria-hidden="true"
        />
        <span
          className={`relative text-base font-extrabold ${
            isFemale ? "text-sena-green" : "text-sena-green-dark"
          }`}
        >
          {initial}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-sena-navy truncate">{admin.nombre}</h3>
        <p className="text-xs font-medium text-gray-400 mt-0.5">
          Rol: {admin.rol}
        </p>
        <p className="text-xs font-medium text-gray-400">
          {admin.tipoDocumento}: {admin.documento}
        </p>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-col gap-1.5">
        <button
          type="button"
          onClick={() => onEdit(admin)}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sena-green/10 to-emerald-100 px-3.5 py-1.5 text-xs font-bold text-sena-green-dark border border-sena-green/20 transition-all hover:from-sena-green hover:to-sena-green-dark hover:text-white hover:border-transparent"
        >
          <Pencil size={12} strokeWidth={2.5} />
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete(admin.id)}
          className="flex items-center gap-1.5 rounded-full bg-red-50 px-3.5 py-1.5 text-xs font-bold text-red-500 border border-red-100 transition-all hover:bg-red-500 hover:text-white hover:border-transparent"
        >
          <Trash2 size={12} strokeWidth={2.5} />
          Eliminar
        </button>
      </div>
    </article>
  );
}

function FormField({
  label,
  icon: Icon,
  required,
  children,
}: {
  label: string;
  icon: React.ElementType;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1 text-xs font-bold text-sena-navy uppercase tracking-wide">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative flex items-center">
        <Icon
          size={15}
          strokeWidth={2}
          className="absolute left-3 shrink-0 text-gray-400 pointer-events-none"
        />
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────── */
export default function AdministracionPage() {
  const [admins, setAdmins] = useState<Admin[]>(SEED_ADMINS);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [editing, setEditing] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  /* ── helpers ── */
  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditing(null);
  }

  function handleEdit(admin: Admin) {
    setForm({
      nombre: admin.nombre,
      tipoDocumento: admin.tipoDocumento,
      documento: admin.documento,
      correo: admin.correo,
      rol: admin.rol,
    });
    setEditing(admin.id);
    // scroll to form on small screens
    document.getElementById("admin-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleDelete(id: string) {
    if (deleteConfirm === id) {
      setAdmins((prev) => prev.filter((a) => a.id !== id));
      setDeleteConfirm(null);
      if (editing === id) resetForm();
      showToast("success", "Administrador eliminado correctamente.");
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { nombre, tipoDocumento, documento, correo, rol } = form;

    if (!nombre || !tipoDocumento || !documento || !correo || !rol) {
      showToast("error", "Por favor completa todos los campos requeridos.");
      return;
    }

    if (editing) {
      setAdmins((prev) =>
        prev.map((a) =>
          a.id === editing
            ? { ...a, nombre, tipoDocumento, documento, correo, rol }
            : a
        )
      );
      showToast("success", "Cuenta actualizada correctamente.");
    } else {
      const newAdmin: Admin = {
        id: Date.now().toString(),
        nombre,
        tipoDocumento,
        documento,
        correo,
        rol,
        genero: "M",
      };
      setAdmins((prev) => [newAdmin, ...prev]);
      showToast("success", "Cuenta creada correctamente.");
    }

    resetForm();
  }

  const filtered = admins.filter(
    (a) =>
      a.nombre.toLowerCase().includes(query.toLowerCase()) ||
      a.documento.includes(query) ||
      a.rol.toLowerCase().includes(query.toLowerCase())
  );

  /* ─────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────── */
  return (
    <div className="flex flex-1 flex-col gap-6 p-8">

      {/* ── Toast notification ── */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-xl text-sm font-semibold text-white transition-all ${
            toast.type === "success" ? "bg-sena-green" : "bg-red-500"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={16} strokeWidth={2.5} />
          ) : (
            <AlertCircle size={16} strokeWidth={2.5} />
          )}
          {toast.message}
        </div>
      )}

      {/* ── Page header ── */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          aria-label="Volver al panel principal"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sena-green text-white shadow-md transition-all hover:bg-sena-green-dark hover:shadow-lg active:scale-95"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-sena-navy tracking-tight">
            Administración de Cuentas
          </h1>
          <p className="mt-0.5 text-sm font-medium text-gray-500">
            Gestiona la lista de administradores y crea nuevas cuentas en el sistema.
          </p>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex gap-6 items-start">

        {/* ══ LEFT: Admin list ══════════════════════════════ */}
        <section
          aria-label="Lista de administradores"
          className="flex flex-1 flex-col gap-4 min-w-0"
        >
          {/* Section title */}
          <h2 className="flex items-center gap-2 text-base font-bold text-sena-navy">
            <Users size={18} className="text-sena-green" strokeWidth={2.5} />
            Lista de Administradores
            <span className="ml-auto rounded-full bg-sena-green/10 px-3 py-0.5 text-xs font-bold text-sena-green">
              {admins.length}
            </span>
          </h2>

          {/* Search */}
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-sena-green focus-within:ring-2 focus-within:ring-sena-green/20 transition-all">
            <Search size={16} className="shrink-0 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar administrador..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium text-sena-navy placeholder:text-gray-400 outline-none"
              aria-label="Buscar administrador"
            />
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-3">
            {filtered.length > 0 ? (
              filtered.map((a) => (
                <AdminRow
                  key={a.id}
                  admin={a}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <div className="flex flex-col items-center gap-2 py-12 text-center">
                <Users size={32} className="text-gray-300" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-gray-400">
                  No se encontraron administradores.
                </p>
              </div>
            )}
          </div>

          {/* Delete confirmation hint */}
          {deleteConfirm && (
            <p className="text-xs font-semibold text-red-400 text-center animate-pulse">
              Haz clic en &quot;Eliminar&quot; de nuevo para confirmar.
            </p>
          )}
        </section>

        {/* ══ RIGHT: Create / Edit form ════════════════════ */}
        <aside
          id="admin-form"
          className="w-80 shrink-0 rounded-2xl bg-white p-6 shadow-sm flex flex-col gap-5"
        >
          {/* Form header */}
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-extrabold text-sena-navy">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sena-green to-sena-green-dark">
                <UserPlus size={14} strokeWidth={2.5} className="text-white" />
              </div>
              {editing ? "Editar Cuenta" : "Crear Cuenta de Administrador"}
            </h2>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-400 transition-colors"
                aria-label="Cancelar edición"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

            {/* Nombre */}
            <FormField label="Nombre Completo" icon={User} required>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                placeholder="Ej. Juan Pérez García"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 py-2.5 text-sm font-medium text-sena-navy placeholder:text-gray-400 outline-none focus:border-sena-green focus:ring-2 focus:ring-sena-green/20 transition-all"
              />
            </FormField>

            {/* Tipo de documento */}
            <FormField label="Tipo de Documento" icon={ShieldCheck} required>
              <select
                value={form.tipoDocumento}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tipoDocumento: e.target.value }))
                }
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-8 py-2.5 text-sm font-medium text-sena-navy outline-none focus:border-sena-green focus:ring-2 focus:ring-sena-green/20 transition-all"
              >
                <option value="">Seleccione el tipo de documento</option>
                {TIPOS_DOC.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 text-gray-400 pointer-events-none"
                strokeWidth={2}
              />
            </FormField>

            {/* Número de documento */}
            <FormField label="Número de Documento" icon={CreditCard} required>
              <input
                type="text"
                value={form.documento}
                onChange={(e) =>
                  setForm((f) => ({ ...f, documento: e.target.value }))
                }
                placeholder="Ej. 12345678"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 py-2.5 text-sm font-medium text-sena-navy placeholder:text-gray-400 outline-none focus:border-sena-green focus:ring-2 focus:ring-sena-green/20 transition-all"
              />
            </FormField>

            {/* Correo */}
            <FormField label="Correo Electrónico" icon={Mail} required>
              <input
                type="email"
                value={form.correo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, correo: e.target.value }))
                }
                placeholder="correo@ejemplo.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 py-2.5 text-sm font-medium text-sena-navy placeholder:text-gray-400 outline-none focus:border-sena-green focus:ring-2 focus:ring-sena-green/20 transition-all"
              />
            </FormField>

            {/* Rol */}
            <FormField label="Rol" icon={ShieldCheck} required>
              <select
                value={form.rol}
                onChange={(e) =>
                  setForm((f) => ({ ...f, rol: e.target.value }))
                }
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-8 py-2.5 text-sm font-medium text-sena-navy outline-none focus:border-sena-green focus:ring-2 focus:ring-sena-green/20 transition-all"
              >
                <option value="">Seleccione un rol</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 text-gray-400 pointer-events-none"
                strokeWidth={2}
              />
            </FormField>

            {/* Submit */}
            <button
              type="submit"
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sena-green to-sena-green-dark px-5 py-3 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90 active:scale-[0.98]"
            >
              {editing ? (
                <>
                  <Save size={15} strokeWidth={2.5} />
                  Guardar Cambios
                </>
              ) : (
                <>
                  <UserPlus size={15} strokeWidth={2.5} />
                  Crear Cuenta
                </>
              )}
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
