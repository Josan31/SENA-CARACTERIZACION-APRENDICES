import { redirect } from "next/navigation";

/** Aprendiz home — redirects to the characterization form. */
export default function AprendizPage() {
  redirect("/aprendiz/formularios");
}
