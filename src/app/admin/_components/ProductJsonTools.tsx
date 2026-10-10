'use client';

import { useRef, useState } from 'react';
import { ClipboardCopy, Download, FileJson, FileUp, Loader2, Sparkles, Wand2 } from 'lucide-react';
import {
  PRODUCT_JSON_TEMPLATE,
  buildAiPrompt,
  parseProductJson,
  productToJson,
  type FormValues,
  type ImportResult,
} from '@/lib/admin/product-json';
import { generateProductFromDocument, getAiProviders, type AiProvidersInfo } from '../actions/ai';
import { compressPdfToImages } from '@/lib/pdf-compress';
import { Alert, Field, btnGhost, btnPrimary, inputCls } from './ui';

export type ImportSource = 'json' | 'ai';

const MAX_PDF_BYTES = 20 * 1024 * 1024;
const MAX_RAW_PDF_BYTES = 200 * 1024 * 1024; // más que esto no se intenta ni comprimir en el navegador
const mb = (bytes: number) => (bytes / 1024 / 1024).toFixed(1);
const willCompressMessage = (bytes: number) =>
  `Este PDF pesa ${mb(bytes)} MB (más de 20 MB): al generar se comprimirá automáticamente en tu navegador, convirtiendo cada página en una imagen. Revisa con especial cuidado cifras y especificaciones.`;

function download(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Importa un JSON al formulario (sin guardar), genera la ficha con IA y exporta o descarga plantillas.
export default function ProductJsonTools({
  values,
  base,
  hosts,
  onImport,
}: {
  values: FormValues;
  base: FormValues;
  hosts: string[];
  onImport: (result: ImportResult, source: ImportSource) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLInputElement>(null);
  const [pasting, setPasting] = useState(false);
  const [text, setText] = useState('');
  const [report, setReport] = useState<{ errors: string[]; warnings: string[]; missing: string[]; ok: boolean } | null>(null);
  const [note, setNote] = useState<string | null>(null);

  const [aiOpen, setAiOpen] = useState(false);
  const [providers, setProviders] = useState<AiProvidersInfo | null>(null);
  const [provider, setProvider] = useState<'gemini' | 'claude'>('gemini');
  const [aiType, setAiType] = useState<'equipo' | 'consumible'>('equipo');
  const [aiFile, setAiFile] = useState<File | null>(null);
  const [aiText, setAiText] = useState('');
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiProgress, setAiProgress] = useState<string | null>(null);
  const [aiNotes, setAiNotes] = useState<string[]>([]);

  const run = (source: string, origin: ImportSource) => {
    const result = parseProductJson(source, base, hosts);
    const filled = Object.keys(result.patch).length;
    if (filled > 0) onImport(result, origin);
    setReport({ errors: result.errors, warnings: result.warnings, missing: result.missing, ok: filled > 0 });
    setNote(filled > 0 ? `Se rellenaron ${filled} campos del formulario. Revisa y pulsa guardar: aún no se guardó nada.` : null);
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    if (file.size > 200_000) {
      setReport({ errors: ['El archivo es demasiado grande (máximo 200 KB).'], warnings: [], missing: [], ok: false });
      setNote(null);
      return;
    }
    run(await file.text(), 'json');
    if (fileRef.current) fileRef.current.value = '';
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(buildAiPrompt());
      setNote('Prompt copiado. Pégalo en Claude junto con el brochure o PDF del producto.');
    } catch {
      setNote('No se pudo copiar automáticamente: descarga la plantilla y úsala como guía.');
    }
    setReport(null);
  };

  // Al abrir el panel se consulta qué proveedores tienen clave. Gemini es el predeterminado.
  const openAiPanel = async () => {
    const opening = !aiOpen;
    setAiOpen(opening);
    if (!opening || providers) return;
    try {
      const info = await getAiProviders();
      setProviders(info);
      if (!info[info.default] && (info.gemini || info.claude)) setProvider(info.gemini ? 'gemini' : 'claude');
      else setProvider(info.default);
    } catch {
      /* si falla la consulta, el servidor avisará al generar */
    }
  };

  const generate = async () => {
    setAiError(null);
    setAiNotes([]);
    if (!aiFile && !aiText.trim()) {
      setAiError('Sube un PDF o pega el texto del producto.');
      return;
    }
    if (aiFile && aiFile.size > MAX_RAW_PDF_BYTES) {
      setAiError(`El PDF pesa ${mb(aiFile.size)} MB; el máximo que se puede procesar es 200 MB. Deja solo las páginas del producto.`);
      return;
    }
    setAiBusy(true);
    try {
      const fd = new FormData();
      fd.set('type', aiType);
      fd.set('provider', provider);
      let compressedNote: string | null = null;
      if (aiFile && aiFile.size > MAX_PDF_BYTES) {
        // PDF pesado: se convierte a imágenes en el navegador y el original nunca se sube.
        setAiProgress('Comprimiendo el PDF en tu navegador…');
        const compressed = await compressPdfToImages(aiFile, (done, total) =>
          setAiProgress(done >= total ? 'Comprimido. Enviando a la IA…' : `Comprimiendo página ${done + 1} de ${total}…`),
        );
        for (const page of compressed.files) fd.append('pages', page);
        compressedNote = `El PDF pesaba ${mb(aiFile.size)} MB y se comprimió a ${compressed.pages} imágenes (${mb(compressed.totalBytes)} MB). La IA leyó las páginas como imágenes: revisa con especial cuidado cifras y especificaciones.`;
        setAiProgress('Analizando el documento…');
      } else if (aiFile) {
        fd.set('file', aiFile);
      }
      if (aiText.trim()) fd.set('text', aiText);
      const res = await generateProductFromDocument(fd);
      if (!res.ok) {
        setAiError(res.error);
        return;
      }
      setAiNotes(compressedNote ? [compressedNote, ...res.notes] : res.notes);
      run(res.json, 'ai');
      setAiFile(null);
      setAiText('');
      if (pdfRef.current) pdfRef.current.value = '';
    } catch (error) {
      setAiError(
        error instanceof Error && /páginas|PDF|navegador|imagen/i.test(error.message)
          ? error.message
          : 'No se pudo completar la generación (tiempo agotado o error de red). Inténtalo de nuevo.',
      );
    } finally {
      setAiBusy(false);
      setAiProgress(null);
    }
  };

  return (
    <section className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
      <div>
        <h2 className="font-heading text-lg text-white">Importar / exportar / generar con IA</h2>
        <p className="text-xs text-slate-400 mt-1">
          Rellena el formulario desde un archivo o un documento. No guarda ni publica: tú revisas y guardas. En imágenes, video y PDF puedes escribir
          solo el nombre del archivo de Cloudflare.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className={btnPrimary} onClick={openAiPanel}>
          <Wand2 className="w-4 h-4" />
          Generar con IA
        </button>
        <input ref={fileRef} type="file" accept=".json,application/json" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        <button type="button" className={btnGhost} onClick={() => fileRef.current?.click()}>
          <FileUp className="w-4 h-4" />
          Importar archivo
        </button>
        <button type="button" className={btnGhost} onClick={() => setPasting((p) => !p)}>
          <FileJson className="w-4 h-4" />
          Pegar JSON
        </button>
        <button type="button" className={btnGhost} onClick={() => download('plantilla-producto.json', PRODUCT_JSON_TEMPLATE)}>
          <Download className="w-4 h-4" />
          Descargar plantilla
        </button>
        <button type="button" className={btnGhost} onClick={copyPrompt}>
          <Sparkles className="w-4 h-4" />
          Copiar prompt para IA
        </button>
        <button type="button" className={btnGhost} onClick={() => download(`${values.slug || 'producto'}.json`, productToJson(values))}>
          <ClipboardCopy className="w-4 h-4" />
          Exportar este producto
        </button>
      </div>

      {aiOpen && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
          <Alert kind="info">
            La IA lee el documento y propone la ficha usando <strong>solo lo que aparece en él</strong>. Puede equivocarse u omitir datos: revisa todo
            contra el documento original antes de guardar. El contenido se envía al proveedor de IA que elijas (Google o Anthropic).
          </Alert>
          <Alert>
            <strong>El PDF o el texto debe contener la información de UN solo producto.</strong> Si es un catálogo con varios productos, recorta antes
            las páginas del producto que quieres cargar: de lo contrario la IA puede mezclar datos de productos distintos.
          </Alert>
          <Field label="Proveedor de IA">
            <select value={provider} onChange={(e) => setProvider(e.target.value as 'gemini' | 'claude')} className={inputCls} disabled={aiBusy}>
              <option value="gemini">
                Gemini (Google){providers?.default === 'gemini' ? ' · predeterminado' : ''}
                {providers && !providers.gemini ? ' · sin clave configurada' : ''}
              </option>
              <option value="claude">
                Claude (Anthropic){providers?.default === 'claude' ? ' · predeterminado' : ''}
                {providers && !providers.claude ? ' · sin clave configurada' : ''}
              </option>
            </select>
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Tipo de producto">
              <select value={aiType} onChange={(e) => setAiType(e.target.value as 'equipo' | 'consumible')} className={inputCls} disabled={aiBusy}>
                <option value="equipo">Equipo</option>
                <option value="consumible">Consumible</option>
              </select>
            </Field>
            <Field label="Brochure o ficha en PDF (si pesa más de 20 MB se comprime solo)">
              <input
                ref={pdfRef}
                type="file"
                accept="application/pdf,.pdf"
                disabled={aiBusy}
                onChange={(e) => {
                  const f = e.target.files?.[0] ?? null;
                  setAiFile(f);
                  setAiError(null);
                  setAiNotes(f && f.size > MAX_PDF_BYTES ? [willCompressMessage(f.size)] : []);
                }}
                className={`${inputCls} file:mr-3 file:rounded-lg file:border-0 file:bg-slate-800 file:px-3 file:py-1 file:text-slate-200`}
              />
            </Field>
          </div>
          <Field label="…o pega el texto del producto (opcional si subes un PDF)">
            <textarea
              value={aiText}
              onChange={(e) => setAiText(e.target.value)}
              className={`${inputCls} min-h-32`}
              maxLength={60000}
              disabled={aiBusy}
              placeholder="Pega aquí la descripción, las especificaciones y las características del producto…"
            />
          </Field>
          <button type="button" className={btnPrimary} onClick={generate} disabled={aiBusy}>
            {aiBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            {aiBusy ? (aiProgress ?? 'Analizando el documento…') + ' (puede tardar 1-2 minutos)' : 'Generar ficha'}
          </button>
          {aiError && <Alert>{aiError}</Alert>}
        </div>
      )}

      {pasting && (
        <div className="space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`${inputCls} min-h-40 font-mono text-xs`}
            placeholder='{ "version": 1, "type": "equipo", "name": "..." }'
            spellCheck={false}
          />
          <button
            type="button"
            className={btnGhost}
            disabled={!text.trim()}
            onClick={() => {
              run(text, 'json');
              setText('');
              setPasting(false);
            }}
          >
            Aplicar al formulario
          </button>
        </div>
      )}

      {note && <Alert kind="ok">{note}</Alert>}
      {aiNotes.length > 0 && (
        <Alert kind="info">
          <p className="font-semibold mb-1">Avisos de la IA para quien revisa ({aiNotes.length}):</p>
          <ul className="list-disc pl-5 space-y-0.5">
            {aiNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </Alert>
      )}
      {report && report.missing.length > 0 && (
        <Alert>
          <p className="font-semibold mb-1">Faltan datos obligatorios ({report.missing.length}):</p>
          <ul className="list-disc pl-5 space-y-0.5">
            {report.missing.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </Alert>
      )}
      {report && report.errors.length > 0 && (
        <Alert>
          <p className="font-semibold mb-1">Revisa estos puntos ({report.errors.length}):</p>
          <ul className="list-disc pl-5 space-y-0.5">
            {report.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          {report.ok && <p className="mt-2 text-xs opacity-80">El formulario ya tiene los datos; corrige estos puntos antes de guardar.</p>}
        </Alert>
      )}
      {report && report.warnings.length > 0 && (
        <Alert kind="info">
          <ul className="list-disc pl-5 space-y-0.5">
            {report.warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </Alert>
      )}
    </section>
  );
}
