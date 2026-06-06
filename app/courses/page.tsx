'use client';

import { useState, useEffect } from 'react';
import CoursesList from './components/CoursesList';

export type CourseType = 'computer' | 'english' | 'coding';

export interface BaseCourse {
  _id: string;
  type: CourseType;
  duration: string;
  actualPrice: number;
  discountPrice: number;
  topics: string[];
  imageUrl?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
}

export interface ComputerCourseType extends BaseCourse {
  type: 'computer';
  title: string;
  installments: { title: string; amount: number }[];
}

export interface EnglishCourseType extends BaseCourse {
  type: 'english';
  title: string;
  lmcCharge: number;
  installments: { title: string; amount: number }[];
}

export interface CodingCourseType extends BaseCourse {
  type: 'coding';
  language: string;
  projects: string[];
}

export type CourseUnion = ComputerCourseType | EnglishCourseType | CodingCourseType;

export default function UserCoursesPage() {
  const [courses, setCourses] = useState<CourseUnion[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const fetchAllCourses = async () => {
    try {
      setLoading(true);
      // Hamari custom user route fetch pipeline hit karenge
      const res = await fetch('/api/courses');
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (err) {
      console.error("Error pulling course collections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  // Strict local component synchronous layout computation
  const filteredCourses = activeTab === 'all'
    ? courses
    : courses.filter((c) => c.type === activeTab);

  return (
    <div className="min-h-screen bg-white text-slate-900 p-4 sm:p-6 lg:p-10 selection:bg-violet-200">
      <div className="max-w-7xl mx-auto">
        
        {/* User Header Section */}
        <div className="pb-6 border-b border-slate-100 flex flex-col gap-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Available Programs
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            Explore our professional training programs and upgrade your skill sets.
          </p>
        </div>

        {/* Responsive Mini Navigation Tabs - Mobile Scroll Enabled */}
        <div className="flex justify-center my-8 w-full overflow-hidden px-1">
          <div className="bg-slate-50 border border-slate-200/60 p-1 rounded-xl sm:rounded-2xl flex gap-1 w-full max-w-full overflow-x-auto scrollbar-none md:w-auto md:max-w-none whitespace-nowrap">
            {['all', 'computer', 'english', 'coding'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-initial text-center px-4 sm:px-6 py-2 rounded-lg sm:rounded-xl text-[11px] uppercase tracking-wider font-extrabold transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-violet-600 text-white shadow-sm shadow-violet-600/20'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/40'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Render Dynamic Filtered Courses Grid Layout */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-600" />
          </div>
        ) : (
          <CoursesList courses={filteredCourses} />
        )}
      </div>
    </div>
  );
}