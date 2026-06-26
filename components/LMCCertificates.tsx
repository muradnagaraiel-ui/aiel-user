"use client";

import { useState } from "react";
import { 
  FileCheck2, Search, CheckCircle2, Clock, AlertCircle, 
  HelpCircle, Image as ImageIcon, Wallet, ShieldCheck, Zap 
} from "lucide-react";

// ─── BATCH SLOTS LIST ───
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

type APIStatusType = "COLLECTED" | "UNCOLLECTED" | "NOT_FOUND" | null;

export default function LmcCertificateModal() {
  // Form Inputs State
  const [studentName, setStudentName] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(batchSlots[0]);
  const [cardType, setCardType] = useState<"LMC" | "Certificate">("LMC");
  
  // Loader & System Pipeline States
  const [isLoading, setIsLoading] = useState(false);
  const [apiResult, setApiResult] = useState<APIStatusType>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ─── LIVE DYNAMIC BACKEND PIPELINE CALL ───
  const handleCheckStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    setIsLoading(true);
    setApiResult(null);
    setErrorMessage(null);

    try {
      // Live Next.js API endpoint request
      const response = await fetch("/api/check-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentName: studentName.trim(),
          selectedBatch,
          cardType,
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setApiResult(data.status); // Expected: "COLLECTED" | "UNCOLLECTED" | "NOT_FOUND"
      } else {
        setErrorMessage(data.error || "Failed to process request.");
        setApiResult("NOT_FOUND");
      }
    } catch (error) {
      console.error("Database Connection Failure Error Matrix:", error);
      setErrorMessage("Network connectivity fallback interface mismatch.");
      setApiResult("NOT_FOUND"); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white text-slate-800 rounded-3xl shadow-xl border border-slate-100 text-left">
      
      {/* ─── MODAL HEAD NODE ─── */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
          <FileCheck2 size={26} className="stroke-[2.5]" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
            Check Credentials & LMC Status
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">
            Verify your allocation profile status dynamically from the database instant ledger.
          </p>
        </div>
      </div>

      {/* ─── CORE TWO-COLUMN ACTION DESK ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
        
        {/* LEFT COLUMN: THE INPUT MATRIX FORM (5 COLS) */}
        <form onSubmit={handleCheckStatus} className="lg:col-span-5 space-y-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
            Verification Parameters
          </h3>

          {/* Student Name field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600">Full Name</label>
            <input
              type="text"
              required
              placeholder="Enter student's exact name..."
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            />
          </div>

          {/* Batch Slots Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600">Batch Timing Slot</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer"
            >
              {batchSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          {/* Card Type Radio Group */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-600">Document Type</label>
            <div className="grid grid-cols-2 gap-3">
              {(["LMC", "Certificate"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => { setCardType(type); setApiResult(null); setErrorMessage(null); }}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    cardType === type
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${cardType === type ? 'bg-white' : 'bg-slate-300'}`} />
                  {type === "LMC" ? "LMC Card" : "Certificate"}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Trigger Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white rounded-xl text-xs font-black tracking-wider uppercase transition-all shadow-md active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Searching Database...</span>
              </>
            ) : (
              <>
                <Search size={14} className="stroke-[2.5]" />
                <span>Check Status</span>
              </>
            )}
          </button>
        </form>

        {/* RIGHT COLUMN: DYNAMIC CONDITIONAL RESPONSE WINDOW (7 COLS) */}
        <div className="lg:col-span-7 space-y-4 min-h-[300px] flex flex-col justify-center border border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50/30">
          
          {/* INITIAL STATE BLOCK */}
          {apiResult === null && !isLoading && (
            <div className="text-center max-w-sm mx-auto space-y-2">
              <HelpCircle className="mx-auto text-slate-300" size={44} />
              <h4 className="text-sm font-bold text-slate-700">Awaiting Search Inputs</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provide the correct student profile allocation parameters. The real-time tracking dashboard output reports render context metrics here.
              </p>
            </div>
          )}

          {/* LOADING PLACEHOLDER TRACK */}
          {isLoading && (
            <div className="space-y-4 animate-pulse w-full">
              <div className="h-6 bg-slate-200 rounded-md w-1/3" />
              <div className="h-24 bg-slate-200 rounded-xl w-full" />
              <div className="h-16 bg-slate-200 rounded-xl w-full" />
            </div>
          )}

          {/* CONDITION A: UNCOLLECTED ALERT STATE BOX */}
          {apiResult === "UNCOLLECTED" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-5 flex items-start gap-4">
                <Clock className="text-amber-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-black text-amber-900 text-sm tracking-wide">
                    {cardType === "LMC" ? "LMC Card Ready for Collection!" : "Computer Certificate Issued!"}
                  </h4>
                  <p className="text-xs text-amber-800/90 font-medium mt-1 leading-relaxed">
                    Your document target <span className="font-extrabold text-amber-950">{cardType === "LMC" ? "LMC Card" : "Certificate"}</span> is verified and processed, but has not yet been fetched. Please approach the main administration desk for allocation collection.
                  </p>
                  
                  {cardType === "LMC" ? (
                    <p className="text-[11px] text-amber-700 font-bold mt-2 bg-white/60 inline-block px-2.5 py-1 rounded-lg border border-amber-100">
                      ⚠️ Note: Ensure your institutional structural standard card fee processing amount is settled.
                    </p>
                  ) : (
                    <p className="text-[11px] text-amber-700 font-bold mt-2 bg-white/60 inline-block px-2.5 py-1 rounded-lg border border-amber-100">
                      ⚠️ Verification Notice: Clearance requires successful structural payment criteria matches.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CONDITION B: COLLECTED CONFIRMATION BOX */}
          {apiResult === "COLLECTED" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-4">
                <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-black text-emerald-900 text-sm tracking-wide">
                    Already Safely Handed Over!
                  </h4>
                  <p className="text-xs text-emerald-800/90 font-medium mt-1 leading-relaxed">
                    Records show this <span className="font-extrabold text-emerald-950">{cardType === "LMC" ? "LMC Card" : "Computer Certificate"}</span> was already released through an authorized register desk verification hand-off checkpoint.
                  </p>
                  <p className="text-[11px] text-emerald-700/90 mt-2 font-semibold">
                    If there is data parsing inconsistency, present your counter reference log metrics to the administration hub.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CONDITION C: NOT FOUND / SYSTEM ERROR ALERT WORKFLOW BOX */}
          {apiResult === "NOT_FOUND" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Core Warning Card */}
              <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 flex items-start gap-4">
                <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-black text-rose-900 text-sm tracking-wide">
                    {errorMessage ? "Operation Execution Blocked" : "Document Not Issued / No Record Found"}
                  </h4>
                  <p className="text-xs text-rose-800/90 font-medium mt-1 leading-relaxed">
                    {errorMessage 
                      ? `The backend server pipeline returned: ${errorMessage}`
                      : `The chosen system parameters for ${cardType === "LMC" ? "LMC Card" : "Certificate"} do not match an active distribution manifest profile.`
                    }
                  </p>
                </div>
              </div>

              {/* Requirement Ledger Deck */}
              <div className="border border-slate-100 bg-white rounded-2xl p-4 shadow-sm space-y-3">
                <h5 className="text-xs font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                  <ImageIcon size={14} className="text-indigo-600" />
                  Required Documents Checklist
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-500 font-bold">
                  <li className="flex items-center gap-1.5 text-slate-700">🔹 2 Passport Size Photos</li>
                  {cardType === "Certificate" && (
                    <li className="flex items-center gap-1.5 text-slate-700">🔹 Valid Identity Document Photocopy</li>
                  )}
                  <li className="flex items-center gap-1.5 text-slate-700">🔹 Batch Timing & Attendance Slip</li>
                </ul>
              </div>

              {/* Package Options Framework Matrix Table */}
              <div className="border border-slate-200/70 rounded-2xl bg-white overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-100 p-3 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-700 flex items-center gap-1.5">
                    <Wallet size={14} className="text-slate-600" />
                    {cardType === "LMC" ? "LMC Card Issuance Fee" : "Certificate Structures & Fee Matrix"}
                  </span>
                </div>
                
                {cardType === "LMC" ? (
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-slate-800 block">Standard LMC Layout Card</span>
                      <span className="text-[10px] text-slate-500 font-medium">LMC Identification profile structure layout allocation</span>
                    </div>
                    <span className="text-base font-black text-indigo-600">₹200</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 divide-x divide-slate-100">
                    {/* Private Token package */}
                    <div className="p-4 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-800">American Private</span>
                        <span className="text-sm font-black text-indigo-600">₹500</span>
                      </div>
                      <div className="space-y-1 text-[10px] text-slate-500 font-medium">
                        <div className="flex items-center gap-1"><Zap size={10} className="text-amber-500" /> Superfast Standard Verification</div>
                        <div className="flex items-center gap-1"><ShieldCheck size={10} className="text-emerald-500" /> Institution Verified Access</div>
                      </div>
                    </div>

                    {/* Gov Block package */}
                    <div className="p-4 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-slate-800">Government Linked</span>
                        <span className="text-sm font-black text-teal-600">₹700</span>
                      </div>
                      <div className="space-y-1 text-[10px] text-slate-500 font-medium">
                        <div className="flex items-center gap-1"><ShieldCheck size={10} className="text-emerald-500" /> Government Verification Validity</div>
                        <div className="flex items-center gap-1"><Zap size={10} className="text-blue-500" /> Direct Public Sector Job Perks</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}