"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CertificateProps {
  studentName: string;
  courseName: string;
  instructor: string;
  date: string;
  certificateId: string; // New Prop
  onClose: () => void;
}

export default function Certificate({ studentName, courseName, instructor, date, certificateId, onClose }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    // High quality capture
    const canvas = await html2canvas(certificateRef.current, {
      scale: 3, 
      backgroundColor: "#ffffff",
      useCORS: true // Important for images
    });
    
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Lumina_Certificate_${certificateId}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md overflow-y-auto">
      <div className="flex flex-col gap-6 max-w-5xl w-full">
        
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-white gap-4">
          <div>
            <h2 className="text-2xl font-bold">🎓 Official Certificate</h2>
            <p className="text-slate-400 text-sm">ID: {certificateId}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 transition-colors">
              Close
            </button>
            <button 
              onClick={handleDownload}
              className="bg-linear-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg"
            >
              <span className="material-symbols-outlined">download</span>
              Download PDF
            </button>
          </div>
        </div>

        {/* --- THE CERTIFICATE --- */}
        <div className="overflow-hidden rounded-xl shadow-2xl">
          <div 
            ref={certificateRef} 
            className="relative bg-white text-slate-900 w-full aspect-[1.414/1] p-12 flex flex-col items-center text-center"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {/* 1. Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-5" 
                 style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "30px 30px" }}>
            </div>

            {/* 2. Ornamental Border */}
            <div className="absolute inset-4 border-4 border-double border-slate-900 z-10"></div>
            <div className="absolute inset-6 border border-slate-400 z-10"></div>
            
            {/* Corners */}
            <div className="absolute top-4 left-4 size-24 border-t-8 border-l-8 border-amber-600 z-20"></div>
            <div className="absolute top-4 right-4 size-24 border-t-8 border-r-8 border-amber-600 z-20"></div>
            <div className="absolute bottom-4 left-4 size-24 border-b-8 border-l-8 border-amber-600 z-20"></div>
            <div className="absolute bottom-4 right-4 size-24 border-b-8 border-r-8 border-amber-600 z-20"></div>

            {/* 3. Header Content */}
            <div className="z-30 mt-12 mb-4">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="material-symbols-outlined text-5xl text-amber-600">school</span>
                <span className="text-2xl font-bold tracking-widest text-slate-800 uppercase">Lumina Academy</span>
              </div>
              <h1 className="text-6xl font-black text-slate-900 uppercase tracking-widest mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                Certificate
              </h1>
              <h2 className="text-2xl text-amber-600 font-medium italic">of Achievement</h2>
            </div>

            {/* 4. Main Content */}
            <div className="z-30 flex-1 flex flex-col justify-center w-full max-w-4xl">
              <p className="text-lg text-slate-500 mb-6 uppercase tracking-widest">This certifies that</p>
              
              <h3 className="text-5xl font-bold text-slate-900 mb-6 py-4 border-b-2 border-slate-200 w-full font-signature" style={{ fontFamily: "'Great Vibes', cursive" }}>
                {studentName}
              </h3>
              
              <p className="text-lg text-slate-500 mb-4 uppercase tracking-widest">Has successfully completed the course</p>
              
              <h4 className="text-3xl font-bold text-slate-800 mb-8 max-w-3xl mx-auto leading-tight">
                {courseName}
              </h4>
            </div>

            {/* 5. Footer / Signatures */}
            <div className="z-30 w-full max-w-4xl grid grid-cols-3 items-end gap-12 mb-12">
              <div className="text-center">
                <div className="border-b border-slate-400 pb-2 mb-2">
                  <p className="font-bold text-2xl text-slate-800" style={{ fontFamily: "'Great Vibes', cursive" }}>{instructor}</p>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Instructor</p>
              </div>

              {/* Badge / Seal */}
              <div className="flex justify-center -mb-6">
                <div className="size-32 bg-amber-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white border-dashed relative">
                  <div className="absolute inset-1 border border-white/50 rounded-full"></div>
                  <div className="text-center">
                    <span className="material-symbols-outlined text-4xl mb-1">verified</span>
                    <p className="text-[10px] uppercase font-bold tracking-widest">Verified</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="border-b border-slate-400 pb-2 mb-2">
                  <p className="font-bold text-lg text-slate-800">{date}</p>
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Date Issued</p>
              </div>
            </div>

            {/* 6. Verification ID Bar */}
            <div className="z-30 bg-slate-100 py-3 px-8 rounded-full border border-slate-200 flex items-center gap-4">
              <div className="text-left">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Certificate ID</p>
                <p className="text-sm font-mono font-bold text-slate-900">{certificateId}</p>
              </div>
              <div className="h-8 w-px bg-slate-300"></div>
              <div className="text-left">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Verify At</p>
                <p className="text-sm font-bold text-primary">uroojx.netlify.app/verify</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}