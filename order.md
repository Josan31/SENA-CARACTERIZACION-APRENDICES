Please build the Login UI view in `src/app/(auth)/login/page.tsx` matching the mockup design and adhering to the theme rules defined in @BRAND_GUIDELINES.md and `src/app/globals.css`.

Key requirements:
1. Reference File: Read @BRAND_GUIDELINES.md for brand fonts, accessibility rules (no thin/extralight weights), and general palette tokens.

2. Component Purpose:
   - This is a frontend-only prototype component. Include state hooks for basic UI interactions (e.g., toggling password visibility, checkbox state, fake form submission leading to `/admin` or `/aprendiz`), but do NOT add real backend or API calls.

3. Specific Style & UI Details (as shown in the mockup):
   - Layout: Two-column responsive layout (Left branding/illustration section, Right login card container).
   - Left Panel:
     - Header logos: SENA logo and COMENTA logo.
     - Slogan: "Tu opinión también construye una mejor educación."
     - Illustration area: Vector artwork depicting feedback/evaluation.
     - Bottom Features Banner: Dark green wave background featuring 3 circular icon badges:
       - Badge Style: Fully circular background `bg-[#e1f7f0]` (`rounded-full`) with inner icon color `#289085`.
       - Feature Columns:
         1. "Comparte" - "Tu experiencia importa."
         2. "Valora" - "Ayuda a mejorar la educación."
         3. "Construye" - "Juntos hacemos la diferencia."
   - Right Panel (Login Card):
     - Clean white card with soft drop-shadow (`shadow-xl`) and rounded corners (`rounded-3xl`).
     - COMENTA header logo + "Iniciar Sesión" heading.
     - Form inputs for Email ("Correo Electrónico") and Password ("Contraseña") with prefix icons inside the fields and a password toggle icon.
     - "Política de privacidad" checkbox and "Olvidé mi contraseña" text link.
     - Primary Button ("INGRESAR ->"): Rounded pill shape (`rounded-full`), displaying a smooth horizontal linear gradient transition from emerald green (`#39A900`) to dark green (`#007832`), bold uppercase text, and right arrow icon.

Please output the complete TSX code using React, Next.js (App Router), Lucide React icons, and Tailwind CSS v4 classes.

4. Code Cleanliness & Design System Consistency:
   - Zero Floating/Arbitrary Styles: Do NOT write raw inline CSS or arbitrary one-off values directly in elements without declaring them or using strict Tailwind utilities/variables.
   - Everything Must Be Standardized: Custom elements like the circular badge (`bg-[#e1f7f0] text-[#289085] rounded-full`), gradient buttons (`bg-gradient-to-r from-[#39A900] to-[#007832]`), inputs, labels, and icons must be declared systematically using semantic Tailwind classes or theme tokens.
   - Maintain full visual fidelity to the mockup while keeping the code fully structured and scalable for future backend integration.