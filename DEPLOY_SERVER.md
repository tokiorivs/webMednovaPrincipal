# 🚀 Guía de Despliegue en Servidor de Pruebas - Mednova Technologies

Este documento detalla cómo poner en marcha el proyecto en cualquier tipo de servidor de pruebas o producción.

El proyecto está diseñado para funcionar de **tres maneras diferentes**, adaptándose a la infraestructura de tu servidor.

---

## 📋 Resumen de Opciones

| Método | Tipo de Servidor | Comando Principal | Cuándo usarlo |
| :--- | :--- | :--- | :--- |
| **Opción A: Servidor Python** | VPS, Docker, WSGI, cPanel Python | `pip install -r requirements.txt`<br>`python server.py` | Cuando el servidor pide entorno Python o Gunicorn |
| **Opción B: Servidor Node.js** | VPS Linux, PM2, Render, cPanel Node | `npm install`<br>`npm run build && npm start` | Servidor completo con soporte nativo de Next.js |
| **Opción C: Hosting Estático / cPanel** | BanaHosting, Apache, Nginx | `npm run export`<br>(Subir contenido de `/out`) | Hosting web tradicional sin necesidad de proceso backend |

---

## 🐍 Opción A: Despliegue con Python (`requirements.txt` + `server.py`)

Esta opción utiliza el script [`server.py`](file:///C:/Users/cesar/Documents/webMednovaPrincipal/server.py) para servir la web compilada con soporte completo para rutas limpias (SPA / Next.js export).

### 1. Requisitos
- Python 3.9 o superior
- Node.js (solo si vas a compilar dentro del servidor; si compilas en local, no es necesario)

### 2. Pasos de Instalación
```bash
# 1. Instalar las dependencias de Python
pip install -r requirements.txt

# 2. Generar los archivos estáticos de la web (si no subiste la carpeta /out)
npm install
npm run export

# 3. Iniciar el servidor
python server.py
```

### 3. Ejecución en Producción con Gunicorn (Linux / VPS)
Para mantener el servidor corriendo de fondo con múltiples hilos de trabajo:
```bash
# Iniciar en el puerto 8080 (o el puerto configurado en el servidor)
gunicorn -w 4 -b 0.0.0.0:8080 server:app
```

> **Puerto Personalizado:** Puedes definir el puerto pasando la variable de entorno `PORT`:
> ```bash
> PORT=3000 python server.py
> ```

---

## 🟢 Opción B: Despliegue Nativo Node.js

Para servidores con soporte directo de Node.js (versión 18.18+ o 20+ recomendada).

### Pasos:
```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo de variables de entorno si es necesario
cp .env.example .env.local

# 3. Compilar la aplicación Next.js
npm run build

# 4. Iniciar el servidor en producción
npm start
```

### Mantener activo con PM2 (VPS / Linux):
```bash
npm install -g pm2
pm2 start npm --name "mednova-web" -- start
pm2 save
pm2 startup
```

---

## 🌐 Opción C: Hosting Compartido (cPanel / BanaHosting / Apache)

Si el servidor de pruebas es un hosting compartido tradicional:

1. En tu máquina local, compila la versión estática:
   ```bash
   npm run export
   ```
2. Esto generará la carpeta `out/`.
3. Sube todo el contenido de la carpeta `out/` a la raíz de tu servidor (generalmente `public_html/`).
4. **Nota sobre `.htaccess`:** Ya hemos configurado automáticamente el archivo `.htaccess` en `public/.htaccess`, el cual se copia a `out/.htaccess`. Este archivo gestiona:
   - URLs amigables sin extensión `.html` (ej. `/admin`, `/catalogo`).
   - Compresión Gzip para carga rápida.
   - Políticas de seguridad y encabezados MIME correctos para fuentes, videos e imágenes.

---

## 🔍 Verificación y Checklist Previo a Subir

- [x] **Compilación validada:** `npm run build` y `npm run export` se ejecutan sin errores.
- [x] **Metadatos estáticos:** `robots.txt` y `sitemap.xml` optimizados para exportación estática.
- [x] **requirements.txt:** Listo con Flask, Gunicorn y Werkzeug documentados.
- [x] **server.py:** Listo con fallback dual (Flask + SimpleHTTPRequestHandler estándar).
- [x] **.htaccess:** Listo con reescritura de URLs y optimizaciones de compresión.
- [x] **.gitignore:** Configurado para no subir `.next/`, `node_modules/`, `__pycache__/`, ni archivos `.env` privados.
