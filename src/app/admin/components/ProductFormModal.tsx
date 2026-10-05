'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Image as ImageIcon, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { uploadImageToStorage } from '@/lib/supabase';
import { INITIAL_SPECIALTIES } from '@/lib/data';

interface ProductFormModalProps {
  product?: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => Promise<void>;
}

export default function ProductFormModal({ product, isOpen, onClose, onSave }: ProductFormModalProps) {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [brand, setBrand] = useState('Mednova');
  const [specialty, setSpecialty] = useState('Litotricia Láser & Balística');
  const [category, setCategory] = useState<'equipo' | 'consumible'>('equipo');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [status, setStatus] = useState<'active' | 'featured' | 'draft'>('active');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [specList, setSpecList] = useState<{ key: string; val: string }[]>([
    { key: 'Longitud de onda', val: '' },
    { key: 'Potencia', val: '' },
  ]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setModel(product.model || '');
      setBrand(product.brand || 'Mednova');
      setSpecialty(product.specialty || 'Litotricia Láser & Balística');
      setCategory(product.category || 'equipo');
      setShortDescription(product.short_description || '');
      setFullDescription(product.full_description || '');
      setImageUrl(product.images?.[0] || '');
      setFeaturesText(product.features ? product.features.join('\n') : '');
      setStatus(product.status || 'active');
      setWhatsappMessage(product.whatsapp_message || '');
      
      if (product.specifications && Object.keys(product.specifications).length > 0) {
        setSpecList(Object.entries(product.specifications).map(([key, val]) => ({ key, val })));
      } else {
        setSpecList([{ key: 'Especificación', val: '' }]);
      }
    } else {
      // Reset form
      setName('');
      setModel('');
      setBrand('Mednova');
      setSpecialty('Litotricia Láser & Balística');
      setCategory('equipo');
      setShortDescription('');
      setFullDescription('');
      setImageUrl('');
      setFeaturesText('');
      setStatus('active');
      setWhatsappMessage('');
      setSpecList([
        { key: 'Longitud de onda', val: '' },
        { key: 'Potencia', val: '' },
      ]);
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const uploadedUrl = await uploadImageToStorage(file);
      setImageUrl(uploadedUrl);
    } catch (err) {
      console.error('Error uploading image', err);
      alert('Error al subir imagen. Puedes usar un enlace directo.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddSpec = () => {
    setSpecList([...specList, { key: '', val: '' }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecList(specList.filter((_, idx) => idx !== index));
  };

  const handleSpecChange = (index: number, field: 'key' | 'val', value: string) => {
    const updated = [...specList];
    updated[index][field] = value;
    setSpecList(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Build specifications record
      const specifications: Record<string, string> = {};
      specList.forEach((s) => {
        if (s.key.trim()) specifications[s.key.trim()] = s.val.trim();
      });

      // Build features list
      const features = featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const payload: Partial<Product> = {
        ...(product ? { id: product.id } : {}),
        name,
        slug: product?.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        brand,
        model,
        specialty,
        category,
        short_description: shortDescription,
        full_description: fullDescription || shortDescription,
        images: imageUrl ? [imageUrl] : (product?.images || []),
        features,
        specifications,
        status,
        whatsapp_message: whatsappMessage || `Hola Mednova, solicito cotización para ${name}`,
      };

      await onSave(payload);
      onClose();
    } catch (err) {
      console.error('Error saving product', err);
      alert('Hubo un error al guardar el producto.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {product ? 'Editar Equipo / Consumible' : 'Agregar Nuevo Equipo de Urología'}
            </h3>
            <p className="text-xs text-slate-500">
              Completa los datos técnicos e imágenes para publicarlo en la web.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1 text-xs">
          
          {/* Main Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Nombre del Equipo / Insumo *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ej: Láser Quirúrgico Holmium 100W"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Modelo / Código *</label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="ej: MN-HP100"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Tipo de Producto</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="equipo">Equipo Médico / Máquina</option>
                <option value="consumible">Consumible Quirúrgico</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Especialidad</label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {INITIAL_SPECIALTIES.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700">Marca / Fabricante</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Mednova"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Image Upload & Preview */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="font-semibold text-slate-800 flex items-center justify-between">
              <span>Imagen del Producto</span>
              {uploadingImage && <span className="text-blue-600 animate-pulse text-[11px]">Subiendo imagen...</span>}
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Preview Box */}
              <div className="w-24 h-24 rounded-xl border border-slate-200 bg-white overflow-hidden flex items-center justify-center shrink-0">
                {imageUrl ? (
                  <img src={imageUrl} alt="Vista previa" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                )}
              </div>

              {/* Upload Input & URL fallback */}
              <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Subir Foto desde tu PC</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-slate-400 text-[11px]">o pega un enlace abajo:</span>
                </div>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/foto-laser.jpg"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Descripción Breve (Para la tarjeta en catálogo)</label>
              <textarea
                rows={2}
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Breve resumen de 2 líneas sobre la aplicación urológica..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Descripción Completa (Para la ficha técnica y modal)</label>
              <textarea
                rows={3}
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Explicación detallada de ventajas quirúrgicas, tipos de procedimientos..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* Features Bullets */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700">Puntos Clave / Ventajas (1 por línea)</label>
            <textarea
              rows={3}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="Potencia máxima de 100W&#10;Modo Dusting para fragmentación fina&#10;Pedal inalámbrico multifunción"
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
            />
          </div>

          {/* Dynamic Technical Specs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">Especificaciones Técnicas (Ficha Médica)</label>
              <button
                type="button"
                onClick={handleAddSpec}
                className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 text-[11px]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Agregar Parámetro</span>
              </button>
            </div>

            <div className="space-y-2">
              {specList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.key}
                    onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                    placeholder="Parámetro (ej. Longitud de onda)"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    value={item.val}
                    onChange={(e) => handleSpecChange(idx, 'val', e.target.value)}
                    placeholder="Valor (ej. 2100 nm)"
                    className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(idx)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp Custom Text & Visibility Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Mensaje Personalizado de WhatsApp</label>
              <input
                type="text"
                value={whatsappMessage}
                onChange={(e) => setWhatsappMessage(e.target.value)}
                placeholder="Hola Mednova, deseo cotizar..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700">Estado de Publicación</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="active">Activo (Visible en Catálogo)</option>
                <option value="featured">Destacado (Aparece en Portada)</option>
                <option value="draft">Borrador (Oculto temporalmente)</option>
              </select>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-[#009EBC] hover:bg-[#00819a] text-white font-bold shadow-md shadow-[#009EBC]/20 flex items-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{saving ? 'Guardando...' : (product ? 'Actualizar Producto' : 'Crear Producto')}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
