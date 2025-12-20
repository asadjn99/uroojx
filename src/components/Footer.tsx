import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-[#292c38] bg-white dark:bg-[#111217] mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="size-8 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">school</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Lumina Academy
              </span>
            </div>
            <p className="text-slate-500 dark:text-[#9ea2b7] text-sm max-w-xs leading-relaxed">
              Empowering learners worldwide to master new skills and achieve their career goals through high-quality online education.
            </p>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">public</span></Link>
              <Link href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">alternate_email</span></Link>
              <Link href="#" className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">rss_feed</span></Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Company</h4>
            <Link href="#" className="text-sm text-slate-500 dark:text-[#9ea2b7] hover:text-primary dark:hover:text-white transition-colors">About Us</Link>
            <Link href="#" className="text-sm text-slate-500 dark:text-[#9ea2b7] hover:text-primary dark:hover:text-white transition-colors">Careers</Link>
            <Link href="#" className="text-sm text-slate-500 dark:text-[#9ea2b7] hover:text-primary dark:hover:text-white transition-colors">Blog</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Community</h4>
            <Link href="#" className="text-sm text-slate-500 dark:text-[#9ea2b7] hover:text-primary dark:hover:text-white transition-colors">Team Plans</Link>
            <Link href="#" className="text-sm text-slate-500 dark:text-[#9ea2b7] hover:text-primary dark:hover:text-white transition-colors">Refer a Friend</Link>
            <Link href="#" className="text-sm text-slate-500 dark:text-[#9ea2b7] hover:text-primary dark:hover:text-white transition-colors">Scholarships</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-slate-900 dark:text-white mb-2">Support</h4>
            <Link href="#" className="text-sm text-slate-500 dark:text-[#9ea2b7] hover:text-primary dark:hover:text-white transition-colors">Help Center</Link>
            <Link href="#" className="text-sm text-slate-500 dark:text-[#9ea2b7] hover:text-primary dark:hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="text-sm text-slate-500 dark:text-[#9ea2b7] hover:text-primary dark:hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 dark:border-[#292c38] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400 dark:text-[#9ea2b7]">© 2024 Lumina Academy, Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-400 dark:text-[#9ea2b7] flex items-center gap-1 cursor-pointer hover:text-white">
              <span className="material-symbols-outlined text-sm">language</span> English
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}