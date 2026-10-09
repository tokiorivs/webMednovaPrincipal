# Panel administrativo: puesta en marcha

El panel vive en `/admin`. Usa Supabase (base de datos + autenticación), exige
2FA con Google Authenticator y solo deja entrar a quienes estén en la tabla `admins`.

## 1. Crear el proyecto de Supabase

1. Crea una cuenta en https://supabase.com y un proyecto nuevo (región `sa-east-1`, São Paulo).
2. **Authentication → Providers → Email**: deja el correo activado y **desactiva "Allow new users to sign up"**
   (nadie debe poder registrarse solo).
3. **Authentication → Multi-Factor**: comprueba que TOTP esté habilitado (lo está por defecto).
4. **Project Settings → API**: copia *Project URL*, *anon key* y *service_role key*.

## 2. Crear el propietario y el esquema

1. **Authentication → Users → Add user → Create new user**: correo `cesaroumeres@gmail.com`,
   una contraseña fuerte y marca **Auto Confirm User**.
2. **SQL Editor**: pega todo `supabase-schema.sql` y pulsa **RUN**. Al final convierte esa cuenta en *propietario*.

## 3. Variables de entorno

| Variable | Dónde | Notas |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local` **al compilar** | Se incrusta en el build |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local` **al compilar** | Pública, solo lee productos publicados |
| `NEXT_PUBLIC_SITE_URL` | `.env.local` **al compilar** | Dominio final |
| `SUPABASE_SERVICE_ROLE_KEY` | **Solo en el servidor** (cPanel → Environment variables) | SECRETA. Nunca en git ni en el chat |

Para probar en tu PC, pon las cuatro en `.env.local` y ejecuta `npm run dev`.

## 4. Primer ingreso

1. Entra a `/admin/login` con el correo y la contraseña del paso 2.
2. Escanea el QR con Google Authenticator y confirma el código.
3. **Guarda los códigos de recuperación** (se muestran una sola vez).
4. En **Ajustes → Medios** registra tu dominio de Cloudflare (p. ej. `https://cdn.tudominio.com`).
   Sin esto no se pueden guardar imágenes ni PDF.

## 5. Agregar más usuarios

**Usuarios → Agregar administrador**: escribes el correo y el panel te muestra una contraseña
temporal (una sola vez). Esa persona entra, crea su propia contraseña y configura su propio
Google Authenticator. Desde la misma pantalla puedes desactivarla, resetear su 2FA o su clave.

## 6. Crear productos

**Productos → Nuevo producto**: completa datos, pega los enlaces de Cloudflare (imágenes, video,
PDF) y publícalo. El enlace de la página se genera del nombre
(`/equipos/<enlace>` o `/consumibles/<enlace>`) y el producto aparece solo en los listados
`/equipos` y `/consumibles` y en `sitemap.xml`. Los borradores no se ven en la web.

Urolase MAX y las fibras VPG conservan su diseño actual (no se administran desde el panel).

## 7. Desplegar en BanaHosting (cPanel → Setup Node.js App)

Compila en tu PC (el hosting compartido no tiene RAM para `next build`):

```bash
npm ci
npm run build
```

Sube por el Administrador de archivos/FTP, a la carpeta de la app:

- el contenido de `.next/standalone/` (incluye `server.js`),
- `.next/static/` → a `.next/static/` dentro de esa carpeta,
- `public/` → a `public/` dentro de esa carpeta.

En cPanel → **Setup Node.js App → Create Application**:

- Node.js version: **22.x**
- Application mode: **Production**
- Application root: la carpeta donde subiste los archivos
- Application URL: tu dominio
- Application startup file: `server.js`
- Environment variables: agrega `SUPABASE_SERVICE_ROLE_KEY` (y repite las `NEXT_PUBLIC_*` por si acaso).

Pulsa **Restart** tras cada actualización. `server.py` y `DEPLOY_SERVER.md` corresponden al
sitio estático anterior y ya no se usan.

## Seguridad: resumen

- Contraseña + 2FA TOTP obligatorio; sin 2FA verificado en la sesión no se entra al panel.
- Solo cuentas listadas y activas en `admins`; no hay registro público.
- Sesión en cookies `httpOnly`; todas las escrituras ocurren en el servidor con la clave
  `service_role`, tras verificar rol y 2FA. Desde el navegador **nadie** puede escribir en la base de datos (RLS).
- Límite de intentos de login y de 2FA; códigos de recuperación de un solo uso (guardados con hash).
- Registro de auditoría en **Actividad** (solo propietario).
- Los enlaces de medios solo se aceptan de los dominios registrados en Ajustes y sobre `https`.
