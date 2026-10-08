# 🚀 Portal de Caracterización Estudiantil SENA (CARACTERIZA)

Bienvenido al repositorio oficial del **Portal de Caracterización Estudiantil SENA (CARACTERIZA)**. 

Este sistema tiene como propósito principal gestionar y analizar la **caracterización de los aprendices** de la institución. A través de este portal, se recopila, centraliza y visualiza información vital relacionada con la salud, el bienestar, y los aspectos socioeconómicos de los estudiantes, permitiendo al SENA tomar decisiones informadas y brindar un mejor acompañamiento durante su proceso formativo.

---

## ✨ Características Principales y Vistas del Proyecto

El proyecto está diseñado con un enfoque en la usabilidad y la eficiencia administrativa, integrando el diseño institucional oficial del SENA.

*   **Dashboard de Administración (`/admin`)**: Un panel de control centralizado y moderno para gestionar los datos de los aprendices.
*   **Identidad Visual SENA**: Interfaz que respeta estrictamente los colores corporativos, directrices de branding y tipografía oficial de la institución, garantizando una experiencia inmersiva y profesional.
*   **Componentes Clave**:
    *   **`Sidebar`**: Menú de navegación lateral responsivo para un acceso rápido a módulos como Formularios y Resultados.
    *   **`DashboardHeader`**: Encabezado superior que incluye perfil de usuario, notificaciones y controles de sesión.
    *   **Tarjetas de Métricas (Kpis)**: Resúmenes visuales en tiempo real sobre el estado de la caracterización estudiantil.
    *   **Indicadores de Accesos Rápidos**: Atajos estratégicos para agilizar el flujo de trabajo de los administradores.

---

## 🛠️ Tecnologías Utilizadas

Este proyecto fue construido utilizando un stack moderno enfocado en el rendimiento y la escalabilidad:

*   **[Next.js](https://nextjs.org/) (App Router)** - Framework de React para aplicaciones web rápidas (Versión 16+).
*   **[TypeScript](https://www.typescriptlang.org/)** - Superconjunto de JavaScript que añade tipado estático para un código más robusto.
*   **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS de utilidad (Versión 4) para un diseño ágil y responsivo.
*   **[Lucide React](https://lucide.dev/)** - Biblioteca de iconografía moderna, limpia y consistente.
*   **Componentes de UI Responsivos** - Diseño adaptable garantizado para funcionar impecablemente en dispositivos móviles, tablets y escritorios.

---

## ⚙️ Guía de Instalación e Inicialización Local

Sigue estos pasos para levantar el proyecto en tu entorno local:

### Requisitos Previos
*   **Node.js**: Versión 18 o superior.
*   Gestor de paquetes: `npm`, `pnpm` o `yarn`.

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Josan31/SENA-CARACTERIZACION-APRENDICES.git
   ```

2. **Entrar a la carpeta del proyecto:**
   ```bash
   cd sena-caracterizacion-aprendices
   ```

3. **Instalar las dependencias:**
   Usando npm:
   ```bash
   npm install
   ```
   *O usando pnpm:*
   ```bash
   pnpm install
   ```

4. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Acceso en el navegador:**
   Abre [http://localhost:3000/admin](http://localhost:3000/admin) para ver el dashboard de administración.

---

## 🔄 Guía de Colaboración y Trabajo en Equipo (Git Workflow)

Para mantener un historial limpio y asegurar que el equipo trabaje en sincronía, sigue este flujo de trabajo estándar al momento de contribuir:

1. **Guardar cambios locales antes de actualizar**  
   Prepara y guarda los cambios en los que has estado trabajando:
   ```bash
   git add .
   git commit -m "Guardando mis cambios: [Descripción breve de tu aporte]"
   ```

2. **Traer los cambios más recientes subidos por un colaborador**  
   Antes de subir tus cambios, asegúrate de estar sincronizado con la rama principal:
   ```bash
   git pull origin main
   ```
   > ⚠️ **Nota sobre la resolución de conflictos (Merge Conflicts):** Si al hacer `pull` Git te advierte de conflictos, abre tu editor de código (como VS Code), revisa los archivos marcados y decide qué código mantener. Una vez resuelto, vuelve a hacer un `git add .` y `git commit -m "Resolviendo conflictos"`.

3. **Subir nuevos cambios al repositorio**  
   Una vez sincronizado y probado, envía tus cambios para que el resto del equipo pueda verlos:
   ```bash
   git push origin main
   ```

---

## 🎨 Identidad Institucional y Estilos SENA

La interfaz del proyecto se rige por las [Directrices Visuales de la Marca SENA](./BRAND_GUIDELINES.md).

### Paleta Institucional

| Color | Hexadecimal | Uso Principal |
| :--- | :---: | :--- |
| 🟢 **Verde SENA** | `#39A900` | Color primario de marca, logotipos y botones de llamada a la acción (CTAs). |
| 🔵 **Azul SENA (Navy)** | `#00304D` | Fondos oscuros, contrastes fuertes y elementos secundarios. |
| 🟡 **Amarillo SENA (Gold)** | `#FDC300` | Detalles complementarios, acentos y alertas. |

### Tipografía

*   **Primaria (`Work Sans`)**: Utilizada para encabezados (Headings), componentes de interfaz y contenido primario para garantizar una lectura clara en entornos digitales.
*   **Secundaria (`Calibri`)**: Empleada en cuerpo de texto y documentación.
