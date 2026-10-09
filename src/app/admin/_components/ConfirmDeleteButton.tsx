'use client';

import { useEffect, useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { btnGhost } from './ui';

// Botón de papelera que pide confirmación antes de borrar.
export default function ConfirmDeleteButton({
  onConfirm,
  label = 'Quitar',
  question = '¿Seguro que quieres borrar este elemento?',
  className = btnGhost,
}: {
  onConfirm: () => void;
  label?: string;
  question?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className} aria-label={label} title={label}>
        <Trash2 className="w-4 h-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-label={question}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl space-y-5"
          >
            <p className="text-sm text-white">{question}</p>
            <p className="text-xs text-slate-400">Se quitará del formulario. Los cambios se guardan al pulsar «Guardar cambios».</p>
            <div className="flex justify-end gap-2">
              <button ref={cancelRef} type="button" onClick={() => setOpen(false)} className={btnGhost}>
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onConfirm();
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Sí, borrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
