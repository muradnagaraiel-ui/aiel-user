'use client';

import { useState } from 'react';
import { MessageCircle, Phone, MessageSquareMore } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

export default function EnquiryButton() {
  const [open, setOpen] = useState(false);

  // Aapki details (Yahan apna real number daal dena bhai)
  const phoneNumber = "+917351626329"; 
  const whatsappMessage = "Hello! I am interested in joining your courses. Please provide more details.";

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-center animate-fade-in-up">
        
        {/* ─── 1. WHATSAPP BUTTON (Top) ─── */}
        <a
          href={`https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-emerald-500/20 group relative"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={26} className="fill-white/10" />
          {/* Tooltip on Hover */}
          <span className="absolute right-16 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none font-medium">
            WhatsApp Us
          </span>
        </a>

        {/* ─── 2. CALL BUTTON (Middle) ─── */}
        <a
          href={`tel:${phoneNumber}`}
          className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-blue-500/20 group relative"
          title="Call Us Now"
        >
          <Phone size={24} className="fill-white/10" />
          {/* Tooltip on Hover */}
          <span className="absolute right-16 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none font-medium">
            Call Us
          </span>
        </a>

        {/* ─── 3. ENQUIRY MODAL BUTTON (Bottom) ─── */}
        <button
          onClick={() => setOpen(true)}
          className="w-16 h-16 rounded-full bg-violet-600 hover:bg-violet-700 text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-violet-600/30 group relative cursor-pointer"
          title="Open Enquiry Form"
        >
          <MessageSquareMore size={28} />
          {/* Tooltip on Hover */}
          <span className="absolute right-18 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none font-medium">
            Admission Enquiry
          </span>
        </button>

      </div>

      {/* Enquiry Modal Layer */}
      <EnquiryModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}