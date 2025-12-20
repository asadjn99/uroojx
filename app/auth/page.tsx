"use client";

import React, { useState } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { createClient } from "@/src/utils/supabase/client"; // Import the client

export default function AuthPage() {
  const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("LOGIN");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient(); // Initialize Supabase

  // --- GOOGLE LOGIN LOGIC ---
  const handleSocialLogin = async (provider: "google" | "github") => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          // Redirects to your current domain after login
          redirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Auth error:", error.message);
        setIsLoading(false);
      }
      // If successful, Supabase handles the redirect automatically
    } catch (err) {
      console.error("Unexpected error:", err);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Placeholder for Email/Password logic
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4 py-12 relative overflow-hidden min-h-[calc(100vh-64px)] bg-background-dark">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="w-full max-w-110 z-10">
          <div className="bg-surface-dark border border-border-color rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl">
            
            <div className="px-6 sm:px-8 pt-8 pb-2 text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {variant === "LOGIN" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-slate-400 text-sm">
                {variant === "LOGIN" 
                  ? "Continue your learning journey today." 
                  : "Join thousands of developers learning together."}
              </p>
            </div>

            <div className="px-6 sm:px-8 mt-4">
              <div className="flex border-b border-slate-700 justify-between relative">
                <button onClick={() => setVariant("LOGIN")} className={`flex flex-col items-center justify-center pb-3 pt-2 flex-1 cursor-pointer transition-colors text-sm font-bold tracking-[0.015em] border-b-[2px] ${variant === "LOGIN" ? "border-primary text-white" : "border-transparent text-slate-500 hover:text-white"}`}>Sign In</button>
                <button onClick={() => setVariant("REGISTER")} className={`flex flex-col items-center justify-center pb-3 pt-2 flex-1 cursor-pointer transition-colors text-sm font-bold tracking-[0.015em] border-b-[2px] ${variant === "REGISTER" ? "border-primary text-white" : "border-transparent text-slate-500 hover:text-white"}`}>Sign Up</button>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-5">
              
              {/* Social Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => handleSocialLogin("google")}
                  className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#292c38] hover:bg-[#323644] text-white rounded-lg border border-slate-700 transition-all duration-200"
                >
                  <svg className="size-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
                    <path d="M3.15295 7.3455L6.4385 9.755C7.3275 7.554 9.4805 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.159 2 4.828 4.1685 3.15295 7.3455Z" fill="#FF3D00" />
                    <path d="M12 22C14.6605 22 17.0365 20.9325 18.8045 19.2095L15.697 16.738C14.665 17.5505 13.385 18 12 18C9.362 18 7.1275 16.3015 6.294 13.978L3.06903 16.4745C4.76453 19.8275 8.167 22 12 22Z" fill="#4CAF50" />
                    <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.257 15.108 16.5725 16.073 15.6975 16.738L18.805 19.2095C20.701 17.4475 21.861 14.9085 21.979 12.1965C21.9965 11.455 21.9365 10.7385 21.8055 10.0415Z" fill="#1976D2" />
                  </svg>
                  <span className="text-sm font-medium cursor-pointer">Google</span>
                </button>
                {/* GitHub Button (Optional) */}
                <button 
                  onClick={() => handleSocialLogin("github")}
                  className="flex-1 h-12 flex items-center justify-center gap-2 bg-[#292c38] hover:bg-[#323644] text-white rounded-lg border border-slate-700 transition-all duration-200"
                >
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21C9.5 20.77 9.5 20.14 9.5 19.31C6.73 19.91 6.14 17.98 6.14 17.98C5.68 16.82 5.03 16.32 5.03 16.32C4.13 15.7 5.1 15.71 5.1 15.71C6.1 15.78 6.63 16.74 6.63 16.74C7.5 18.22 8.92 17.79 9.49 17.55C9.58 16.92 9.83 16.49 10.11 16.25C7.9 16 5.58 15.15 5.58 11.37C5.58 10.29 5.97 9.42 6.61 8.74C6.51 8.49 6.16 7.48 6.7 6.13C6.7 6.13 7.53 5.86 9.42 7.15C10.21 6.93 11.05 6.82 11.89 6.82C12.73 6.82 13.57 6.93 14.36 7.15C16.25 5.86 17.08 6.13 17.08 6.13C17.62 7.48 17.28 8.49 17.18 8.74C17.82 9.42 18.21 10.29 18.21 11.37C18.21 15.16 15.88 16 13.66 16.24C14.01 16.54 14.32 17.14 14.32 18.06C14.32 19.37 14.31 20.43 14.31 20.99C14.31 21.26 14.47 21.59 14.98 21.49C18.94 20.16 21.81 16.42 21.81 12C21.81 6.477 17.333 2 12 2Z"></path>
                  </svg>
                  <span className="text-sm font-medium">GitHub</span>
                </button>
              </div>

              {/* ... (Divider and Form Inputs remain the same as your previous code) ... */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-700"></div>
                <span className="flex-shrink mx-4 text-xs font-semibold text-slate-500 uppercase">Or continue with email</span>
                <div className="flex-grow border-t border-slate-700"></div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {variant === "REGISTER" && (
                  <label className="flex flex-col gap-2">
                    <span className="text-white text-sm font-medium">Full Name</span>
                    <div className="flex items-center gap-3 bg-[#292c38] border border-slate-700 rounded-xl px-4 h-12 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                      <span className="material-symbols-outlined text-slate-500 text-[20px]">person</span>
                      <input required className="bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 w-full p-0 text-sm outline-none" placeholder="John Doe" type="text"/>
                    </div>
                  </label>
                )}
                <label className="flex flex-col gap-2">
                  <span className="text-white text-sm font-medium">Email Address</span>
                  <div className="flex items-center gap-3 bg-[#292c38] border border-slate-700 rounded-xl px-4 h-12 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                    <span className="material-symbols-outlined text-slate-500 text-[20px]">mail</span>
                    <input required className="bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 w-full p-0 text-sm outline-none" placeholder="Enter your email" type="email"/>
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-sm font-medium">Password</span>
                    {variant === "LOGIN" && <a className="text-xs text-primary font-medium hover:text-primary/80" href="#">Forgot Password?</a>}
                  </div>
                  <div className="flex items-center gap-3 bg-[#292c38] border border-slate-700 rounded-xl px-4 h-12 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                    <span className="material-symbols-outlined text-slate-500 text-[20px]">lock</span>
                    <input required className="bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 w-full p-0 text-sm outline-none" placeholder="Enter your password" type="password"/>
                  </div>
                </label>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 rounded-xl transition-colors mt-2 text-sm tracking-[0.015em] flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  {isLoading ? "Processing..." : (variant === "LOGIN" ? "Sign In" : "Create Account")}
                  {!isLoading && <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                </button>
              </form>
              <p className="text-xs text-slate-500 text-center mt-2">
                By signing in, you agree to our <a className="text-white hover:underline" href="#">Terms of Service</a> and <a className="text-white hover:underline" href="#">Privacy Policy</a>.
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center items-center gap-2 text-slate-500 text-sm">
            <span className="material-symbols-outlined text-[16px] text-emerald-500">verified_user</span>
            <p>Secure SSL Encryption</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}