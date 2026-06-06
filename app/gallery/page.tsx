'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Loader2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  _id: string;
  slogan: string;
  imageUrl: string;
}

export default function UserGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery');
        if (!res.ok) return;
        const data = await res.json();
        setItems(data.data || []);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const startAutoSlide = useCallback(() => {
    if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
    if (items.length > 1) {
      autoSlideTimer.current = setInterval(handleNext, 5000);
    }
  }, [items.length, handleNext]);

  useEffect(() => {
    startAutoSlide();
    return () => { if (autoSlideTimer.current) clearInterval(autoSlideTimer.current); };
  }, [startAutoSlide]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin" /></div>;
  if (items.length === 0) return <div className="text-center py-20 bg-white">No Images Found</div>;

  // Helper to get visible items
  const getVisibleIndices = () => {
    const len = items.length;
    const prev = (currentIndex - 1 + len) % len;
    const next = (currentIndex + 1) % len;
    return { prev, curr: currentIndex, next };
  };

  const { prev, curr, next } = getVisibleIndices();

  return (
    <div className="min-h-screen bg-white text-slate-900 py-16 px-4 flex flex-col items-center overflow-hidden">
      
      {/* ─── HEADER ─── */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black tracking-tight">Campus Glimpses</h1>
        <p className="text-slate-500 mt-2">Reliving the best moments together.</p>
      </div>

      {/* ─── CAROUSEL BODY ─── */}
      <div className="relative w-full max-w-6xl flex items-center justify-center h-[500px]">
        <AnimatePresence initial={false}>
          {items.map((item, index) => {
            // Logic for position
            let position = "hidden";
            if (index === curr) position = "center";
            else if (index === prev) position = "left";
            else if (index === next) position = "right";

            if (position === "hidden") return null;

            return (
              <motion.div
                key={item._id}
                initial={false}
                animate={position}
                variants={{
                  center: { x: "0%", scale: 1, zIndex: 30, opacity: 1, filter: "blur(0px)" },
                  left: { x: "-70%", scale: 0.8, zIndex: 10, opacity: 0.4, filter: "blur(2px)" },
                  right: { x: "70%", scale: 0.8, zIndex: 10, opacity: 0.4, filter: "blur(2px)" },
                }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }} // Smooth "coming in" feel
                className={`absolute w-[90%] sm:w-[50%] h-[400px] rounded-[40px] overflow-hidden border-4 shadow-2xl
                  ${index === curr 
                    ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' // Red Glow Effect
                    : 'border-white'
                  }`}
              >
                <Image src={item.imageUrl} alt="gallery" fill className="object-cover" />
                
                {/* Slogan only for Active Card */}
                {index === curr && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8"
                  >
                    <h3 className="text-white text-2xl font-bold italic tracking-wide">{item.slogan}</h3>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ─── CONTROLS ─── */}
      <div className="flex gap-8 mt-10">
        <button onClick={() => { handlePrev(); startAutoSlide(); }} className="p-4 rounded-full bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-red-600 transition-all border border-slate-200">
          <ChevronLeft size={24} />
        </button>
        <div className="flex gap-2 items-center">
          {items.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-10 bg-red-500 shadow-[0_0_8px_red]' : 'w-2 bg-slate-200'}`} />
          ))}
        </div>
        <button onClick={() => { handleNext(); startAutoSlide(); }} className="p-4 rounded-full bg-slate-100 hover:bg-red-50 text-slate-800 hover:text-red-600 transition-all border border-slate-200">
          <ChevronRight size={24} />
        </button>
      </div>

    </div>
  );
}