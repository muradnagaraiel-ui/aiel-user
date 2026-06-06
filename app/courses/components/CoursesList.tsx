'use client';

import { useState } from 'react';
import { CourseUnion } from '../page';
import ViewDetails from './ViewDetails'; 
import EnquiryModal from '@/components/EnquiryModal';

interface ListProps {
  courses: CourseUnion[];
}

export default function CoursesList({ courses }: ListProps) {
  const [selectedCourse, setSelectedCourse] = useState<CourseUnion | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  if (courses.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 max-w-md mx-auto">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">No active classes found.</p>
      </div>
    );
  }

  return (
    <>
      {/* 3 Column Layout Grid System - Items stretching smoothly */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {courses.map((course) => {
          const discountPercent = course.actualPrice > 0 
            ? Math.round(((course.actualPrice - course.discountPrice) / course.actualPrice) * 100) 
            : 0;
          
          {/* CRITICAL FIX: Installment badge tabhi valid hoga jab structure 1 se bada (> 1) ho */}
          const hasMultipleInstallments = 'installments' in course && course.installments && course.installments.length > 1;

          return (
            <div
              key={course._id}
              className="bg-gray-200 border border-slate-100 rounded-3xl p-6 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-600/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-fit group relative"
            >
              {/* Top Content Area */}
              <div className="flex-1 flex flex-col">
                {/* Header Badge Row */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase font-black tracking-widest px-2.5 py-1 rounded-lg bg-violet-50 text-violet-600 border border-violet-100">
                    {course.type}
                  </span>
                  {discountPercent > 0 && (
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full system-badge">
                      🔥 {discountPercent}% OFF
                    </span>
                  )}
                </div>

                {/* Course Main Title */}
                <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight group-hover:text-violet-600 transition-colors duration-200">
                  {course.type === 'coding' ? course.language : course.title}
                </h3>
                
                {/* Duration Metadata Tag */}
                <div className="flex flex-wrap items-center gap-1.5 mb-4">
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                    ⏱️ {course.duration}
                  </span>
                  {/* Badge rendered ONLY if there are genuine multiple milestones */}
                  {hasMultipleInstallments && (
                    <span className="text-[10px] text-violet-600 font-extrabold bg-violet-50/50 px-2 py-0.5 rounded-md">
                      Installments also Available
                    </span>
                  )}
                </div>

                <div className="w-full h-px bg-slate-100 mb-4" />

                {/* Flexible 2-Column Syllabus Block */}
                <div className="space-y-2 mb-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Syllabus Matrix</p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                    {course.topics?.map((topic, i) => (
                      <div key={i} className="flex items-start gap-1 group/item">
                        <span className="w-1.5 h-1.5 rounded-full bg-black flex-shrink-0 mt-1" />
                        <span className="text-slate-600 text-xs font-medium leading-tight line-clamp-2">{topic}</span>
                      </div>
                    ))}
                  </div>
                  {(!course.topics || course.topics.length === 0) && (
                    <p className="text-xs italic text-slate-400">Modules loading shortly...</p>
                  )}
                </div>
              </div>

              {/* Action Trigger Buttons - Always pins cleanly to the card base */}
              <div className="pt-4 border-t border-slate-50 mt-auto">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => { setSelectedCourse(course); setIsViewOpen(true); }}
                    className="py-3 rounded-xl font-bold text-xs text-slate-600 bg-slate-50 hover:bg-slate-100 active:scale-[0.98] transition-all duration-150"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedCourse(course); setIsEnquiryOpen(true); }}
                    className="py-3 rounded-xl font-bold text-xs text-white bg-violet-600 hover:bg-violet-700 active:scale-[0.98] shadow-md shadow-violet-600/10 transition-all duration-150"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Shared Modals Logic Mount */}
      {selectedCourse && (
        <>
          <ViewDetails
            open={isViewOpen}
            course={selectedCourse}
            onClose={() => { setIsViewOpen(false); setSelectedCourse(null); }}
            onEnroll={() => { setIsViewOpen(false); setIsEnquiryOpen(true); }}
          />
          <EnquiryModal
            open={isEnquiryOpen}
            onClose={() => { setIsEnquiryOpen(false); setSelectedCourse(null); }}
            prefill={{
              type: selectedCourse.type,
              courseName: selectedCourse.type === 'coding' ? selectedCourse.language : selectedCourse.title,
            }}
          />
        </>
      )}
    </>
  );
}