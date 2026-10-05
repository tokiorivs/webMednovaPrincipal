import { createClient } from '@supabase/supabase-js';
import { Product, MedicalEvent } from '@/types/product';
import { INITIAL_PRODUCTS, INITIAL_EVENTS } from './data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('placeholder')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

const STORAGE_KEY_PRODUCTS = 'mednova_custom_products';
const STORAGE_KEY_EVENTS = 'mednova_custom_events';

// Client-side storage fallback helpers
function getLocalProducts(): Product[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  const stored = localStorage.getItem(STORAGE_KEY_PRODUCTS);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      console.error('Error parsing local products', e);
    }
  }
  return INITIAL_PRODUCTS;
}

function saveLocalProducts(products: Product[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
}

// Data fetching operations
export async function fetchProducts(): Promise<Product[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local data', err);
    }
  }
  return getLocalProducts();
}

export async function upsertProduct(product: Partial<Product> & { id?: string }): Promise<Product> {
  const now = new Date().toISOString();
  
  if (supabase) {
    const productPayload = {
      ...product,
      updated_at: now,
    };

    if (product.id && !product.id.startsWith('temp-') && !product.id.startsWith('prod-')) {
      const { data, error } = await supabase
        .from('products')
        .update(productPayload)
        .eq('id', product.id)
        .select()
        .single();

      if (!error && data) return data as Product;
    } else {
      // New record
      const newId = crypto.randomUUID();
      const { data, error } = await supabase
        .from('products')
        .insert([{ ...productPayload, id: newId, created_at: now }])
        .select()
        .single();

      if (!error && data) return data as Product;
    }
  }

  // Local storage fallback
  const current = getLocalProducts();
  const id = product.id || `prod-custom-${Date.now()}`;
  const fullProduct: Product = {
    id,
    name: product.name || 'Nuevo Equipo',
    slug: product.slug || `equipo-${Date.now()}`,
    brand: product.brand || 'Mednova',
    model: product.model || 'MN-GEN',
    specialty: product.specialty || 'Litotricia Láser & Balística',
    category: product.category || 'equipo',
    short_description: product.short_description || '',
    full_description: product.full_description || '',
    images: product.images && product.images.length > 0 ? product.images : [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80'
    ],
    features: product.features || [],
    specifications: product.specifications || {},
    status: product.status || 'active',
    whatsapp_message: product.whatsapp_message || `Hola Mednova, solicito cotización de ${product.name}`,
    brochure_url: product.brochure_url || '#',
    created_at: product.created_at || now,
  };

  const existingIndex = current.findIndex(p => p.id === id);
  let updatedList: Product[];
  if (existingIndex >= 0) {
    updatedList = [...current];
    updatedList[existingIndex] = fullProduct;
  } else {
    updatedList = [fullProduct, ...current];
  }
  saveLocalProducts(updatedList);
  return fullProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.warn('Error deleting product from Supabase', err);
    }
  }

  const current = getLocalProducts();
  const filtered = current.filter(p => p.id !== id);
  saveLocalProducts(filtered);
  return true;
}

export async function uploadImageToStorage(file: File): Promise<string> {
  if (supabase) {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (!uploadError) {
        const { data } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        return data.publicUrl;
      }
    } catch (err) {
      console.warn('Supabase storage upload error, falling back to Data URL', err);
    }
  }

  // Fallback: Convert to Data URL (base64) so user can preview immediately
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
