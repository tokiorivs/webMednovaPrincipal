# 🏥 Mednova Technologies - Plataforma Quirúrgica & Catálogo Urológico

Sitio web corporativo y catálogo de equipamiento médico de alta gama (máquinas de urología y consumibles quirúrgicos) con panel administrativo autogestionable y conexión a **Supabase Cloud**.

---

## 🚀 Inicio Rápido en Entorno Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔐 Panel de Administración (`/admin`)

* **URL de Acceso:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
* **Modo Demo / Local (Listo para probar de inmediato):**
  * Correo: `admin@mednova.com`
  * Contraseña: `admin123` (o cualquier contraseña de 4+ caracteres)
* **Funcionalidades del Administrador:**
  * ✅ **Crear nuevos equipos o consumibles:** Sube fotos desde tu computadora o enlaces externos, define modelo, marca, especialidad, descripción y ficha técnica.
  * ✅ **Editar y actualizar:** Modifica descripciones, especificaciones y enlaces de cotización en tiempo real.
  * ✅ **Eliminar y ocultar:** Borra productos obsoletos o cámbialos a estado *Borrador*.
  * ✅ **Especificaciones técnicas dinámicas:** Agrega parámetros médicos (Longitud de onda, potencia, calibres, etc.).
  * ✅ **Cotización personalizada por WhatsApp:** El cliente hace clic y se le abre un mensaje directo prellenado con el modelo del equipo consultado.

---

## ☁️ Conexión a Supabase Cloud (Base de Datos & Almacenamiento Gratuito)

El sistema ya funciona localmente sin necesidad de configurar nada. Cuando desees sincronizar todo en la nube:

1. Crea tu cuenta gratuita en [supabase.com](https://supabase.com) y crea un proyecto.
2. Abre la pestaña **SQL Editor** en Supabase, pega el contenido del archivo [`supabase-schema.sql`](./supabase-schema.sql) y dale clic a **Run**.
3. En **Project Settings → API**, copia tu `Project URL` y tu `anon public key` en tu archivo `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon
   NEXT_PUBLIC_COMPANY_WHATSAPP=51987654321
   ```

---

## 🌐 Cómo Subir a tu cPanel de BanaHosting (¡Sin Costo de VPS!)

Tienes dos formas sencillas de publicarlo en tu hosting actual de BanaHosting:

### Método A: Export Estático (El más fácil y rápido)
1. Ejecuta en tu terminal:
   ```bash
   npm run export
   ```
2. Esto generará la carpeta `out/`.
3. Entra a tu **cPanel de BanaHosting** → **Administrador de Archivos** → carpeta `public_html`.
4. Sube todo el contenido de la carpeta `out/` a `public_html`. ¡Y listo! La web y el panel funcionarán a máxima velocidad conectados a Supabase.

### Método B: Despliegue en Vercel
Si prefieres despliegue automático con 1 clic y SSL automático, puedes subir el repositorio a GitHub y conectarlo gratis en [vercel.com](https://vercel.com), luego solo apuntas tu dominio desde BanaHosting.
