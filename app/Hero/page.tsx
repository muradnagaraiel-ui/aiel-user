'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import EnquiryModal from '@/components/EnquiryModal';
import { Phone } from 'lucide-react';

// --- Counter Logic Component ---
const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplay(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{display}{suffix}</span>;
};

interface HeroSlide {
  _id: string;
  name: string;
  imageUrl: string;
}

export default function HeroSection() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('/api/hero-slider');
        const data = await res.json();
        if (data.success) setSlides(data.data);
      } catch (error) { console.error(error); }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [slides]);

  return (
    <>
      <section className="min-h-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(59,130,246,0.05)_0%,rgba(239,68,68,0.02)_100%)] flex items-center px-6 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-semibold border border-red-100 shadow-sm">
              Since 1991
            </span>

            <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight">
              <span className="text-violet-600">Learn.</span><br />
              <span className="text-blue-600">Grow.</span><br />
              <span className="text-[#D61C22]">Succeed.</span>
            </h1>

            <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-xl">
              Join AIEL Institute and transform your future through English Speaking, 
              Computer Courses and Modern Coding Programs.
            </p>

            {/* BUTTONS WITH HOVER ANIMATIONS */}
            <div className="mt-8 flex gap-4 flex-wrap">
              {/* CALLING BUTTON (Pulsing Animation) */}
              <motion.a 
                href="tel:+919876543210"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-4 bg-violet-600 text-white rounded-xl font-semibold shadow-lg shadow-violet-600/30 flex items-center gap-3 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <Phone size={20} className="animate-bounce" />
                Call Us Now
              </motion.a>

              {/* ENROLL BUTTON */}
              <motion.button 
                onClick={() => setIsModalOpen(true)}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(214, 28, 34, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-7 py-4 bg-[#D61C22] text-white font-semibold rounded-xl transition-all shadow-lg"
              >
                Enroll Now
              </motion.button>
            </div>

            {/* STATS WITH COUNT-UP ANIMATION */}
            <div className="flex gap-12 mt-12 pt-8 border-t border-slate-100">
              <div>
                <h3 className="text-4xl font-black text-blue-600">
                  <Counter value={30} suffix="+" />
                </h3>
                <p className="text-slate-500 font-medium mt-1">Years Experience</p>
              </div>

              <div>
                <h3 className="text-4xl font-black text-[#D61C22]">
                  <Counter value={10} suffix="K+" />
                </h3>
                <p className="text-slate-500 font-medium mt-1">Students Trained</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE (IMAGE SLIDER) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-[32px] overflow-hidden border border-slate-200 bg-slate-50 shadow-xl shadow-slate-200/50">
              <AnimatePresence mode="wait">
                {slides.length > 0 && (
                  <motion.div
                    key={slides[current]._id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slides[current].imageUrl}
                      alt={slides[current].name}
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-8 left-8">
                      <h3 className="text-white text-2xl font-bold tracking-wide">
                        {slides[current].name}
                      </h3>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-3 mt-6">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                    current === index ? 'w-10 bg-violet-600' : 'w-3 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <EnquiryModal open={isModalOpen} onClose={() => setIsModalOpen(false)} prefill={null} />
    </>
  );
}