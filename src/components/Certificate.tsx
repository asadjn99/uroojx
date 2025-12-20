"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CertificateProps {
  studentName: string;
  courseName: string;
  instructor: string;
  date: string;
  onClose: () => void;
}

export default function Certificate({ studentName, courseName, instructor, date, onClose }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!certificateRef.current) return;
    
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2, // Higher quality
      backgroundColor: "#ffffff",
    });
    
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "a4"); // Landscape, A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Lumina_Certificate_${studentName.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="flex flex-col gap-6 max-w-4xl w-full">
        {/* Actions Bar */}
        <div className="flex justify-between items-center text-white">
          <h2 className="text-xl font-bold">🎉 Course Completed!</h2>
          <div className="flex gap-3">
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">Close</button>
            <button 
              onClick={handleDownload}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2"
            >
              <span className="material-symbols-outlined">download</span>
              Download PDF
            </button>
          </div>
        </div>

        {/* The Certificate (Visible to user & captured by PDF) */}
        <div 
          ref={certificateRef} 
          className="relative bg-white text-slate-900 w-full aspect-[1.414/1] p-12 flex flex-col items-center justify-center text-center border-[20px] border-double border-slate-900 shadow-2xl"
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          {/* Decorative Corner */}
          <div className="absolute top-4 left-4 size-16 border-t-4 border-l-4 border-primary"></div>
          <div className="absolute bottom-4 right-4 size-16 border-b-4 border-r-4 border-primary"></div>

          {/* Logo / Badge */}
          <div className="mb-8 text-primary">
             <span className="material-symbols-outlined text-6xl">school</span>
          </div>

          <h1 className="text-5xl font-bold uppercase tracking-widest mb-4 text-slate-900">Certificate</h1>
          <h2 className="text-xl text-slate-500 uppercase tracking-widest mb-12">of Completion</h2>

          <p className="text-lg text-slate-600 mb-2">This is to certify that</p>
          <h3 className="text-4xl font-bold text-primary mb-2 border-b-2 border-slate-300 pb-4 px-12 min-w-[400px]">{studentName}</h3>
          
          <p className="text-lg text-slate-600 mt-6 mb-2">Has successfully completed the course</p>
          <h4 className="text-2xl font-bold text-slate-800 mb-12">{courseName}</h4>

          <div className="flex justify-between w-full max-w-2xl mt-auto pt-8 border-t border-slate-200">
            <div className="text-center">
              <p className="font-bold text-lg font-signature">{instructor}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Instructor</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">{date}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Date Issued</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-lg text-primary">Lumina Academy</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}