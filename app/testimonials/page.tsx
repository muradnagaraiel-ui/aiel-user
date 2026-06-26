'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Upload, X, MessageSquare, Plus, Loader2, CheckCircle } from 'lucide-react';

interface TestimonialData {
  _id: string;
  name: string;
  profileImage: string;
  rating: number;
  feedback: string;
}

export default function TestimonialsPage() {
  // States
  const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Form States matching your Mongoose Schema
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 1. Fetch Active Testimonials
  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch('/api/testimonial/get');
        const result = await res.json(); // Result ab { success, data: [] } hai

        if (res.ok && result.success) {
          // Backend se filtered data hi aa raha hai, isliye seedha set karenge
          setTestimonials(result.data); 
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTestimonials();
  }, []);

  // Handle Image Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 2. Form Submit handling to API route
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !feedback || !imageFile) {
      alert('Please fill all mandatory fields and upload a profile image.');
      return;
    }

    setSubmitLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('rating', rating.toString());
    formData.append('feedback', feedback);
    formData.append('profileImage', imageFile); // Will process fileId & secure URL in backend route

    try {
      const response = await fetch('/api/testimonial/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage(true);
        setTimeout(() => {
          setIsModalOpen(false);
          setSuccessMessage(false);
          // Reset Form
          setName('');
          setRating(5);
          setFeedback('');
          setImageFile(null);
          setImagePreview(null);
        }, 2000);
        
        // Optional: Re-fetch list instantly
        const updatedRes = await fetch('/api/testimonial/get');
        if (updatedRes.ok) {
          const updatedData = await updatedRes.json();
          setTestimonials(updatedData.filter((t: any) => t.isActive !== false));
        }
      } else {
        alert('Something went wrong during submission.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 px-6 py-16 max-w-7xl mx-auto antialiased selection:bg-red-500/10 selection:text-red-600">
      
      {/* ─── HEADER CONTAINER (TOP RIGHT ACTION BUTTON) ─── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-16 border-b border-slate-100 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-50 text-red-600 font-bold text-[10px] uppercase tracking-widest">
            <MessageSquare size={12} /> Reviews
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
            What Our <span className="text-red-600">Students</span> Say
          </h1>
          <p className="text-slate-400 text-sm font-normal">Real success stories from our technical labs.</p>
        </div>

        {/* Top Right Trigger Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-slate-950 hover:bg-red-600 text-white text-sm font-bold px-5 py-3.5 rounded-xl transition-all duration-300 active:scale-95 shadow-lg shadow-slate-950/10 cursor-pointer group"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          Add Your Testimonial
        </button>
      </div>

      {/* ─── TESTIMONIALS CARDS GRID ─── */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="animate-spin text-red-500" size={32} />
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-20 text-slate-400 text-sm bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          No active testimonials found. Be the first one to share!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="p-8 rounded-[24px] bg-slate-50 hover:bg-white border border-slate-100 hover:border-red-500/20 transition-colors duration-300 shadow-sm hover:shadow-xl hover:shadow-red-500/5 flex flex-col justify-between"
            >
              <div>
                {/* Profile Cluster Row */}
                <div className="flex items-start gap-4">
                  <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-slate-200 border-2 border-white ring-4 ring-slate-100 flex-shrink-0">
                    <img
                      src={item.profileImage}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-black text-slate-900 tracking-tight text-base leading-tight">
                      {item.name}
                    </h3>
                    {/* Stars Node */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={13}
                          className={`${
                            idx < item.rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-slate-200 fill-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Feedback text paragraph block */}
                <p className="mt-6 text-slate-500 text-sm leading-relaxed font-normal">
                  "{item.feedback}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ─── SUBMISSION MODAL LAYER (ANIMATE PRESENCE) ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitLoading && setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-white rounded-[32px] p-8 shadow-2xl border border-slate-100 z-10 overflow-hidden"
            >
              {/* Top Banner Control Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">Share Experience</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Let others know about your learning path.</p>
                </div>
                <button
                  disabled={submitLoading}
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {successMessage ? (
                /* Success Prompt state block */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col justify-center items-center text-center space-y-3"
                >
                  <div className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-md">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Submitted Successfully!</h3>
                  <p className="text-xs text-slate-400">Your genuine review is uploaded safely inside records.</p>
                </motion.div>
              ) : (
                /* Main Interactive Input Elements Input form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Rohan Sharma"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all text-slate-900 font-medium"
                    />
                  </div>

                  {/* Rating Selector Block */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Rate Your Experience</label>
                    <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="text-slate-300 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            size={24}
                            className={`${
                              star <= rating
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-slate-200 fill-slate-200'
                            } transition-colors`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-400 ml-auto pr-1">{rating} / 5 Stars</span>
                    </div>
                  </div>

                  {/* Profile Picture Upload Block */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Profile Picture</label>
                    <div className="flex items-center gap-4">
                      {imagePreview && (
                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                          <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                        </div>
                      )}
                      <label className="flex-1 flex items-center justify-center gap-2 border border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100/50 transition-colors rounded-xl px-4 py-3 cursor-pointer text-sm text-slate-500 font-medium">
                        <Upload size={16} className="text-slate-400" />
                        <span>{imageFile ? imageFile.name : 'Choose JPG/PNG Avatar'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          required
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Feedback Message Area */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Feedback Statement</label>
                    <textarea
                      required
                      rows={4}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Write how our Ms Office, Tally, English Fluency or Coding language labs helped you achieve your target path..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-red-500 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all text-slate-900 font-normal resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submission Action Call Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="w-full bg-slate-950 hover:bg-red-600 disabled:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-slate-950/5"
                    >
                      {submitLoading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Processing Payload...
                        </>
                      ) : (
                        'Publish Testimonial'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}