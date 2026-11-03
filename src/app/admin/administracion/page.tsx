"use client";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  KeyRound,
  Loader2,
  Mail,
  Pencil,
  Power,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  User,
  UserCheck,
  UserPlus,
  Users,
  UserX,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { getUser } from "@/lib/auth";
import {
  getUsuarios,
  createUsuario,
  updateUsuario,
  toggleActivoUsuario,
  deleteUsuario,
  formatRol,
  ROLES_CATALOG,
  type Usuario,
} from "@/lib/usuarios";

/* ─────────────────────────────────────────────────────────
   Types & Defaults
───────────────────────────────────────────────────────── */
type FormData = {
  nombre: string;
  correo: string;
  password: string;
  rol: string;
};

type Toast = { type: "success" | "error"; message: string } | null;

const EMPTY_FORM: FormData = {
  nombre: "",
  correo: "",
  password: "",
  rol: "coordinacion",
};

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */
function UsuarioCard({
  usuario,
  isCurrentUser,
  onEdit,
  onToggleActivo,
  onDelete,
  isToggling,
  isDeleting,
}: {
  usuario: Usuario;
  isCurrentUser: boolean;
  onEdit: (u: Usuario) => void;
  onToggleActivo: (u: Usuario) => void;
  onDelete: (id: string) => void;
  isToggling: boolean;
  isDeleting: boolean;
}) {
  const initial = usuario.nombre.trim().charAt(0).toUpperCase() || "U";

  return (
    <article
      className={`flex items-center gap-4 rounded-2xl bg-white p-4.5 shadow-sm border transition-all ${
        usuario.activo
          ? "border-gray-100 hover:shadow-md hover:border-sena-green/30"
          : "border-gray-200/80 bg-gray-50/60 opacity-75"
      }`}
    >
      {/* Avatar badge */}
      <div
        className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${
          usuario.activo
            ? "from-[#e8f8f0] to-[#c8eedd] text-sena-green-dark"
            : "from-gray-100 to-gray-200 text-gray-500"
        }`}
      >
        <span
          className={`absolute left-0 top-0 h-4 w-4 bg-gradient-to-br ${
            usuario.activo
              ? "from-sena-green to-sena-green-dark"
              : "from-gray-300 to-gray-400"
          }`}
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          aria-hidden="true"
        />
        <span className="relative text-base font-extrabold">{initial}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-bold text-sena-navy truncate max-w-[240px]">
            {usuario.nombre}
          </h3>
          {isCurrentUser && (
            <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700">
              Tu cuenta
            </span>
          )}
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold inline-flex items-center gap-1 ${
              usuario.activo
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {usuario.activo ? (
              <>
                <UserCheck size={11} /> Activo
              </>
            ) : (
              <>
                <UserX size={11} /> Inactivo
              </>
            )}
          </span>
        </div>

        <p className="text-xs font-semibold text-sena-green-dark mt-0.5">
          {formatRol(usuario.rol)}
        </p>
        <p className="text-xs font-medium text-gray-400 truncate">
          {usuario.correo}
        </p>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-col sm:flex-row items-center gap-1.5">
        <button
          type="button"
          onClick={() => onEdit(usuario)}
          title="Editar usuario"
          className="flex items-center gap-1 rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-sena-green hover:text-white transition-colors"
        >
          <Pencil size={12} strokeWidth={2.5} />
          <span className="hidden sm:inline">Editar</span>
        </button>

        {!isCurrentUser && (
          <>
            <button
              type="button"
              disabled={isToggling}
              onClick={() => onToggleActivo(usuario)}
              title={usuario.activo ? "Desactivar cuenta" : "Activar cuenta"}
              className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold border transition-colors ${
                usuario.activo
                  ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-500 hover:text-white"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-600 hover:text-white"
              }`}
            >
              <Power size={12} strokeWidth={2.5} />
              <span className="hidden sm:inline">
                {usuario.activo ? "Desactivar" : "Activar"}
              </span>
            </button>

            <button
              type="button"
              disabled={isDeleting}
              onClick={() => onDelete(usuario.id)}
              title="Eliminar usuario"
              className="flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-500 border border-red-100 hover:bg-red-500 hover:text-white transition-colors"
            >
              <Trash2 size={12} strokeWidth={2.5} />
              <span className="hidden sm:inline">Eliminar</span>
            </button>
          </>
        )}
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
        {required && <span className="text-red-500">*</span>}
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
   Main Page
───────────────────────────────────────────────────────── */
export default function AdministracionPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [editing, setEditing] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const currentUser = useMemo(() => getUser(), []);

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  }

  /* Cargar usuarios desde la API */
  async function cargarUsuarios() {
    try {
      setLoading(true);
      const data = await getUsuarios();
      setUsuarios(data || []);
    } catch (err: any) {
      showToast("error", err?.message || "Error al cargar la lista de usuarios.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarUsuarios();
  }, []);

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditing(null);
  }

  function handleEdit(usuario: Usuario) {
    setForm({
      nombre: usuario.nombre,
      correo: usuario.correo,
      password: "", // En edición la contraseña es opcional
      rol: usuario.rol,
    });
    setEditing(usuario.id);
    document.getElementById("admin-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleToggleActivo(usuario: Usuario) {
    try {
      setActionId(usuario.id);
      const updated = await toggleActivoUsuario(usuario.id);
      setUsuarios((prev) =>
        prev.map((u) => (u.id === usuario.id ? { ...u, activo: updated.activo } : u))
      );
      showToast(
        "success",
        `Cuenta ${updated.activo ? "activada" : "desactivada"} exitosamente.`
      );
    } catch (err: any) {
      showToast("error", err?.message || "No se pudo cambiar el estado de la cuenta.");
    } finally {
      setActionId(null);
    }
  }

  async function handleDelete(id: string) {
    if (deleteConfirm === id) {
      try {
        setActionId(id);
        await deleteUsuario(id);
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
        setDeleteConfirm(null);
        if (editing === id) resetForm();
        showToast("success", "Usuario eliminado permanentemente del sistema.");
      } catch (err: any) {
        showToast("error", err?.message || "Error al eliminar el usuario.");
      } finally {
        setActionId(null);
      }
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 4000);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { nombre, correo, password, rol } = form;

    if (!nombre.trim() || !correo.trim() || !rol) {
      showToast("error", "Por favor completa todos los campos requeridos.");
      return;
    }

    if (!editing && (!password || password.length < 6)) {
      showToast("error", "La contraseña es obligatoria y debe tener mínimo 6 caracteres.");
      return;
    }

    try {
      setSubmitting(true);
      if (editing) {
        const updatePayload: Record<string, any> = {
          nombre: nombre.trim(),
          correo: correo.trim().toLowerCase(),
          rol,
        };
        if (password.trim()) {
          updatePayload.password = password.trim();
        }

        const updated = await updateUsuario(editing, updatePayload);
        setUsuarios((prev) =>
          prev.map((u) => (u.id === editing ? { ...u, ...updated } : u))
        );
        showToast("success", "Usuario actualizado correctamente.");
      } else {
        const nuevo = await createUsuario({
          nombre: nombre.trim(),
          correo: correo.trim().toLowerCase(),
          password: password.trim(),
          rol,
          activo: true,
        });
        setUsuarios((prev) => [nuevo, ...prev]);
        showToast("success", "Cuenta creada exitosamente.");
      }
      resetForm();
    } catch (err: any) {
      showToast("error", err?.message || "Ocurrió un error al guardar los datos.");
    } finally {
      setSubmitting(false);
    }
  }

  const filtered = usuarios.filter((u) => {
    const q = query.toLowerCase();
    return (
      u.nombre.toLowerCase().includes(q) ||
      u.correo.toLowerCase().includes(q) ||
      formatRol(u.rol).toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-8 max-w-7xl mx-auto w-full">
      {/* ── Toast notification ── */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-2xl text-sm font-semibold text-white transition-all animate-bounce ${
            toast.type === "success" ? "bg-sena-green" : "bg-red-500"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} strokeWidth={2.5} />
          ) : (
            <AlertCircle size={18} strokeWidth={2.5} />
          )}
          {toast.message}
        </div>
      )}

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
              Administración de Cuentas SENA
            </h1>
            <p className="mt-0.5 text-sm font-medium text-gray-500">
              Gestión centralizada de personal y cuentas institucionales en PostgreSQL.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={cargarUsuarios}
          disabled={loading}
          className="flex items-center gap-2 self-start sm:self-auto rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 hover:text-sena-navy transition-all shadow-sm"
        >
          <RefreshCw size={14} className={loading ? "animate-spin text-sena-green" : ""} />
          Actualizar Lista
        </button>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ══ LEFT: Admin list ══════════════════════════════ */}
        <section
          aria-label="Lista de funcionarios y administradores"
          className="lg:col-span-7 flex flex-col gap-4 min-w-0"
        >
          {/* Section title */}
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-bold text-sena-navy">
              <Users size={18} className="text-sena-green" strokeWidth={2.5} />
              Cuentas Registradas
              <span className="rounded-full bg-sena-green/10 px-3 py-0.5 text-xs font-bold text-sena-green">
                {usuarios.length}
              </span>
            </h2>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-sm focus-within:border-sena-green focus-within:ring-2 focus-within:ring-sena-green/20 transition-all">
            <Search size={16} className="shrink-0 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar por nombre, correo o rol..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm font-medium text-sena-navy placeholder:text-gray-400 outline-none"
              aria-label="Buscar funcionario o administrador"
            />
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center bg-white rounded-2xl border border-gray-100">
                <Loader2 size={32} className="animate-spin text-sena-green" />
                <p className="text-sm font-semibold text-gray-500">
                  Cargando cuentas de la base de datos...
                </p>
              </div>
            ) : filtered.length > 0 ? (
              filtered.map((u) => (
                <UsuarioCard
                  key={u.id}
                  usuario={u}
                  isCurrentUser={currentUser?.id === u.id || currentUser?.correo === u.correo}
                  onEdit={handleEdit}
                  onToggleActivo={handleToggleActivo}
                  onDelete={handleDelete}
                  isToggling={actionId === u.id}
                  isDeleting={actionId === u.id}
                />
              ))
            ) : (
              <div className="flex flex-col items-center gap-2 py-12 text-center bg-white rounded-2xl border border-gray-100 p-6">
                <Users size={32} className="text-gray-300" strokeWidth={1.5} />
                <p className="text-sm font-semibold text-gray-400">
                  No se encontraron cuentas con los criterios de búsqueda.
                </p>
              </div>
            )}
          </div>

          {/* Delete confirmation hint */}
          {deleteConfirm && (
            <p className="text-xs font-bold text-red-500 text-center animate-pulse bg-red-50 py-2 rounded-xl border border-red-200">
              ⚠️ Confirma: Haz clic en &quot;Eliminar&quot; nuevamente para borrar definitivamente la cuenta.
            </p>
          )}
        </section>

        {/* ══ RIGHT: Create / Edit form ════════════════════ */}
        <aside
          id="admin-form"
          className="lg:col-span-5 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col gap-5 sticky top-6"
        >
          {/* Form header */}
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-base font-extrabold text-sena-navy">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sena-green to-sena-green-dark">
                {editing ? (
                  <Pencil size={14} strokeWidth={2.5} className="text-white" />
                ) : (
                  <UserPlus size={14} strokeWidth={2.5} className="text-white" />
                )}
              </div>
              {editing ? "Editar Funcionario" : "Crear Nueva Cuenta"}
            </h2>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
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
                placeholder="Ej. Ana María López Vargas"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 py-2.5 text-sm font-medium text-sena-navy placeholder:text-gray-400 outline-none focus:border-sena-green focus:ring-2 focus:ring-sena-green/20 transition-all"
              />
            </FormField>

            {/* Correo */}
            <FormField label="Correo Institucional" icon={Mail} required>
              <input
                type="email"
                value={form.correo}
                onChange={(e) => setForm((f) => ({ ...f, correo: e.target.value }))}
                placeholder="alopez@sena.edu.co"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 py-2.5 text-sm font-medium text-sena-navy placeholder:text-gray-400 outline-none focus:border-sena-green focus:ring-2 focus:ring-sena-green/20 transition-all"
              />
            </FormField>

            {/* Rol Institucional */}
            <FormField label="Rol Asignado" icon={ShieldCheck} required>
              <select
                value={form.rol}
                onChange={(e) => setForm((f) => ({ ...f, rol: e.target.value }))}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-8 py-2.5 text-sm font-medium text-sena-navy outline-none focus:border-sena-green focus:ring-2 focus:ring-sena-green/20 transition-all"
              >
                {ROLES_CATALOG.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 text-gray-400 pointer-events-none"
                strokeWidth={2}
              />
            </FormField>

            {/* Contraseña */}
            <FormField
              label={editing ? "Contraseña (Opcional)" : "Contraseña de Acceso"}
              icon={KeyRound}
              required={!editing}
            >
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                placeholder={
                  editing
                    ? "Dejar en blanco para mantener la actual"
                    : "Mínimo 6 caracteres"
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 py-2.5 text-sm font-medium text-sena-navy placeholder:text-gray-400 outline-none focus:border-sena-green focus:ring-2 focus:ring-sena-green/20 transition-all"
              />
            </FormField>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sena-green to-sena-green-dark px-5 py-3 text-sm font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Guardando...
                </>
              ) : editing ? (
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
