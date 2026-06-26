"use client";

import { useState, useEffect, useRef } from "react"; 
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, FileText, Award, CalendarDays } from "lucide-react";
import EnquiryModal from "./EnquiryModal"; 

// Dynamic relative structural imports requested by operational instructions
import CreateSeminar from "./seminar";
import LmcCertificateManagement from "./LMCCertificates";

export default function Navbar() {
  // Core Interface Matrix States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Custom Dropdown & Asset Modal Layer Toggles
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeDocumentModal, setActiveDocumentModal] = useState<"SEMINAR" | "LMC_CERT" | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: "HOME", id: "home" },
    { name: "COURSES", id: "courses" },
    { name: "GALLERY", id: "gallery" },
    { name: "ABOUT US", id: "about" },
    { name: "TESTIMONIALS", id: "testimonials" },
  ];

  // Close dropdown tracking whenever clicked externally
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ─── SCROLL SPY ENGINE USING INTERSECTION OBSERVER ───
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -35% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // ─── SMOOTH CLICK ELEMENT VIEW SCROLLER ───
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-t-[5px] border-[#D61C22] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="h-24 flex items-center justify-between">
            
            {/* ─── 1. LEFT LOGO AREA ─── */}
            <div className="flex items-center shrink-0">
              <Link href="/" className="relative w-[130px] h-[75px] block">
                <Image
                  src="/Aiel.png"
                  alt="AIEL Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </Link>
            </div>

            {/* ─── 2. CENTER NAVIGATION LINKS (WITH DROPDOWN PIPELINE) ─── */}
            <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-7 flex-1 border-l border-slate-200 ml-8 px-6 h-12">
              {navLinks.map((item) => {
                const isCurrentActive = activeSection === item.id;
                return (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative text-[13px] font-extrabold tracking-wider transition-all duration-200 py-2 inline-block cursor-pointer
                      ${isCurrentActive ? "text-[#D61C22]" : "text-[#0F1E6D] hover:text-[#D61C22]"}`}
                  >
                    {item.name}
                    
                    {/* Active Red Bottom Line Underline Effect */}
                    {isCurrentActive && (
                      <span className="absolute bottom-[-2px] left-0 right-0 mx-auto w-6 h-[3px] bg-[#D61C22] rounded-full animate-fade-in" />
                    )}
                  </button>
                );
              })}

              {/* ─── VERTICAL SEPARATOR RULE ─── */}
              <span className="h-4 w-[1px] bg-slate-300 self-center mx-1" />

              {/* ─── DOCUMENTS INTERACTIVE DROPDOWN CONTAINER ─── */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center gap-1.5 text-[13px] font-extrabold tracking-wider transition-all duration-200 py-2 cursor-pointer uppercase ${
                    isDropdownOpen ? "text-[#D61C22]" : "text-[#0F1E6D] hover:text-[#D61C22]"
                  }`}
                >
                  <FileText size={14} className="stroke-[2.5]" />
                  <span>Documents</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 stroke-[2.5] ${isDropdownOpen ? "rotate-180 text-[#D61C22]" : ""}`} />
                </button>

                {/* Floating Dropdown Slate */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(15,30,109,0.08)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
                    
                    {/* Option 1: Seminar Tracking Trigger */}
                    <button
                      type="button"
                      onClick={() => { setActiveDocumentModal("SEMINAR"); setIsDropdownOpen(false); }}
                      className="w-full px-4 py-3 flex items-center gap-3 text-slate-700 hover:bg-slate-50 text-[13px] font-bold transition-colors cursor-pointer text-left"
                    >
                      <div className="p-1.5 bg-blue-50 text-[#0F1E6D] rounded-lg">
                        <CalendarDays size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span>Seminar Batches</span>
                        <span className="text-[10px] text-gray-400 font-medium leading-none mt-0.5">Schedule timeline matrices</span>
                      </div>
                    </button>

                    {/* Option 2: LMC Sheets Trigger */}
                    <button
                      type="button"
                      onClick={() => { setActiveDocumentModal("LMC_CERT"); setIsDropdownOpen(false); }}
                      className="w-full px-4 py-3 flex items-center gap-3 text-slate-700 hover:bg-slate-50 text-[13px] font-bold transition-colors cursor-pointer text-left"
                    >
                      <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                        <Award size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span>LMC & Certificates</span>
                        <span className="text-[10px] text-gray-400 font-medium leading-none mt-0.5">Manage credentials ledger rows</span>
                      </div>
                    </button>

                  </div>
                )}
              </div>
            </nav>

            {/* ─── 3. RIGHT SIDE (CALL & ENROLL) ─── */}
            <div className="flex items-center gap-6 border-l border-slate-200 pl-8 h-12 shrink-0">
              <div className="hidden sm:flex items-center gap-3">
                <a 
                  href="tel:+917351626329" 
                  className="w-10 h-10 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center justify-center text-[#D61C22] hover:scale-105 transition-transform border border-slate-100"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M21.384 17.791c-1.107-1.127-2.354-1.835-3.145-2.06-.5-.143-1.019-.017-1.396.321L15.2 17.59c-2.914-1.496-5.285-3.867-6.782-6.781l1.539-1.644c.337-.376.463-.895.32-1.396-.226-.791-.933-2.039-2.06-3.145C7.795 4.212 7.148 4 6.51 4c-.722 0-1.396.27-1.921.777C3.125 6.223 2.992 8.767 4.21 11.83c1.47 3.7 4.296 6.924 7.958 8.585 3.064 1.39 5.608 1.258 7.054-.168.508-.525.778-1.199.778-1.921 0-.638-.212-1.285-.616-1.535z"/>
                  </svg>
                </a>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-bold tracking-wide leading-none">Call Us Now</span>
                  <a href="tel:+917351626329" className="text-[13px] font-black text-[#D61C22] tracking-normal mt-1 whitespace-nowrap">
                    +91 7351626329
                  </a>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)} 
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D61C22] via-[#A01A50] to-[#0F1E6D] text-white text-[11px] font-black tracking-widest flex items-center gap-2 shadow-sm hover:brightness-110 active:scale-95 transition-all uppercase whitespace-nowrap cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0v.083a1.125 1.125 0 01-1.125 1.125H5.625a1.125 1.125 0 01-1.125-1.125v-.083z" />
                </svg>
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── 4. ENQUIRY BASE FORM MODAL LAYER ─── */}
      <EnquiryModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        prefill={null} 
      />

      {/* ─── 5. DYNAMIC POPUP MODAL WRAPPER FOR DOCUMENTS ─── */}
      {activeDocumentModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Glass Layer */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            onClick={() => setActiveDocumentModal(null)} 
          />
          
          {/* Modal Container Layout Structure */}
          <div className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#070b19] border border-white/10 rounded-3xl shadow-2xl p-4 sm:p-6 text-center animate-in zoom-in-95 duration-200 scrollbar-none">
            {/* Floating Absolute Cross Dismiss Trigger */}
            <button
              type="button"
              onClick={() => setActiveDocumentModal(null)}
              className="absolute top-4 right-4 z-50 p-2 text-slate-400 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 rounded-xl transition-all cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Conditional Sub-Module Node Rendering */}
            <div className="mt-4">
              {activeDocumentModal === "SEMINAR" ? (
                <CreateSeminar onScheduleSuccess={() => setActiveDocumentModal(null)} />
              ) : (
                <LmcCertificateManagement />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}