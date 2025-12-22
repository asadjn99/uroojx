"use client";

import React, { useState, useEffect } from "react";
// import Link from "next/link";
import Image from "next/image";
export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    
    const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup");
    
    if (!hasSeenPopup) {
      // Show popup after a small delay (1.5 seconds) for better UX
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    
    localStorage.setItem("hasSeenWelcomePopup", "true");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      ></div>

      {/* Popup Card */}
      <div className="relative w-full max-w-2xl bg-surface-dark border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute cursor-pointer top-4 right-4 z-20 text-slate-400 hover:text-white transition-colors bg-black/20 hover:bg-black/50 rounded-full p-1"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>




        {/* LEFT: Image Section */}
        <div className="w-full md:w-2/5 h-64 md:h-auto relative">
          <Image 
            src="/images/asad.jpg" 
            alt="Asad Ullah" 
            width={"100"}
            height={"100"}
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
          {/* Gradient Overlay for Text Readability on Mobile */}
          <div className="absolute inset-0 bg-linear-to-t from-surface-dark via-transparent to-transparent md:hidden"></div>
        </div>

        {/* RIGHT: Content Section */}
        <div className="w-full md:w-3/5 p-8 flex flex-col justify-center text-left">
          
          <div className="mb-1">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20 mb-3">
              Web Developer | Graphic Designer
            </span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">Hi, I am Asad Ullah</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Welcome to <strong>UroojX</strong>! (Lumina Academt) I am a passionate Web Developer and Intern at <strong>Encoder Bytes Pvt Ltd, Peshawar</strong>. 
            I built this E-Learning platform to share my knowledge of the MERN stack, Next.js, and modern design. 
            Lets build something amazing together.
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mb-8">
            {/* LinkedIn */}
            <a href="https://linkedin.com/in/asad-jn99" target="_blank" rel="noopener noreferrer" className="group">
              <div className="size-10 rounded-full bg-[#0077b5]/10 flex items-center justify-center group-hover:bg-[#0077b5] transition-all duration-300">
                <svg className="size-5 fill-[#0077b5] group-hover:fill-white" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              </div>
            </a>

            {/* GitHub */}
            <a href="https://github.com/asadjn99" target="_blank" rel="noopener noreferrer" className="group">
              <div className="size-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white transition-all duration-300">
                <svg className="size-5 fill-white group-hover:fill-black" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
            </a>

            {/* Portfolio / Web */}
            <a href="https://asadjn99.netlify.app" className="group">
              <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500 transition-all duration-300">
                <span className="material-symbols-outlined text-emerald-500 group-hover:text-white text-xl">language</span>
              </div>
            </a>
          </div>

          <button 
            onClick={handleClose}
            className="w-full cursor-pointer bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Start Learning
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>

        </div>
      </div>
    </div>
  );
}