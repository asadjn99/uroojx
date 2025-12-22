"use client";

import React, { useState } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { createClient } from "@/src/utils/supabase/client";

// Re-using course DB for names
const coursesDB = [
  { id: 1, title: "Mastering Web Development: From Zero to Hero" },
  { id: 2, title: "Adobe Illustrator Training Course (Urdu/Hindi)" },
  { id: 3, title: "Web Test..." },
  { id: 4, title: "Course for testing" }
];

export default function VerifyCertificate() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    // 1. Call the secure RPC function we created
    const { data, error } = await supabase
      .rpc('verify_certificate', { cert_id_input: certId.trim() });

    if (error || !data || data.length === 0) {
      setError("Invalid Certificate ID. Please check and try again.");
    } else {
      // Data returns as an array, take the first item
      const certData = data[0];
      
      // 2. Map course ID to Name
      const course = coursesDB.find(c => c.id === Number(certData.course_id));
      
      setResult({
        studentName: certData.student_name || "Student",
        courseName: course?.title || "Unknown Course",
        issueDate: new Date(certData.completion_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        valid: true
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-dark text-slate-300 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-surface-dark border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="size-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl">verified</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Verify Certificate</h1>
            <p className="text-slate-400 text-sm mt-2">Enter the Certificate ID found on the certificate to verify its authenticity.</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Certificate ID</label>
              <input 
                type="text" 
                value={certId}
                onChange={(e) => setCertId(e.target.value.toUpperCase())}
                placeholder="LUM-XXXX-XXXX"
                className="w-full bg-black/20 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-center font-mono tracking-widest text-lg uppercase"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full cursor-pointer bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify Now"}
            </button>
          </form>

          {/* Result Section */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center text-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              {error}
            </div>
          )}

          {result && (
            <div className="mt-6 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center animate-in fade-in slide-in-from-bottom-4">
              <p className="text-emerald-400 font-bold flex items-center justify-center gap-2 mb-4">
                <span className="material-symbols-outlined">check_circle</span>
                Valid Certificate
              </p>
              
              <div className="space-y-3 text-sm">
                <div>
                    <p className="text-slate-400 text-xs uppercase font-bold">Student Name</p>
                    <p className="text-white font-medium text-lg">{result.studentName}</p>
                </div>
                
                <div className="h-px bg-emerald-500/20"></div>
                
                <div>
                    <p className="text-slate-400 text-xs uppercase font-bold">Course</p>
                    <p className="text-white font-medium">{result.courseName}</p>
                </div>

                <div className="h-px bg-emerald-500/20"></div>

                <div>
                    <p className="text-slate-400 text-xs uppercase font-bold">Issue Date</p>
                    <p className="text-white font-medium">{result.issueDate}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}