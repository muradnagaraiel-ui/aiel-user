'use client';

import { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  prefill?: {
    type: 'computer' | 'english' | 'coding' | string;
    courseName: string;
  } | null;
}

export default function EnquiryModal({ open, onClose, prefill }: Props) {
  // Loading and Custom Toast States
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; msg: string; status: 'success' | 'error' }>({
    show: false,
    msg: '',
    status: 'success'
  });

  // Form State Data Architecture
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    mobileNumber: '',
    whatsappNumber: '',
    enquiryDate: new Date().toISOString().split('T')[0], // Default today's date
    gender: '',
    qualification: '',
    courseType: '',
    courseName: '',
    address: '',
    query: '',
    reason: '',
  });

  // Helper to trigger top-right custom toast
  const showToast = (msg: string, status: 'success' | 'error') => {
    setToast({ show: true, msg, status });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4000);
  };

  // Synced Effect hooks to auto fill when user clicks 'Enroll'
  useEffect(() => {
    if (prefill) {
      setFormData((prev) => ({
        ...prev,
        courseType: prefill.type,
        courseName: prefill.courseName,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        courseType: '',
        courseName: '',
      }));
    }
  }, [prefill, open]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Core Field validation
    if (!formData.studentName || !formData.mobileNumber || !formData.courseName) {
      showToast('Please fill all required fields.', 'error');
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('/api/enquiry/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success) {
        showToast('Enquiry Submitted Successfully! 🚀', 'success');
        
        // Reset Form States
        setFormData({
          studentName: '',
          fatherName: '',
          mobileNumber: '',
          whatsappNumber: '',
          enquiryDate: new Date().toISOString().split('T')[0],
          gender: '',
          qualification: '',
          courseType: '',
          courseName: '',
          address: '',
          query: '',
          reason: '',
        });

        // Close modal after success animation lag
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        showToast(data.message || 'Submission failed.', 'error');
      }
    } catch (err) {
      console.error('Submission pipeline error:', err);
      showToast('Server error. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* --- PREMIUM TOP-RIGHT CUSTOM TOAST --- */}
      <div 
        className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border bg-slate-900 text-white border-slate-800 transition-all duration-300 transform ${
          toast.show 
            ? 'translate-x-0 opacity-100 scale-100' 
            : 'translate-x-12 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {toast.status === 'success' ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
        ) : (
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
        )}
        <div className="flex flex-col">
          <span className="text-xs font-black tracking-wider uppercase">
            {toast.status === 'success' ? 'Success' : 'Alert'}
          </span>
          <span className="text-xs text-slate-300 font-medium mt-0.5">{toast.msg}</span>
        </div>
      </div>

      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 transition-opacity"
      />

      {/* Main Form Box Container */}
      <div className="fixed inset-0 flex items-center justify-center z-[60] p-4 transition-all">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-[28px] w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between"
        >
          {/* Modal Branding Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Course Enquiry Form
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Please share your details to process admissions.</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content Inputs Structure */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Student Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Ex: John Doe"
                className="w-full bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Father's Name</label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Ex: Robert Doe"
                className="w-full bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Mobile Number <span className="text-red-500">*</span></label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="10-digit primary contact"
                className="w-full bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">WhatsApp Number</label>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="Alternative update sync channel"
                className="w-full bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Enquiry Date</label>
              <input
                type="date"
                name="enquiryDate"
                value={formData.enquiryDate}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Select Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white rounded-xl px-4 py-3 text-slate-700 text-sm outline-none transition-all"
              >
                <option value="">Choose Option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Qualification</label>
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white rounded-xl px-4 py-3 text-slate-700 text-sm outline-none transition-all"
              >
                <option value="">Select current status</option>
                <option value="10th Pass">10th Pass</option>
                <option value="12th Pass">12th Pass</option>
                <option value="Graduate">Graduate</option>
                <option value="Post-Graduate">Post-Graduate</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 block mb-1">Course Stream Type</label>
              <select
                name="courseType"
                value={formData.courseType}
                onChange={handleChange}
                disabled={!!prefill} // Locked status indicator
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm outline-none disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <option value="">Course Type</option>
                <option value="computer">Computer</option>
                <option value="english">English</option>
                <option value="coding">Coding</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 block mb-1">Course Identity Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                readOnly={!!prefill} // Dynamic lock status assignment
                placeholder="Ex: Python Fullstack Pro"
                className="w-full bg-slate-50 read-only:bg-slate-100 border border-slate-200 focus:border-violet-500 focus:bg-white rounded-xl px-4 py-3 text-slate-900 text-sm font-semibold outline-none transition-all read-only:cursor-not-allowed"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 block mb-1">Residential Address</label>
              <textarea
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                placeholder="Complete street location logs..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 block mb-1">Any Specific Queries?</label>
              <textarea
                name="query"
                rows={2}
                value={formData.query}
                onChange={handleChange}
                placeholder="Ask about batch timings, certificates, or study materials..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-bold text-slate-500 block mb-1">Why do you want to pursue this course?</label>
              <textarea
                name="reason"
                rows={2}
                value={formData.reason}
                onChange={handleChange}
                placeholder="Career switch, skill enhancement, college project assistance..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-violet-500 focus:bg-white rounded-xl px-4 py-3 text-slate-900 text-sm outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full ${
              loading ? 'bg-violet-400 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700'
            } text-white py-4 rounded-xl font-bold tracking-wide uppercase text-xs shadow-xl shadow-violet-600/10 active:scale-[0.99] transition-all`}
          >
            {loading ? 'Submitting Details...' : 'Submit Enquiry Details'}
          </button>
        </form>
      </div>
    </>
  );
}