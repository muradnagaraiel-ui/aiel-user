'use client';

import { X, Clock, Wallet, BookOpen, Layers, Milestone } from 'lucide-react';
import { CourseUnion } from '../page';

export default function ViewDetails({
  open,
  course,
  onClose,
  onEnroll,
}: {
  open: boolean;
  course: CourseUnion;
  onClose: () => void;
  onEnroll: () => void;
}) {
  if (!open || !course) return null;

  // CRITICAL CHECK: Installments tabhi true hogi jab length strictly 1 se zyada (> 1) ho
  const hasInstallments = 'installments' in course && course.installments && course.installments.length > 1;
  const isEnglish = course.type === 'english';
  const isCoding = course.type === 'coding';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 selection:bg-violet-200">
      {/* Backdrop with Blur Filter */}
      <div onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" />

      {/* Main Modal Box Container */}
      <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header Block */}
        <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-md bg-violet-100 text-violet-700 border border-violet-200 inline-block mb-1">
              Premium Portal
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Course Blueprint</h2>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Core Specs Center Layer */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 scrollbar-thin scrollbar-thumb-slate-200">
          
          {/* Section 1: Core Identification */}
          <section className="space-y-2">
            <div className="flex items-center gap-2 text-violet-600">
              <BookOpen className="w-4 h-4" />
              <h4 className="font-black uppercase tracking-widest text-xs">Subject Overview</h4>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              {course.type === 'coding' ? course.language : course.title}
            </p>
            <div className="inline-flex items-center gap-1.5 text-slate-600 bg-slate-50 border border-slate-200/60 px-3 py-1 rounded-xl text-xs font-bold mt-1">
              <Clock className="w-3.5 h-3.5 text-violet-500" />
              Full Course Duration: {course.duration}
            </div>
          </section>

          {/* Section 2: Pricing Structure & Fee Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 border border-slate-100 p-5 rounded-2xl relative overflow-hidden">
            <div className="space-y-0.5">
              <p className="text-slate-400 text-[11px] font-black uppercase tracking-wider">Standard Fee Setup</p>
              <p className="text-xl font-bold text-slate-400 line-through">₹{course.actualPrice}</p>
            </div>
            <div className="space-y-0.5 sm:border-l sm:border-slate-200 sm:pl-4">
              <p className="text-emerald-600 text-[11px] font-black uppercase tracking-wider flex items-center gap-1">
                ✨ Direct Scholarship Price
              </p>
              <p className="text-3xl font-black text-slate-900 tracking-tight">₹{course.discountPrice}</p>
            </div>

            {/* English Specific Addon: LMC Charge */}
            {isEnglish && 'lmcCharge' in course && (
              <div className="col-span-1 sm:col-span-2 mt-2 pt-3 border-t border-slate-200/60 flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold flex items-center gap-1">
                  📦 Lifetime Membership Card (LMC):
                </span>
                <span className="font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  ₹{course.lmcCharge}
                </span>
              </div>
            )}
          </section>

          {/* Section 3: Full Detailed Syllabus Breakdown */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-slate-800">
              <Layers className="w-4 h-4 text-violet-500" />
              <h4 className="font-black uppercase tracking-widest text-xs tracking-wider text-slate-400">Complete Syllabus Matrix</h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.topics?.map((topic, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 bg-white border border-slate-100 rounded-xl hover:border-slate-200 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1" />
                  <span className="text-slate-700 text-xs font-semibold leading-normal">{topic}</span>
                </div>
              ))}
            </div>
            {(!course.topics || course.topics.length === 0) && (
              <p className="text-xs text-slate-400 italic">No syllabus topics linked to this program asset.</p>
            )}
          </section>

          {/* Section 4: Coding Specific Feature — Capstone Projects */}
          {isCoding && 'projects' in course && course.projects?.length > 0 && (
            <section className="space-y-3 bg-violet-50/40 border border-violet-100/60 p-5 rounded-2xl">
              <div className="flex items-center gap-2 text-violet-700">
                <Milestone className="w-4 h-4" />
                <h4 className="font-black uppercase tracking-widest text-xs tracking-wider">Industrial Capstone Projects</h4>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {course.projects.map((project, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-white px-3 py-2.5 rounded-xl border border-violet-100/60">
                    <span className="w-2 h-2 rounded-full bg-violet-500 shrink-0" />
                    {project}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 5: Installments Plan Strategy Block */}
          {/* Hides automatically if installments length <= 1 */}
          {hasInstallments && 'installments' in course && course.installments && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-slate-800">
                <Wallet className="w-4 h-4 text-violet-500" />
                <h4 className="font-black uppercase tracking-widest text-xs tracking-wider text-slate-400">Structured Installment Plans</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {course.installments.map((inst, i) => (
                  <div key={i} className="flex justify-between items-center p-3.5 border border-slate-100 rounded-xl bg-slate-50/50">
                    <span className="font-bold text-xs text-slate-600">{inst.title}</span>
                    <span className="text-sm font-black text-violet-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200/60">
                      ₹{inst.amount}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Footer Controlled Actions Panel */}
        <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 grid grid-cols-2 gap-4">
          <button 
            type="button"
            onClick={onClose} 
            className="py-3.5 sm:py-4 font-black text-xs uppercase tracking-wider text-slate-500 border-2 border-slate-200 bg-white rounded-2xl hover:bg-slate-50 active:scale-[0.98] transition-all duration-150"
          >
            Close Blueprint
          </button>
          <button 
            type="button"
            onClick={onEnroll} 
            className="py-3.5 sm:py-4 font-black text-xs uppercase tracking-wider text-white bg-violet-600 rounded-2xl hover:bg-violet-700 shadow-xl shadow-violet-600/10 active:scale-[0.98] transition-all duration-150"
          >
            Enroll Program Now
          </button>
        </div>

      </div>
    </div>
  );
}