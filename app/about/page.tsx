import React from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F1117] text-slate-300 selection:bg-primary selection:text-white">
        
        {/* --- HERO SECTION --- */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] opacity-50 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold tracking-wide mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              OUR STORY
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
              Empowering the Next <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
                Generation of Developers
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              UroojX is more than just an e-learning platform. It is a movement to bridge the gap between traditional education and modern industry demands.
            </p>
          </div>
        </section>

        {/* --- MISSION & VISION GRID --- */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#1c1e26] border border-slate-800 p-8 rounded-2xl hover:border-primary/50 transition-colors group">
              <div className="size-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                <span className="material-symbols-outlined text-3xl text-blue-400">rocket_launch</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-slate-400 leading-relaxed">
                To provide high-quality, accessible, and practical tech education in Urdu & Hindi, enabling students to build real-world careers.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#1c1e26] border border-slate-800 p-8 rounded-2xl hover:border-primary/50 transition-colors group">
              <div className="size-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-3xl text-primary">lightbulb</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-slate-400 leading-relaxed">
                A world where financial barriers never stop anyone from mastering the art of coding and design.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1c1e26] border border-slate-800 p-8 rounded-2xl hover:border-primary/50 transition-colors group">
              <div className="size-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                <span className="material-symbols-outlined text-3xl text-emerald-400">groups</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community First</h3>
              <p className="text-slate-400 leading-relaxed">
                Building a supportive ecosystem where learners help learners, fostering growth through collaboration.
              </p>
            </div>
          </div>
        </section>

        {/* --- MEET THE FOUNDER --- */}
        <section className="bg-[#16181d] border-y border-slate-800 py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-6"></div>
                <div className="absolute inset-0 bg-white/5 rounded-2xl transform -rotate-3 transition-transform group-hover:-rotate-6"></div>
                <div className="relative aspect-4/5 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                  {/* Replace with your actual image URL */}
                  <Image 
                    src="/images/asad.jpg" 
                    alt="Asad Ullah" 
                    width={"100"}
                    height={"100"}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2">
                <h4 className="text-primary font-bold tracking-widest uppercase mb-2">Meet the Founder 😆</h4>
                <h2 className="text-4xl font-black text-white mb-6">Asad Ullah </h2>
                {/* <span className="font-light text-slate-500">(asadjn99)</span> */}
                
                <div className="space-y-6 text-lg text-slate-400">
                  <p>
                    Hello! I am a passionate <strong>Intermediate Web Developer</strong> and <strong>Graphic Designer</strong> based in Pakistan. 
                    Currently, I am honing my skills as an intern at <strong>Encoder Bytes Private Limited</strong>, Peshawar.
                  </p>
                  <p>
                    My journey started with a curiosity for how things work on the web. That curiosity turned into obsession, leading me to master the 
                    <strong> MERN Stack</strong>. I have built projects like <em>Medifit</em>, <em>FoodLink</em>, <em>Delish Cafe</em>, <em>Finance Flow</em>, <em>Zentro - E-commerce</em>, <em>Pakhtunkhwa Tourism hub</em>, and now, <em>UroojX</em>.
                  </p>
                  <p>
                    I have created UroojX (Lumina Academy) because I believe quality education should be accessible. I want to share everything I have learned to help you skip the mistakes I made.
                  </p>
                </div>

                {/* Social Stats / Links */}
                <div className="flex items-center gap-6 mt-8 pt-8 border-t border-slate-800">
                  <a href="https://github.com/asadjn99" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">code</span>
                    <span className="font-bold">GitHub</span>
                  </a>
                  <a href="https://linkedin.com/in/asad-jn99" target="_blank" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                    <span className="material-symbols-outlined">work</span>
                    <span className="font-bold">LinkedIn</span>
                  </a>
                  <a href="mailto:asadjn99@yahoo.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">mail</span>
                    <span className="font-bold">Contact Me</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="py-20 border-b border-slate-800 bg-[#0F1117]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-black text-white">5k+</h3>
                <p className="text-sm uppercase tracking-widest text-slate-500 font-bold">Students Enrolled</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-black text-white">12+</h3>
                <p className="text-sm uppercase tracking-widest text-slate-500 font-bold">Courses</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-black text-white">4.8</h3>
                <p className="text-sm uppercase tracking-widest text-slate-500 font-bold">Average Rating</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl md:text-5xl font-black text-white">24/7</h3>
                <p className="text-sm uppercase tracking-widest text-slate-500 font-bold">Community Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of students learning to code, design, and create. Your future in tech starts with a single click.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/courses">
                <button className=" cursor-pointer px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 w-full sm:w-auto">
                  Explore Courses
                </button>
              </Link>
              <Link href="/auth">
                <button className=" cursor-pointer px-8 py-4 bg-[#1c1e26] text-white border border-slate-700 font-bold rounded-xl hover:bg-slate-800 transition-all w-full sm:w-auto">
                  Join for Free
                </button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}