"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/src/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      // 1. Check for an existing session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error fetching session:", error);
      }

      if (session?.user) {
        console.log("✅ Logged In User:", session.user.email);
        console.log("🖼️ Avatar URL:", session.user.user_metadata.avatar_url);
        setUser(session.user);
      } else {
        console.log("❌ No active session found.");
        setUser(null);
      }
      setLoading(false);
    };

    getUser();

    // 2. Listen for real-time auth changes (Login, Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 Auth Event:", event);
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
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
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-[#292c38] bg-white/80 dark:bg-[#111217]/80 backdrop-blur-md">
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto">
        <div className="flex h-16 items-center justify-between gap-8">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="size-8 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">school</span>
            </div>
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block">
              Lumina Academy
            </Link>
          </div>
          
          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500 dark:text-[#9ea2b7]">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                className="block w-full rounded-xl border-none bg-slate-100 dark:bg-[#292c38] py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-[#9ea2b7] focus:ring-2 focus:ring-primary outline-none"
                placeholder="Search for courses..."
                type="text"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/courses" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors">Courses</Link>
              <Link href="/dashboard" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors">Dashboard</Link>
              <Link href="/verify" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors">Verify</Link>
              <Link href="#" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-white transition-colors">Community</Link>
            </nav>
            
            <button className="md:hidden text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined">search</span>
            </button>

            {/* --- AUTH LOGIC --- */}
            {loading ? (
               // Loading Skeleton
               <div className="size-9 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            ) : user ? (
              <div className="relative">
                {/* Profile Avatar Trigger */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="relative size-9 rounded-full overflow-hidden border border-slate-200 dark:border-[#3d4052] cursor-pointer hover:ring-2 hover:ring-primary transition-all focus:outline-none flex items-center justify-center bg-slate-100 dark:bg-slate-800"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer" // Fixes some Google Image 403 errors
                    />
                  ) : (
                    <span className="text-xs font-bold text-primary">
                        {user.email?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1c1e26] rounded-xl shadow-xl border border-slate-200 dark:border-[#292c38] py-2 z-20">
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-[#292c38]">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {user.user_metadata?.full_name || "Student"}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      <div className="border-t border-slate-100 dark:border-[#292c38] py-1">
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
              // Logged Out State
              <div className="flex items-center gap-2">
                <Link href="/auth">
                    <button className="hidden sm:block px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors">
                    Log In
                    </button>
                </Link>
                <Link href="/auth">
                    <button className="px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors">
                    Join for Free
                    </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}