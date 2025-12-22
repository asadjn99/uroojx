import Navbar from "@/src/components/Navbar"; // Check if your folder is 'src/components' or just 'components'
import Footer from "@/src/components/Footer";
import Link from "next/link";
import WelcomePopup from "@/src/components/WelcomePopup";

export default function Home() {
  return (
    <>
    <WelcomePopup />
      <Navbar />
      {/* FIX: Added 'flex-col' to stack sections vertically and fixed max-w syntax */}
      <main className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* --- HERO SECTION --- */}
        <section className="relative">
          <div className="flex flex-col-reverse lg:flex-row gap-10 items-center">
            {/* Text Content */}
            <div className="flex-1 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start w-full">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                Master New Skills <br className="hidden lg:block" />{" "}
                <span className="text-primary">Reach Your Potential</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Join millions of learners worldwide. Access over 10,000 courses taught by expert instructors and advance your career today.
              </p>
              {/* Search Component */}
              <div className="w-full max-w-lg mt-2">
                <label className="relative flex items-center h-14 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500 dark:text-[#9ea2b7]">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="w-full h-full pl-12 pr-28 rounded-xl bg-white dark:bg-surface-highlight border border-slate-200 dark:border-transparent text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder-[#9ea2b7] focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                    placeholder="What do you want to learn today?"
                  />
                  <div className="absolute right-2 top-2 bottom-2">
                    <button className="h-full px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-colors flex items-center justify-center">
                      Search
                    </button>
                  </div>
                </label>
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mt-2">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400 py-1">Trending:</span>
                {['Python', 'UX Design', 'Marketing', 'Business'].map((tag) => (
                  <Link key={tag} href="#" className="px-3 py-1 rounded-full bg-slate-100 dark:bg-surface-highlight text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-primary/10 hover:text-primary dark:hover:text-white transition-colors">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
            {/* Hero Image */}
            <div className="flex-1 w-full max-w-lg lg:max-w-full">
              <div
                className="aspect-4/3 rounded-2xl bg-slate-200 dark:bg-surface-highlight bg-center bg-cover shadow-2xl overflow-hidden relative group"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80')" }}
              >
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section>
          <div className="flex flex-col gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Why Choose Lumina</h2>
            <p className="text-slate-600 dark:text-slate-400">We provide the best learning experience for students worldwide.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group p-6 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#3d4052] hover:border-primary/50 transition-all hover:shadow-lg dark:hover:shadow-primary/5">
              <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">school</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Expert Instructors</h3>
              <p className="text-sm text-slate-600 dark:text-[#9ea2b7] leading-relaxed">
                Learn directly from industry veterans and experts who are passionate about sharing their knowledge.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="group p-6 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#3d4052] hover:border-primary/50 transition-all hover:shadow-lg dark:hover:shadow-primary/5">
              <div className="size-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">all_inclusive</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Lifetime Access</h3>
              <p className="text-sm text-slate-600 dark:text-[#9ea2b7] leading-relaxed">
                Purchase once and enjoy unlimited access to your course materials, updates, and resources forever.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="group p-6 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-[#3d4052] hover:border-primary/50 transition-all hover:shadow-lg dark:hover:shadow-primary/5">
              <div className="size-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Certification</h3>
              <p className="text-sm text-slate-600 dark:text-[#9ea2b7] leading-relaxed">
                Earn recognized certificates upon completion to showcase your new skills on LinkedIn and your resume.
              </p>
            </div>
          </div>
        </section>

        {/* --- POPULAR COURSES SECTION --- */}
        <section className="overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Popular Courses</h2>
            <Link href="/courses" className="text-primary font-medium hover:underline flex items-center gap-1">
              View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          {/* Horizontal Scroll Container */}
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide">
            {/* Course 1 */}
            <Link href="/courses/1">
            <div className="min-w-70 md:min-w-[320px] snap-start bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-[#3d4052] hover:shadow-xl transition-all group cursor-pointer flex flex-col h-full">
              <div className="aspect-video bg-slate-200 dark:bg-surface-highlight bg-center bg-cover relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80')" }}>
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-2 py-1 rounded text-slate-900 dark:text-white">Development</div>
              </div>
              <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <span className="material-symbols-outlined text-sm filled">star</span> 4.8 <span className="text-slate-400 font-normal">(1.2k)</span>
                  </div>
                  <span className="text-primary font-bold">$19.99</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">Complete Web Development</h3>
                <p className="text-sm text-slate-500 dark:text-[#9ea2b7] mt-auto">By Sarah Jenkins</p>
              </div>
            </div>
            </Link>

            {/* Course 2 */}
            <Link href="/courses/2">
            <div className="min-w-70 md:min-w-[320px] snap-start bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-[#3d4052] hover:shadow-xl transition-all group cursor-pointer flex flex-col h-full">
              <div className="aspect-video bg-slate-200 dark:bg-surface-highlight bg-center bg-cover relative" style={{ backgroundImage: "url('/images/gd.webp')" }}>
                 <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-2 py-1 rounded text-slate-900 dark:text-white">Graphic Design</div>
              </div>
              <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <span className="material-symbols-outlined text-sm filled">star</span> 4.9 <span className="text-slate-400 font-normal">(3.5k)</span>
                  </div>
                  <span className="text-primary font-bold">$24.99</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">Complete Graphic Design Course</h3>
                <p className="text-sm text-slate-500 dark:text-[#9ea2b7] mt-auto">By Imran Ali Dina</p>
              </div>
            </div>
            </Link>

            {/* Course 3 */}
            <Link href="/courses/4">
            <div className="min-w-70 md:min-w-[320px] snap-start bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-slate-200 dark:border-[#3d4052] hover:shadow-xl transition-all group cursor-pointer flex flex-col h-full">
              <div className="aspect-video bg-slate-200 dark:bg-surface-highlight bg-center bg-cover relative" style={{ backgroundImage: "url('/images/gd.webp')" }}>
                 <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur text-xs font-bold px-2 py-1 rounded text-slate-900 dark:text-white">Graphic Design</div>
              </div>
              <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <span className="material-symbols-outlined text-sm filled">star</span> 4.9 <span className="text-slate-400 font-normal">(3.5k)</span>
                  </div>
                  <span className="text-primary font-bold">$24.99</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">Course for testing...</h3>
                <p className="text-sm text-slate-500 dark:text-[#9ea2b7] mt-auto">By Imran Ali Dina</p>
              </div>
            </div>
            </Link>

            
          </div>
        </section>

        {/* --- TESTIMONIALS SECTION --- */}
        <section>
          <div className="flex flex-col gap-4 mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">What Our Learners Say</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Discover how Lumina Academy is helping people around the world change their lives.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-highlight border border-slate-100 dark:border-transparent">
              <div className="text-primary mb-4">
                <span className="material-symbols-outlined text-4xl">format_quote</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">The web design course was a game-changer for me. I was able to build my portfolio and land my first junior designer job within 3 months.</p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80')" }}></div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Elena Rodriguez</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Junior UX Designer</p>
                </div>
              </div>
            </div>
             {/* Review 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-highlight border border-slate-100 dark:border-transparent">
              <div className="text-primary mb-4">
                <span className="material-symbols-outlined text-4xl">format_quote</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">I have always wanted to learn Python but found it intimidating. The instructors here explain complex concepts in such a simple way.</p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80')" }}></div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Michael Chang</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Data Analyst</p>
                </div>
              </div>
            </div>
             {/* Review 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-surface-highlight border border-slate-100 dark:border-transparent">
              <div className="text-primary mb-4">
                <span className="material-symbols-outlined text-4xl">format_quote</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">Lumina Academy gave me the confidence to start my own business. The marketing courses are top-notch and very practical.</p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-slate-200 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80')" }}></div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Sarah Johnson</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Entrepreneur</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA BANNER --- */}
        <section className="rounded-3xl bg-primary relative overflow-hidden px-6 py-12 md:py-16 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute -top-20 -left-20 size-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 size-64 bg-black/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-white">Start Teaching Today</h2>
            <p className="text-blue-100 text-lg">Become an instructor and change lives — including your own. Share your knowledge with millions of students.</p>
          </div>
          <div className="relative z-10 shrink-0">
            <button className="bg-white text-primary hover:bg-slate-100 font-bold py-4 px-8 rounded-xl transition-transform hover:-translate-y-1 shadow-lg shadow-black/20 flex items-center gap-2">
              Become an Instructor
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}