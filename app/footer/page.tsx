'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  Globe,
  X
} from 'lucide-react';

// ─── 100% STABLE INLINE SVG BRAND ICONS (Build Safe) ───
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Modal Unified State Management Object
  const [modalData, setModalData] = useState<{
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
  }>({
    isOpen: false,
    title: '',
    content: null,
  });

  const openModalHandler = (title: string, content: React.ReactNode) => {
    setModalData({ isOpen: true, title, content });
  };

  const closeModalHandler = () => {
    setModalData({ isOpen: false, title: '', content: null });
  };

  // 1. Dynamic Content Data Matrix for Quick Navigation Links
  const quickLinks = [
    { 
      name: 'About Institute', 
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-[#0F1E6D] text-base">Welcome to AIEL Institute</p>
          <p>AIEL is a leading technical and educational training ecosystem dedicated to empowering youth with industry-level computational paradigms. We bridge the gap between academic benchmarks and modern commercial demands.</p>
          <p>Our practical coding spaces, automated accounting frameworks, and business communication infrastructure ensure that every candidate stands out in high-yielding industries.</p>
        </div>
      )
    },
    { 
      name: 'Our Courses', 
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-[#0F1E6D] text-base">Available Professional Curriculums</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-800">💻 Full-Stack Development</div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-800">📊 Tally Prime & GST Hubs</div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-800">📝 MS Office Automation</div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-800">🗣️ English Fluency Modules</div>
          </div>
        </div>
      )
    },
    { 
      name: 'Student Gallery', 
      content: (
        <div className="space-y-3 text-center py-6">
          <p className="text-slate-500 font-medium">To maintain direct optimization, real-time campus event logs and portfolio listings are fully cataloged under our interactive grid section directly on the main viewport panel.</p>
          <p className="text-xs text-red-500 font-bold">Scroll up to our Gallery segment to explore historical laboratory showcases!</p>
        </div>
      )
    },
    { 
      name: 'Verify Certificate', 
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-[#0F1E6D] text-base">Online Authentication Registry</p>
          <p>Our global certificate verification terminal allows employers to safely confirm student enrollment records, completed credit hours, and grades.</p>
          <div className="pt-2">
            <input type="text" placeholder="Enter Registration / Certificate Serial ID..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-red-500 font-medium" />
            <button className="w-full mt-3 bg-gradient-to-r from-[#D61C22] to-[#0F1E6D] text-white py-3 rounded-xl font-bold text-xs tracking-widest uppercase">Validate Credentials</button>
          </div>
        </div>
      )
    },
  ];

  // 2. Dynamic Content Data Matrix for Corporate Desk Links
  const legalLinks = [
    { 
      name: 'Privacy Policy', 
      content: (
        <div className="space-y-4 text-sm">
          <p>At AIEL Institute, accessible from our official application channels, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by our logs and how we use it.</p>
          <p className="font-bold text-slate-900">Information We Collect</p>
          <p>When you register through our dynamic Admissions Enquiry components, we securely save your name, contact phone number, and primary address inside isolated cloud servers to prevent cross-origin data leakage.</p>
        </div>
      )
    },
    { 
      name: 'Terms & Conditions', 
      content: (
        <div className="space-y-3 text-sm">
          <p>By accessively using our online frameworks or enrolling inside our physical campus terminals, you agree to comply with the standard structural protocols defined below:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 font-medium">
            <li>A minimal aggregate of 75% classroom attendance is required to generate system certifications.</li>
            <li>All module updates and lab schedules are property of AIEL Core Stack operations.</li>
          </ul>
        </div>
      )
    },
    { 
      name: 'Refund Policy', 
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-slate-900">Admission Processing Matrix</p>
          <p>Please note that seat allocation allocations for premium batches involve fixed reservation metrics. All registration overhead costs or processing payments are non-refundable once batch logs are compiled inside the database.</p>
          <p>For custom exceptional scenarios, students can submit documentation parameters directly to the administration desk within 48 hours of original transaction instances.</p>
        </div>
      )
    },
    { 
      name: 'Contact Us', 
      content: (
        <div className="space-y-4">
          <p className="font-semibold text-[#0F1E6D]">Connect with Corporate Helpdesks</p>
          <p>For immediate answers to enrollment disputes or infrastructure feedback, please reach out via the official corporate lines listed on the right side of the active panel layout.</p>
          <p className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-500 font-mono">Support Dispatch Node Token: AIEL-SYS-2026</p>
        </div>
      )
    },
  ];

  return (
    <>
      <footer className="bg-[#000000] text-white pt-16 pb-8 overflow-hidden border-t border-slate-200/10">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          
          {/* ─── MAIN FOOTER CONTENT GRID ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Identity & Brand Social Connectors */}
            <div className="space-y-6">
              <Link href="/" className="inline-block bg-white p-2 rounded-xl transition-transform hover:scale-105">
                <Image 
                  src="/Aiel.svg" 
                  alt="AIEL Logo" 
                  width={130} 
                  height={75} 
                  className="object-contain"
                  priority
                />
              </Link>
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                Master English Communication, Computer Skills, and Modern Coding through practical, career-focused training designed for your success.
              </p>
              
              {/* Dynamic Redirect Channels */}
              <div className="flex items-center gap-4 pt-2">
                <a href="https://www.facebook.com/share/1H354ufGWC/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] text-white transition-all duration-300 hover:-translate-y-1 shadow-md" title="Facebook">
                  <FacebookIcon />
                </a>
                <a href="https://www.instagram.com/aielmuradnagar/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white transition-all duration-300 hover:-translate-y-1 shadow-md" title="Instagram">
                  <InstagramIcon />
                </a>
                <a href="https://www.youtube.com/@americaninstituteofenglish1159" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF0000] text-white transition-all duration-300 hover:-translate-y-1 shadow-md" title="YouTube">
                  <YoutubeIcon />
                </a>
                <a href="https://wa.me/917351626329" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] text-white transition-all duration-300 hover:-translate-y-1 shadow-md" title="WhatsApp">
                  <Globe size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links Trigger System */}
            <div>
              <h4 className="text-base font-black tracking-wider uppercase mb-6 border-l-4 border-[#D61C22] pl-3 text-white">
                Quick Navigation
              </h4>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => openModalHandler(link.name, link.content)}
                      className="text-slate-300 hover:text-white flex items-center gap-2 group text-sm font-semibold transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none"
                    >
                      <ArrowRight size={14} className="text-[#D61C22] transition-transform duration-300 group-hover:translate-x-1.5" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Corporate Policies Desk Trigger System */}
            <div>
              <h4 className="text-base font-black tracking-wider uppercase mb-6 border-l-4 border-[#D61C22] pl-3 text-white">
                Corporate Desk
              </h4>
              <ul className="space-y-4">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => openModalHandler(link.name, link.content)}
                      className="text-slate-300 hover:text-white flex items-center gap-2 group text-sm font-semibold transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none"
                    >
                      <ArrowRight size={14} className="text-[#D61C22] transition-transform duration-300 group-hover:translate-x-1.5" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Communications Infrastructure Information */}
            <div>
              <h4 className="text-base font-black tracking-wider uppercase mb-6 border-l-4 border-[#D61C22] pl-3 text-white">
                Get In Touch
              </h4>
              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-[#D61C22]">
                    <MapPin size={18} />
                  </div>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed">
                    Near Vansh Electrtonics, 2nd Floor,Railway Road Muradnagar, Ghaziabad, Uttar Pradesh 201206
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-[#D61C22]">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col">
                    <a href="tel:+917351626329" className="text-sm font-bold hover:text-[#D61C22] transition-colors">
                      +91 73516 26329
                    </a>
                    
                    <a href="tel:+919837120713" className="text-sm font-bold hover:text-[#D61C22] transition-colors">
                      +91 98371 20713
                    </a>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest font-black mt-0.5">
                      Mon - Sat (08:00 AM - 08:00 PM)
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10  rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 text-[#D61C22]">
                    <Mail size={18} />
                  </div>
                  <a href="mailto:muradnagaraiel@gmail.com" className="text-sm mt-2 font-semibold hover:text-[#D61C22] transition-colors break-all">
                    muradnagaraiel@gmail.com
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* ─── BOTTOM LEGAL ATTRIBUTION BAR ─── */}
          <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-xs font-medium">
              © {currentYear} <span className="text-white font-bold">AIEL Institute of English Language Pvt. Ltd. <span className='text-[#D61C22]'>(Vocational Training Center)</span></span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2 select-none">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Ecosystem Status: Online
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* ─── UNIFIED MODAL COMPONENT LAYER ─── */}
      {modalData.isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fade-in">
          {/* Backdrop Mask Click Handler */}
          <div className="absolute inset-0" onClick={closeModalHandler} />
          
          {/* Modal Architecture Container */}
          <div className="relative bg-white w-full max-w-xl max-h-[85vh] rounded-[24px] shadow-2xl flex flex-col overflow-hidden border border-slate-100 z-10">
            {/* Upper Frame Layout */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-black tracking-tight text-[#0F1E6D]">{modalData.title}</h2>
              <button 
                onClick={closeModalHandler} 
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Inner Content Render Box */}
            <div className="p-8 overflow-y-auto text-slate-500 font-medium text-sm leading-relaxed scrollbar-thin">
              {modalData.content}
            </div>

            {/* Control Node Bottom Section */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-right">
              <button 
                onClick={closeModalHandler}
                className="px-5 py-2.5 bg-slate-950 hover:bg-[#D61C22] text-white text-xs font-bold tracking-wider rounded-xl transition-colors uppercase shadow-sm cursor-pointer"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}