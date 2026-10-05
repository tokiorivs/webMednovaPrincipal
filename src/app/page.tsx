'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InteractiveGalleryCarousel from '@/components/InteractiveGalleryCarousel';
import SolutionsSpecialty from '@/components/SolutionsSpecialty';
import ConsumablesSection from '@/components/ConsumablesSection';
import AboutUs from '@/components/AboutUs';
import WhyUs from '@/components/WhyUs';
import Pillars from '@/components/Pillars';
import EventsSection from '@/components/EventsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { fetchProducts } from '@/lib/supabase';
import { Product } from '@/types/product';
import { INITIAL_PRODUCTS } from '@/lib/data';

export default function Home() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const loaded = await fetchProducts();
        if (loaded && loaded.length > 0) {
          setProducts(loaded);
        }
      } catch (err) {
        console.error('Error loading products', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div id="top" className="min-h-screen bg-[#f2f2f2] flex flex-col font-mono-tech selection:bg-[#17181a] selection:text-[#f2f2f2]">
      <div id="home" className="sr-only" />
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <InteractiveGalleryCarousel products={products} />
        <SolutionsSpecialty products={products} />
        <ConsumablesSection products={products} />
        <AboutUs />
        <WhyUs />
        <Pillars />
        <EventsSection />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
