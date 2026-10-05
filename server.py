"""
==============================================================================
MEDNOVA TECHNOLOGIES - SERVIDOR DE PRUEBAS (PYTHON WSGI / HTTP)
==============================================================================
Este script permite levantar un servidor de pruebas en cualquier entorno que
soporte Python (VPS, cPanel Python App, Docker o local).

Sirve la compilación estática generada por `npm run export` ubicada en /out.

USO RÁPIDO:
1. Compilar la web estática:
   npm run export

2. Iniciar el servidor:
   python server.py

O mediante Gunicorn (producción / pruebas en Linux):
   gunicorn -w 4 -b 0.0.0.0:8080 server:app
==============================================================================
"""

import os
import sys

PORT = int(os.environ.get("PORT", 8080))
HOST = os.environ.get("HOST", "0.0.0.0")
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = os.path.join(BASE_DIR, "out")

# Si la carpeta 'out' aún no existe, fallback al directorio actual
SERVE_DIR = OUT_DIR if os.path.exists(OUT_DIR) else BASE_DIR

# ----------------------------------------------------------------------------
# 1. Modo Flask (si Flask está instalado)
# ----------------------------------------------------------------------------
try:
    from flask import Flask, send_from_directory, abort

    app = Flask(__name__, static_folder=SERVE_DIR)

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_static(path):
        target_path = os.path.join(SERVE_DIR, path)

        # 1. Si es un archivo directo existente (ej: .js, .css, .webp, .webm, favicon.ico)
        if path and os.path.isfile(target_path):
            return send_from_directory(SERVE_DIR, path)

        # 2. Si es una ruta limpia con archivo html correspondiente (ej: /admin -> admin.html)
        html_file = f"{path}.html"
        if path and os.path.isfile(os.path.join(SERVE_DIR, html_file)):
            return send_from_directory(SERVE_DIR, html_file)

        # 3. Si es un subdirectorio con index.html (ej: /admin/ -> admin/index.html)
        sub_index = os.path.join(target_path, "index.html")
        if os.path.isfile(sub_index):
            return send_from_directory(target_path, "index.html")

        # 4. Fallback a la raíz index.html
        root_index = os.path.join(SERVE_DIR, "index.html")
        if os.path.isfile(root_index):
            return send_from_directory(SERVE_DIR, "index.html")

        return f"<h1>Mednova Technologies</h1><p>Ejecuta primero <code>npm run export</code> para generar la carpeta /out.</p>", 404

    is_flask = True

except ImportError:
    is_flask = False
    app = None

# ----------------------------------------------------------------------------
# 2. Modo Standard Library Fallback (si Flask NO está instalado)
# ----------------------------------------------------------------------------
if not is_flask:
    import http.server
    import socketserver

    class CustomHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=SERVE_DIR, **kwargs)

        def do_GET(self):
            # Limpiar ruta y buscar archivo con o sin .html
            req_path = self.path.split("?")[0].lstrip("/")
            full_path = os.path.join(SERVE_DIR, req_path)

            if req_path and not os.path.exists(full_path):
                if os.path.exists(f"{full_path}.html"):
                    self.path = f"/{req_path}.html"
                elif os.path.exists(os.path.join(full_path, "index.html")):
                    self.path = f"/{req_path}/index.html"
            return super().do_GET()


def main():
    print("=" * 65)
    print("  MEDNOVA TECHNOLOGIES - SERVIDOR DE PRUEBAS")
    print("=" * 65)
    print(f"  Carpeta servida : {SERVE_DIR}")
    print(f"  Dirección local : http://localhost:{PORT}")
    print(f"  Motor           : {'Flask' if is_flask else 'Python Standard Library'}")
    print("=" * 65)

    if not os.path.exists(OUT_DIR):
        print("\n  [AVISO] No se encontró la carpeta 'out'.")
        print("  Recuerda generar la compilación estática ejecutando:")
        print("    npm run export\n")

    if is_flask and app:
        app.run(host=HOST, port=PORT, debug=False)
    else:
        with socketserver.TCPServer((HOST, PORT), CustomHandler) as httpd:
            print(f"  Servidor iniciado en el puerto {PORT}. Presiona Ctrl+C para detener.")
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n  Servidor detenido.")


if __name__ == "__main__":
    main()
