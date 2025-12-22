"use client";

import Link from 'next/link';
import Image from 'next/image'; // Import Image component
import { useEffect, useState } from 'react';
import { createClient } from '@/src/utils/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.error("Error fetching session:", error);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    window.location.reload();
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Helper: Get classes for Desktop links
  const getLinkClass = (path: string) => {
    const base = "text-sm font-medium transition-colors";
    const active = "text-primary font-bold";
    const inactive = "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white";
    return `${base} ${pathname === path ? active : inactive}`;
  };

  // Helper: Get classes for Mobile links
  const getMobileLinkClass = (path: string) => {
    const base = "flex items-center gap-3 text-base font-medium transition-colors";
    const active = "text-primary font-bold bg-primary/5 rounded-lg px-2 py-1";
    const inactive = "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white";
    return `${base} ${pathname === path ? active : inactive}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-surface-highlight bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between gap-4 sm:gap-8">
          
          {/* LEFT: Logo */}
          <div className="flex items-center gap-2">
            <div className="size-8 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">school</span>
            </div>
            <Link href="/" className="text-sm lg:text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block">
              Lumina Academy
            </Link>
          </div>
          
          {/* CENTER: Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 dark:text-[#9ea2b7]">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                className="block w-full rounded-xl border-none bg-slate-100 dark:bg-surface-highlight py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-[#9ea2b7] focus:ring-2 focus:ring-primary outline-none"
                placeholder="Search for courses..."
                type="text"
              />
            </div>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/courses" className={getLinkClass('/courses')}>Courses</Link>
              <Link href="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
              <Link href="/verify" className={getLinkClass('/verify')}>Verify</Link>
              <Link href="/about" className={getLinkClass('/about')}>About</Link>
            </nav>
            
            {/* Mobile Search Icon */}
            <button className="md:hidden text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined text-[24px]">search</span>
            </button>

            {/* --- AUTH BUTTONS --- */}
            {loading ? (
               <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            ) : user ? (
              <div className="relative">
                {/* Profile Avatar */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative size-9 rounded-full overflow-hidden border border-slate-200 dark:border-[#3d4052] cursor-pointer hover:ring-2 hover:ring-primary transition-all focus:outline-none flex items-center justify-center bg-slate-100 dark:bg-slate-800"
                >
                  {user.user_metadata?.avatar_url ? (
                    // FIX: Replaced <img> with <Image />
                    <Image 
                      src={user.user_metadata.avatar_url} 
                      alt="Profile" 
                      fill // Adapts to parent container (size-9)
                      className="object-cover"
                      referrerPolicy="no-referrer"
                      unoptimized // Allows external URLs (Google/GitHub) without config
                    />
                  ) : (
                    <span className="text-xs font-bold text-primary">
                        {user.email?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown */}
                {isMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-surface-dark rounded-xl shadow-xl border border-slate-200 dark:border-surface-highlight py-2 z-20 animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-surface-highlight">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {user.user_metadata?.full_name || "Student"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="border-t border-slate-100 dark:border-surface-highlight py-1">
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                           <span className="material-symbols-outlined text-[18px]">dashboard</span>
                           Dashboard
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">logout</span>
                          Log Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth">
                    <button className="cursor-pointer hidden sm:block px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                    Log In
                    </button>
                </Link>
                <Link href="/auth">
                    <button className="cursor-pointer px-3 sm:px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors">
                    Join
                    </button>
                </Link>
              </div>
            )}

            {/* --- MOBILE HAMBURGER BUTTON --- */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-slate-600 dark:text-slate-300 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined text-[28px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>

          </div>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-surface-highlight bg-white dark:bg-background-dark animate-in slide-in-from-top-5 duration-200">
          <div className="px-4 py-6 space-y-4">
            
            {/* Mobile Links */}
            <nav className="flex flex-col space-y-4">
              <Link href="/courses" onClick={closeMobileMenu} className={getMobileLinkClass('/courses')}>
                <span className="material-symbols-outlined text-primary">school</span>
                Courses
              </Link>
              <Link href="/dashboard" onClick={closeMobileMenu} className={getMobileLinkClass('/dashboard')}>
                <span className="material-symbols-outlined text-primary">dashboard</span>
                Dashboard
              </Link>
              <Link href="/verify" onClick={closeMobileMenu} className={getMobileLinkClass('/verify')}>
                <span className="material-symbols-outlined text-primary">verified</span>
                Verify Certificate
              </Link>
              <Link href="/about" onClick={closeMobileMenu} className={getMobileLinkClass('/about')}>
                <span className="material-symbols-outlined text-primary">info</span>
                About Us
              </Link>
            </nav>

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="pt-4 border-t border-gray-200 dark:border-surface-highlight flex flex-col gap-3">
                <Link href="/auth" onClick={closeMobileMenu}>
                  <button className="w-full px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-white border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    Log In
                  </button>
                </Link>
                <Link href="/auth" onClick={closeMobileMenu}>
                  <button className="w-full px-4 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-xl transition-colors">
                    Join for Free
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}