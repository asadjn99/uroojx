"use client";

import React, { useState, useMemo } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Link from "next/link";

// --- MOCK DATA (Only 2 Courses) ---
const coursesData = [
  {
    id: 1,
    title: "Mastering Web Development: From Zero to Hero",
    instructor: "The Developer",
    rating: 4.8,
    reviews: 1200,
    price: 0.0,
    originalPrice: 12.99,
    category: "Development",
    level: "Beginner",
    duration: "24h 15m",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    badgeColor: "bg-emerald-500",
    icon: "code",
  },
  {
    id: 4,
    title: "course For Testing..",
    instructor: "Asad Ullah",
    rating: 4.8,
    reviews: 1200,
    price: 0.0,
    originalPrice: 12.99,
    category: "Development",
    level: "Beginner-Inter",
    duration: "24h 15m",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    badgeColor: "bg-emerald-500",
    icon: "code",
  },
  {
    id: 2,
    title: "Graphic Design Masterclass: Photoshop, Illustrator & Figma",
    instructor: "Sarah Jenkins",
    rating: 4.9,
    reviews: 850,
    price: 0.0,
    originalPrice: 99.99,
    category: "Design",
    level: "Beginner",
    duration: "12h 30m",
    image: "/images/gd.webp",
    icon: "brush",
  },
];

export default function CourseCatalog() {
  // --- STATE MANAGEMENT ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [priceRange, setPriceRange] = useState<number>(150);
  const [sortBy, setSortBy] = useState("Most Popular");

  // --- HANDLERS ---
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level);
  };

  // --- FILTER & SORT LOGIC ---
  const filteredAndSortedCourses = useMemo(() => {
    // 1. Filter
    const result = coursesData.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(course.category);
      const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
      const matchesPrice = course.price <= priceRange;

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
    });

    // 2. Sort
    return result.sort((a, b) => {
      if (sortBy === "Newest") return b.id - a.id;
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      // Default: Most Popular (Rating)
      return b.rating - a.rating;
    });

  }, [searchQuery, selectedCategories, selectedLevel, priceRange, sortBy]);

  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col md:flex-row max-w-[1600px] mx-auto w-full px-4 md:px-6 lg:px-8 py-6 gap-8 min-h-screen">
        
        {/* --- SIDEBAR FILTERS --- */}
        <aside className="w-full md:w-1/4 lg:w-70 flex-shrink-0 flex flex-col gap-6">
          <div className="flex items-center justify-between md:hidden pb-4 border-b border-slate-200 dark:border-[#292c38]">
            <h2 className="text-xl font-bold dark:text-white">Filters</h2>
            <button className="p-2 text-primary"><span className="material-symbols-outlined">filter_list</span></button>
          </div>

          <div className="hidden md:flex flex-col gap-6 sticky top-24">
            <h1 className="text-slate-900 dark:text-white tracking-light text-[24px] font-bold leading-tight">Filters</h1>

            {/* Search */}
            <div className="flex flex-col gap-3">
               <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Search</h3>
               <div className="relative">
                 <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
                    <span className="material-symbols-outlined text-[18px]">search</span>
                 </span>
                 <input 
                    type="text" placeholder="Title, Instructor..." 
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-white dark:bg-[#111217] border border-slate-200 dark:border-[#3d4052] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
            </div>
            <div className="h-px bg-slate-200 dark:bg-[#292c38] w-full"></div>

            {/* Category */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Category</h3>
              <div className="flex flex-col gap-1">
                {["Design", "Development"].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 py-2 cursor-pointer group">
                    <input checked={selectedCategories.includes(cat)} onChange={() => toggleCategory(cat)} className="h-5 w-5 rounded border-slate-300 dark:border-[#3d4052] bg-white dark:bg-transparent text-primary focus:ring-primary/20 dark:focus:ring-offset-[#111217]" type="checkbox"/>
                    <span className={`text-sm font-medium transition-colors ${selectedCategories.includes(cat) ? 'text-primary' : 'text-slate-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-white'}`}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="h-px bg-slate-200 dark:bg-[#292c38] w-full"></div>

            {/* Level */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Level</h3>
              <div className="flex flex-col gap-2">
                {["All", "Beginner", "Intermediate", "Expert"].map((level) => (
                  <label key={level} className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all ${selectedLevel === level ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-slate-200 dark:border-[#3d4052] hover:bg-slate-50 dark:hover:bg-[#1e212b]'}`}>
                    <input checked={selectedLevel === level} onChange={() => handleLevelChange(level)} className="h-4 w-4 border-slate-300 dark:border-[#3d4052] bg-transparent text-primary focus:ring-primary/20 dark:focus:ring-offset-[#111217]" name="level" type="radio"/>
                    <span className={`text-sm font-medium ${selectedLevel === level ? 'text-primary' : 'text-slate-700 dark:text-white'}`}>{level}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="h-px bg-slate-200 dark:bg-[#292c38] w-full"></div>

            {/* Price */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Max Price: ${priceRange}</h3>
              <input type="range" min="0" max="150" step="5" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full h-2 bg-slate-200 dark:bg-[#3d4052] rounded-lg appearance-none cursor-pointer accent-primary"/>
              <div className="flex justify-between items-center text-sm font-medium text-slate-600 dark:text-slate-300"><span>Free</span><span>$150+</span></div>
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <section className="flex-1 min-w-0">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Course Catalog</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Showing {filteredAndSortedCourses.length} courses</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline">Sort by:</span>
                <div className="relative">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none bg-white dark:bg-[#292c38] border border-slate-200 dark:border-[#3d4052] text-slate-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 pr-8 cursor-pointer outline-none shadow-sm">
                    <option>Most Popular</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500 dark:text-white"><span className="material-symbols-outlined text-[20px]">expand_more</span></div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredAndSortedCourses.map((course) => (
                <Link href={`/courses/${course.id}`} key={course.id} className="cursor-pointer">
                  <div className="group flex flex-col bg-white dark:bg-[#1e212b] rounded-xl overflow-hidden border border-slate-200 dark:border-[#292c38] hover:shadow-xl hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      {course.badge && (
                        <div className={`absolute top-3 left-3 z-10 ${course.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide`}>{course.badge}</div>
                      )}
                      <img alt={course.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src={course.image} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white text-slate-900 rounded-full p-3 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <span className="material-symbols-outlined text-[28px]">play_arrow</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 p-5 gap-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">{course.icon}</span> {course.category}</span>
                        <span>{course.duration}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-light">By <span className="text-slate-700 dark:text-slate-300 font-normal">{course.instructor}</span></p>
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-amber-400 font-bold text-sm">{course.rating}</span>
                        <div className="flex text-amber-400">
                          {[1, 2, 3, 4, 5].map((star) => (<span key={star} className="material-symbols-outlined text-[18px] fill-current">{star <= Math.round(course.rating) ? 'star' : 'star_border'}</span>))}
                        </div>
                        <span className="text-xs text-slate-400 dark:text-slate-500">({course.reviews})</span>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#292c38]">
                        <div className="flex flex-col leading-none">
                          <span className="text-xl font-bold text-slate-900 dark:text-white">${course.price}</span>
                          {course.originalPrice > 0 && <span className="text-xs text-slate-400 line-through decoration-slate-400">${course.originalPrice}</span>}
                        </div>
                        <button className="flex items-center justify-center h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors shadow-sm">View Course</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}