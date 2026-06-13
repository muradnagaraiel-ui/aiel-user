'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Code, BookOpen, MessageSquare, ShieldCheck, Terminal } from 'lucide-react';

export default function AboutUs() {
  
  // Static-friendly animation block for guaranteed visibility
  const fadeInUp: Variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    hidden: { opacity: 0, y: 20 }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-red-500/10 selection:text-red-600 antialiased">
      
      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative overflow-hidden py-24 px-6 bg-gradient-to-b from-slate-50/50 to-white">
        <div className="absolute top-0 right-0 -z-10 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-10 -left-10 -z-10 w-[300px] h-[300px] bg-slate-200/40 rounded-full blur-[80px]" />

        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 font-bold text-xs uppercase tracking-widest mx-auto">
            <Terminal size={14} className="text-red-500" />
            Empower Your Career Line
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            From Computer Basics <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-slate-900">
              To Advanced Coding & Fluency.
            </span>
          </h1>

          <p className="text-slate-500 text-base md:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            We are a comprehensive institute dedicated to bridging the gap between absolute beginners and industry professionals. From fundamental applications and professional corporate accounting to advanced Computer Applications and English corporate communication—we program careers for success.
          </p>
        </div>
      </section>

      <hr className="border-slate-100 max-w-5xl mx-auto" />

      {/* ─── 2. CORE PILLARS SECTION (GUARENTEED VISIBILITY FIXED) ─── */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            Our Core Ecosystem
          </h2>
          <p className="text-slate-400 text-sm mt-1">A complete 360° training program designed for modern professional growth</p>
        </div>

        {/* Removed staggered constraints to make it fully bulletproof */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Essential Computer Literacy & Diplomas */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="group p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5"
          >
            <div className="h-12 w-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform duration-300">
              <BookOpen size={22} />
            </div>
            <h3 className="text-xl font-bold mt-6 text-slate-900">Professional Diplomas</h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Master essential enterprise tools like <strong className="font-semibold text-slate-700">MS Word, Excel, and PowerPoint</strong>. We offer fully recognized, certified corporate tracks including <strong className="font-semibold text-slate-700">DCA, ADCA</strong>, and professional <strong className="font-semibold text-slate-700">Tally GST</strong> management systems.
            </p>
          </motion.div>

          {/* Card 2: Modern Coding Stack */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="group p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5"
          >
            <div className="h-12 w-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20 group-hover:scale-110 transition-transform duration-300">
              <Code size={22} />
            </div>
            <h3 className="text-xl font-bold mt-6 text-slate-900">Coding & Logic</h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Step into high-end programming models. Our specialized labs guide you through raw syntax development, computational logic, data arrays, and core structural scripting across elite modern frameworks.
            </p>
          </motion.div>

          {/* Card 3: English Communication */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="group p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-red-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5"
          >
            <div className="h-12 w-12 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform duration-300">
              <MessageSquare size={22} />
            </div>
            <h3 className="text-xl font-bold mt-6 text-slate-900">English Fluency</h3>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Technical capability is incomplete without expression. We provide extensive training in <strong className="font-semibold text-slate-700">English Communication, public presentation scripts, and interview setups</strong> to make you placement-ready.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 3. MISSION SHOWCASE SECTION ─── */}
      <section className="bg-slate-950 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[200px] bg-red-600/20 rounded-full blur-[120px]" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-black tracking-widest text-red-500 uppercase bg-red-500/10 px-3 py-1 rounded-md border border-red-500/20">
              The Learning Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Where Soft Skills <br />Meet Hard Tech Execution.
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              We understand that modern corporate success demands a dual strategy. A student must know how to maintain structural databases or execute optimal scripts, but they must also articulate their ideas perfectly in global corporate spaces. Our integrated infrastructure ensures both happen simultaneously.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                Hands-on Practice with MS Office & Tally ERP
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                Live Corporate Communications & Group Arrays
              </div>
            </div>
          </div>

          {/* Right Banner Node */}
          <div className="relative h-[320px] md:h-[400px] w-full rounded-[32px] overflow-hidden border-4 border-slate-900 shadow-[0_0_40px_rgba(239,68,68,0.15)] bg-slate-900 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-red-950/40 via-transparent to-slate-950/80 z-10" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 z-20 space-y-3">
              <span className="text-xs text-red-400 font-bold tracking-widest uppercase">Our Mission Statement</span>
              <p className="text-2xl md:text-3xl font-black italic text-white leading-tight">
                "We don't just hand out diploma certificates. We shape future-ready professionals."
              </p>
            </div>
            <div className="absolute bottom-0 right-0 p-6 z-20">
              <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-md">
                <ShieldCheck size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}