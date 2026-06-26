"use client";

import { useState } from "react";
import { 
  Calendar, Clock, Search, Download, HelpCircle, 
  ImageIcon, Sparkles, FileImage, AlertCircle 
} from "lucide-react";

const batchSlots = [
  "07:00 AM - 08:00 AM", "07:30 AM - 08:30 AM",
  "08:00 AM - 09:00 AM", "08:30 AM - 09:30 AM",
  "09:00 AM - 10:00 AM", "09:30 AM - 10:30 AM",
  "10:00 AM - 11:00 AM", "10:30 AM - 11:30 AM",
  "11:00 AM - 12:00 PM", "11:30 AM - 12:30 PM",
  "12:00 PM - 01:00 PM", "12:30 PM - 01:30 PM",
  "01:00 PM - 02:00 PM", "01:30 PM - 02:30 PM",
  "02:00 PM - 03:00 PM", "02:30 PM - 03:30 PM",
  "03:00 PM - 04:00 PM", "03:30 PM - 04:30 PM",
  "04:00 PM - 05:00 PM", "04:30 PM - 05:30 PM",
  "05:00 PM - 06:00 PM", "05:30 PM - 06:30 PM",
  "06:00 PM - 07:00 PM", "06:30 PM - 07:30 PM",
  "07:00 PM - 08:00 PM"
];

const monthsArray = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

type CreateSeminarProps = {
  onScheduleSuccess?: () => void;
};

export default function CreateSeminar({ onScheduleSuccess }: CreateSeminarProps) {
  // Form State Layout
  const [batchTime, setBatchTime] = useState(batchSlots[0]);
  const [startMonthIndex, setStartMonthIndex] = useState(0); // Default: January
  
  // Pipeline Loading & API States
  const [isLoading, setIsLoading] = useState(false);
  const [scoreImageUrl, setScoreImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-calculated End Month (3 months post start month)
  const endMonthIndex = (startMonthIndex + 3) % 12;
  const calculatedEndMonth = monthsArray[endMonthIndex];

  // Execution API Trigger Call
  const handleCheckSeminarStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setScoreImageUrl(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/check-seminar-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          batchTime,
          batchStartDate: monthsArray[startMonthIndex],
          batchEndDate: calculatedEndMonth,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success && data.scoreImageUrl) {
        setScoreImageUrl(data.scoreImageUrl);
      } else {
        setErrorMessage(data.error || "No active matching scoreboard found for this batch track configuration.");
      }
    } catch (error) {
      console.error("Pipeline failure matrix:", error);
      setErrorMessage("Network interface failure. Could not contact the verification ledger.");
    } finally {
      setIsLoading(false);
    }
  };

  // Safe Image Asset Download Link Execution
  const handleDownloadImage = async () => {
    if (!scoreImageUrl) return;
    try {
      const response = await fetch(scoreImageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `Scoreboard-${batchTime.replace(/\s+/g, "_")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Fallback redirect if blob operation hits CORS limitations
      window.open(scoreImageUrl, "_blank");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white text-slate-800 rounded-3xl shadow-xl border border-slate-100 text-left">
      
      {/* ─── MODAL HEAD NODE ─── */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
        <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
          <Sparkles size={26} className="stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
            Verify Seminar Scoreboard Metrics
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">
            Query allocations and download generated performance ledger metrics instantly.
          </p>
        </div>
      </div>

      {/* ─── CORE MATRIX DISPLAY DECK ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
        
        {/* LEFT COMPONENT COLUMN: THE ALLOCATION FORM PARAMETERS */}
        <form onSubmit={handleCheckSeminarStatus} className="lg:col-span-5 space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
            Verification Parameters
          </h3>

          {/* Batch Slots Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
              <Clock size={12} className="text-slate-400" /> Batch Timing Slot
            </label>
            <select
              value={batchTime}
              onChange={(e) => setBatchTime(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
            >
              {batchSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          {/* Start Month Matrix Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600 flex items-center gap-1">
              <Calendar size={12} className="text-slate-400" /> Start Month
            </label>
            <select
              value={startMonthIndex}
              onChange={(e) => setStartMonthIndex(parseInt(e.target.value))}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
            >
              {monthsArray.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
          </div>

          {/* End Month Dynamic Readonly Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
              🏁 Auto-calculated End Month (3-Month Lock)
            </label>
            <div className="w-full bg-slate-200/60 border border-slate-200/80 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-600 cursor-not-allowed select-none">
              {calculatedEndMonth}
            </div>
          </div>

          {/* Action Call Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-xl text-xs font-black tracking-wider uppercase transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Checking Database...</span>
              </>
            ) : (
              <>
                <Search size={14} className="stroke-[2.5]" />
                <span>Check Status</span>
              </>
            )}
          </button>
        </form>

        {/* RIGHT COMPONENT COLUMN: RESPONSE PREVIEW INTERFACE VIEW */}
        <div className="lg:col-span-7 space-y-4 min-h-[340px] flex flex-col justify-center border border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/30">
          
          {/* INITIAL AWAITING STATE */}
          {!scoreImageUrl && !errorMessage && !isLoading && (
            <div className="text-center max-w-sm mx-auto space-y-2">
              <HelpCircle className="mx-auto text-slate-300" size={44} />
              <h4 className="text-sm font-bold text-slate-700">Awaiting Track Selection</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Configure your active operational shift timing parameters on the left desk column to render verified scoreboard media targets here.
              </p>
            </div>
          )}

          {/* LOADING TRACK LOADER ANIMATION */}
          {isLoading && (
            <div className="space-y-4 animate-pulse w-full flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center animate-bounce" />
              <div className="h-4 bg-slate-200 rounded-md w-1/2 mx-auto" />
              <div className="h-3 bg-slate-200 rounded-md w-1/3 mx-auto" />
            </div>
          )}

          {/* FAIL MATCHING SYSTEM ERROR BLOCK */}
          {errorMessage && !isLoading && (
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 flex items-start gap-4 animate-in fade-in duration-200">
              <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
              <div>
                <h4 className="font-black text-rose-900 text-sm tracking-wide">Verification Missing</h4>
                <p className="text-xs text-rose-800/90 font-medium mt-1 leading-relaxed">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* SUCCESS STATUS STATE: TARGET MEDIA VISUAL LAYER RENDERING */}
          {scoreImageUrl && !isLoading && (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="border border-slate-200 bg-white p-3 rounded-2xl shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[11px] font-black uppercase text-indigo-600 tracking-wider flex items-center gap-1">
                    <FileImage size={12} /> Active Scoreboard Located
                  </span>
                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    <Download size={12} className="stroke-[2.5]" />
                    Download File
                  </button>
                </div>

                {/* Target Media Aspect Display Container Frame */}
                <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-slate-50 max-h-[260px] flex items-center justify-center group">
                  <img
                    src={scoreImageUrl}
                    alt="Seminar Scoreboard Dynamic Asset"
                    className="object-contain w-full h-full max-h-[260px] transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}