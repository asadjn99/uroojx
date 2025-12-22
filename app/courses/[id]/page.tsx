"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Certificate from "@/src/components/Certificate";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; 
import { createClient } from "@/src/utils/supabase/client";
import YouTube, { YouTubeProps } from 'react-youtube';
import Confetti from 'react-confetti'; 

// --- MOCK DATABASE ---
const coursesDB = [
  // ID 1: Web Development (Coming Soon)
  {
    id: 1,
    title: "Mastering Web Development: From Zero to Hero",
    subtitle: "🚀 COMING SOON! Join the waitlist for the ultimate full-stack web development bootcamp.",
    rating: 4.8,
    reviews: "1,245",
    students: "5,000+",
    lastUpdated: "Coming Soon",
    language: "Urdu",
    price: 0.0,
    originalPrice: 0.0,
    discount: "Coming Soon",
    initialVideoId: "dQw4w9WgXcQ", 
    instructor: {
      name: "The Developer",
      role: "Lead Instructor",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      courses: 12,
      students: "5,00+",
      bio: "I'm Asad Ullah, I'm a developer with a passion for building modern websites."
    },
    learningPoints: ["HTML/CSS (Coming Soon)", "React (Coming Soon)", "Next.js (Coming Soon)", "Backend (Coming Soon)"],
    curriculum: [
      {
        title: "Course Overview",
        lectures: 1,
        time: "5m",
        items: [
          { title: "Course Trailer & Roadmap", time: "05:00", type: "video", videoId: "dQw4w9WgXcQ" }
        ]
      }
    ]
  },
  
  // ID 2: Graphic Design (Full Course)
  {
    id: 2,
    title: "Graphic Design Masterclass: Photoshop, Illustrator & Figma",
    subtitle: "Complete Adobe Graphic Design course from beginner to advanced level by GFX Mentor.",
    rating: 4.9,
    reviews: "55k+",
    students: "3.8M+",
    lastUpdated: "12/2024",
    language: "Urdu",
    price: 0.0,
    originalPrice: 0.0,
    discount: "100% off",
    initialVideoId: "vd1vRpoWC3M",
    instructor: {
      name: "Imran Ali Dina",
      role: "Graphic Mentor",
      image: "https://yt3.googleusercontent.com/ytc/AIdro_m41t-j0CWsK_FQ5G5UjF76iXjXy0X9_J9_X9_X=s176-c-k-c0x00ffffff-no-rj",
      courses: 44,
      students: "3.8M+",
      bio: "Imran Ali Dina is a renowned graphic design mentor from Pakistan."
    },
    learningPoints: [
      "Selection Tools", "Pen Tool", "Shape Builder", "Logo Design",
      "Gradients", "Transform Tools", "Pathfinder", "Typography"
    ],
    curriculum: [
      {
        title: "Getting Started & Basic Tools",
        lectures: 10,
        time: "5h 43m",
        items: [
          { title: "Class 1 - Selection Tool", time: "22:23", type: "video", videoId: "vd1vRpoWC3M" },
          { title: "Class 2 - Direct Selection Tool", time: "28:18", type: "video", videoId: "lW6dvZOOXlo" },
          { title: "Class 3 - Pen Tool", time: "34:22", type: "video", videoId: "xRUxEqD2D5c" },
          { title: "Class 4 - Pen Tool & Shape Builder", time: "24:10", type: "video", videoId: "ksZ8iMexlC8" },
          { title: "Class 5 - All About Strokes", time: "25:50", type: "video", videoId: "6t-J7Ur8uRo" },
          { title: "Class 6 - Rotate Tool", time: "38:57", type: "video", videoId: "_HUutj5QjXc" },
          { title: "Class 7 - Gradients", time: "50:34", type: "video", videoId: "SrNq5ipQ5YM" },
          { title: "Class 8 - Scale & Shear", time: "24:00", type: "video", videoId: "VZwN1-sbQN0" },
          { title: "Class 9 - Pathfinder Tool", time: "44:38", type: "video", videoId: "HRDbin0AQz4" },
          { title: "Class 10 - Type Tool (Part 1)", time: "30:53", type: "video", videoId: "ko3UQvNroJ4" }
        ]
      }
    ]
  },

  {
    id: 3,
    title: "Testing-Course",
    subtitle: "COMING SOON! Join the waitlist for the ultimate full-stack web development bootcamp.",
    rating: 4.8,
    reviews: "1,245",
    students: "5,00+",
    lastUpdated: "Coming Soon",
    language: "Urdu",
    price: 0.0,
    originalPrice: 0.0,
    discount: "Coming Soon",
    initialVideoId: "abuwl4nc2c8",
    instructor: {
      name: "Asad Ullah",
      role: "Lead Instructor",
      image: "/images/sir.png",
      courses: 12,
      students: "5,00+",
      bio: "I'm Asad Ullah, I'm a developer with a passion for building modern websites."
    },
    learningPoints: ["HTML/CSS (Coming Soon)", "React (Coming Soon)", "Next.js (Coming Soon)", "Backend (Coming Soon)"],
    curriculum: [
      {
        title: "Course Overview",
        lectures: 1,
        time: "00:19",
        items: [
          { title: "Course  & Roadmap", time: "00:19", type: "video", videoId: "abuwl4nc2c8" }
        ]
      }
    ]
  },

  // {
  //   id: 4,
  //   title: "Course for testing",
  //   subtitle: "🚀 COMING SOON! Join the waitlist for the ultimate full-stack web development bootcamp.",
  //   rating: 4.8,
  //   reviews: "1,245",
  //   students: "5,000+",
  //   lastUpdated: "Coming Soon",
  //   language: "Urdu",
  //   price: 0.0,
  //   originalPrice: 0.0,
  //   discount: "Coming Soon",
  //   initialVideoId: "lW6dvZOOXlo",
  //   instructor: {
  //     name: "Asad Ullah",
  //     role: "Lead Instructor",
  //     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  //     courses: 12,
  //     students: "5,00+",
  //     bio: "I'm Asad Ullah, I'm a developer with a passion for building modern websites."
  //   },
  //   learningPoints: ["HTML/CSS (Coming Soon)", "React (Coming Soon)", "Next.js (Coming Soon)", "Backend (Coming Soon)"],
  //   curriculum: [
  //     {
  //       title: "Course Overview",
  //       lectures: 1,
  //       time: "32m",
  //       items: [
  //         { title: "Course  & Roadmap", time: "032:00", type: "video", videoId: "lW6dvZOOXlo" }
  //       ]
  //     }
  //   ]
  // }
];

export default function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  
  // --- STATE ---
  const [course, setCourse] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [activeVideo, setActiveVideo] = useState<string>("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Progress Logic
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [showMarkCompleteBtn, setShowMarkCompleteBtn] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  
  // Celebration State 🥳
  const [showCelebration, setShowCelebration] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [certificateId, setCertificateId] = useState<string>("");
  
  const playerRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to generate ID
  const generateCertificateId = () => {
    return 'LUM-' + Math.random().toString(36).substr(2, 4).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
  };

  // 1. Initialize
  useEffect(() => {
    const init = async () => {
      if (typeof window !== 'undefined') {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      }

      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (params?.id) {
        const foundCourse = coursesDB.find((c) => c.id.toString() === params.id);
        if (foundCourse) {
          setCourse(foundCourse);
          setActiveVideo(foundCourse.initialVideoId);
          if (user) await checkEnrollment(foundCourse.id, user);
        }
      }
      setLoading(false);
    };
    init();
  }, [params]);

  // 2. Clear timer on video change
  useEffect(() => {
    setShowMarkCompleteBtn(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [activeVideo]);

  // --- NAVIGATION HELPERS ---
  const allLessons = course?.curriculum.flatMap((section: any) => section.items) || [];
  const currentLessonIndex = allLessons.findIndex((item: any) => item.videoId === activeVideo);
  const prevLesson = allLessons[currentLessonIndex - 1];
  const nextLesson = allLessons[currentLessonIndex + 1];

  const handleNextLesson = () => {
    if (nextLesson) setActiveVideo(nextLesson.videoId);
  };

  const handlePrevLesson = () => {
    if (prevLesson) setActiveVideo(prevLesson.videoId);
  };

  // --- DATABASE HELPERS ---

  const checkEnrollment = async (courseId: number, currentUser: any) => {
    const { data } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', currentUser.id)
      .eq('course_id', courseId)
      .single();
    
    if (data) {
      setIsEnrolled(true);
      setCompletedLessonIds(data.completed_lesson_ids || []);
      
      // ✅ FIX: Ensure ID is generated if progress is 100% but ID is missing
      if (data.certificate_id) {
        setCertificateId(data.certificate_id);
      } else if (data.progress === 100) {
         // Generate & Save ID automatically for legacy completions
         const newId = generateCertificateId();
         setCertificateId(newId);
         await supabase
           .from('enrollments')
           .update({ certificate_id: newId })
           .eq('id', data.id); // Update by Primary Key
      }
    }
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    if (!user) {
      router.push(`/auth?next=/courses/${course.id}`);
      return;
    }

    const { error } = await supabase
      .from('enrollments')
      .insert([{ user_id: user.id, course_id: course.id, progress: 0, completed_lesson_ids: [] }]);

    if (!error || error.code === '23505') {
      setIsEnrolled(true);
      await checkEnrollment(course.id, user);
    } else {
      alert("Error enrolling: " + error.message);
    }
    setEnrolling(false);
  };

  const markLessonComplete = async () => {
    if (!activeVideo || completedLessonIds.includes(activeVideo)) return;

    const newCompleted = [...completedLessonIds, activeVideo];
    setCompletedLessonIds(newCompleted);
    setShowMarkCompleteBtn(false);

    const totalVideos = course.curriculum.reduce((acc: number, sec: any) => acc + sec.items.length, 0);
    const progressPercent = Math.round((newCompleted.length / totalVideos) * 100);

    if (user) {
      const updates: any = { 
        completed_lesson_ids: newCompleted,
        progress: progressPercent
      };

      // Generate Certificate ID if 100% and doesn't exist yet
      if (progressPercent === 100 && !certificateId) {
        const newId = generateCertificateId();
        updates.certificate_id = newId;
        setCertificateId(newId);
        triggerCelebration();
      }

      await supabase
        .from('enrollments')
        .update(updates)
        .eq('user_id', user.id)
        .eq('course_id', course.id);
    }
  };

  const triggerCelebration = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 8000);
  };

  // --- PLAYER LOGIC ---
  const onPlayerStateChange = (event: any) => {
    if (event.data === 1 && isEnrolled && !completedLessonIds.includes(activeVideo)) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (event.target.getCurrentTime() > 3) { 
          setShowMarkCompleteBtn(true);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, 1000);
    }
  };

  // --- RENDER ---
  const totalVideos = course ? course.curriculum.reduce((acc: number, sec: any) => acc + sec.items.length, 0) : 0;
  const progressPercentage = totalVideos > 0 ? Math.round((completedLessonIds.length / totalVideos) * 100) : 0;
  const isCourseCompleted = progressPercentage === 100;

  const handleLessonClick = (videoId: string) => {
    if (isEnrolled) {
      setActiveVideo(videoId);
    } else {
      alert("Please enroll in the course to unlock this lesson.");
    }
  };

  if (loading) return <div className="min-h-screen bg-background-dark text-white flex items-center justify-center">Loading...</div>;
  if (!course) return <div className="min-h-screen bg-background-dark text-white flex items-center justify-center">Course not found</div>;

  return (
    <>
      <Navbar />
      
      {showCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti width={windowSize.width} height={windowSize.height} recycle={true} numberOfPieces={500} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-surface-dark border-2 border-primary/50 p-8 rounded-2xl shadow-2xl text-center transform animate-bounce duration-1000 pointer-events-auto">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-3xl font-bold text-white mb-2">Congratulations!</h2>
              <p className="text-slate-400 mb-6">You have successfully completed the course.</p>
              <button 
                onClick={() => { setShowCelebration(false); setShowCertificate(true); }}
                className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                Claim Your Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {showCertificate && (
        <Certificate 
          studentName={user?.user_metadata?.full_name || "Student"}
          courseName={course.title}
          instructor={course.instructor.name}
          date={new Date().toLocaleDateString()}
          certificateId={certificateId || "Loading..."} 
          onClose={() => setShowCertificate(false)}
        />
      )}

      <main className="grow min-h-screen bg-background-dark text-slate-300">
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-8 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 text-sm">
                  <Link className="text-primary font-medium hover:underline" href="/courses">Courses</Link>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-400">{course.title}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                  {course.title}
                </h1>
                <p className="text-lg text-slate-400 max-w-2xl">{course.subtitle}</p>
                <div className="flex items-center gap-4 text-sm text-slate-400 pt-2">
                  <span className="bg-[#facc15] text-black font-bold px-2 py-0.5 rounded text-xs">Bestseller</span>
                  <span>({course.reviews} ratings)</span>
                  <span>{course.students} students</span>
                </div>
              </div>

              {/* Curriculum */}
              <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Course Content</h2>
                    <span className="text-sm text-slate-400">{completedLessonIds.length} / {totalVideos} Completed</span>
                </div>
                <div className="border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800 bg-surface-dark">
                  {course.curriculum.map((section: any, index: number) => (
                    <details key={index} className="group" open={index === 0}>
                      <summary className="flex justify-between items-center p-4 bg-[#232630] cursor-pointer hover:bg-[#2a2d39]">
                        <span className="font-bold text-white">{section.title}</span>
                        <span className="text-sm text-slate-400">{section.items.length} lectures</span>
                      </summary>
                      <div className="px-4 py-2 space-y-2">
                        {section.items.map((item: any, idx: number) => (
                          <div key={idx} onClick={() => item.videoId && handleLessonClick(item.videoId)}
                            className={`flex justify-between p-3 rounded-lg cursor-pointer ${activeVideo === item.videoId ? "bg-primary/20 border border-primary/50" : "hover:bg-slate-800"}`}>
                            <div className="flex items-center gap-3">
                              <span className={`material-symbols-outlined text-[20px] ${completedLessonIds.includes(item.videoId) ? "text-emerald-500" : "text-slate-400"}`}>
                                {completedLessonIds.includes(item.videoId) ? 'check_circle' : (isEnrolled ? 'play_circle' : 'lock')}
                              </span>
                              <span className="text-white">{item.title}</span>
                            </div>
                            <span className="text-slate-500">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-4 relative">
              <div className="sticky top-24 space-y-4">
                
                {/* VIDEO PLAYER */}
                <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-slate-800">
                  {isEnrolled || activeVideo === course.initialVideoId ? (
                    <YouTube 
                      videoId={activeVideo} 
                      opts={{ width: '100%', height: '100%', playerVars: { autoplay: 0 } }} 
                      onStateChange={onPlayerStateChange} 
                      className="w-full h-full" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <span className="material-symbols-outlined text-4xl">lock</span>
                    </div>
                  )}
                </div>

                {/* --- NAVIGATION BUTTONS --- */}
                {isEnrolled && (
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={handlePrevLesson}
                      disabled={!prevLesson}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg bg-surface-dark border border-slate-700 hover:border-primary/50 text-slate-300 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-sm">arrow_back</span>
                      Previous
                    </button>
                    <button 
                      onClick={handleNextLesson}
                      disabled={!nextLesson}
                      className="flex items-center justify-center gap-2 py-2 rounded-lg bg-surface-dark border border-slate-700 hover:border-primary/50 text-slate-300 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                )}

                {/* PROGRESS CARD */}
                <div className="bg-surface-dark border border-slate-800 p-6 rounded-xl shadow-lg">
                  {isEnrolled ? (
                    <div className="space-y-4">
                      <Link href="/dashboard" className="block w-full text-center text-xs font-medium text-slate-400 hover:text-white mb-2">← Go to Dashboard</Link>
                      
                      <div className="flex justify-between items-center">
                          <span className="text-white font-bold text-sm">Progress</span>
                          <span className="text-primary font-bold text-sm">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-primary h-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                      </div>
                      
                      {/* Actions */}
                      {completedLessonIds.includes(activeVideo) ? (
                           <button disabled className="w-full py-2 rounded-lg bg-emerald-500/20 text-emerald-500 font-bold text-sm flex items-center justify-center gap-2 cursor-default"><span className="material-symbols-outlined text-[18px]">check</span>Completed</button>
                      ) : showMarkCompleteBtn ? (
                          <button onClick={markLessonComplete} className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-sm animate-pulse">Mark as Completed</button>
                      ) : (
                          <div className="text-center text-xs text-slate-500 py-1">Watch 3s to mark complete</div>
                      )}

                      <button 
                        disabled={!isCourseCompleted}
                        onClick={() => setShowCertificate(true)}
                        className={`w-full py-3 mt-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all border ${isCourseCompleted ? "bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-lg cursor-pointer border-transparent" : "bg-transparent border-slate-700 text-slate-500 cursor-not-allowed opacity-50"}`}
                      >
                        <span className="material-symbols-outlined">workspace_premium</span>
                        {isCourseCompleted ? "Download Certificate" : "Certificate Locked"}
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                        <span className="text-3xl font-bold text-white">{course.price === 0 ? "Free" : `$${course.price}`}</span>
                        <button onClick={handleEnroll} disabled={enrolling} className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg cursor-pointer hover:bg-primary/90 transition-all">{enrolling ? "Enrolling..." : "Enroll Now"}</button>
                    </div>
                  )}
                </div>

                {/* Course Includes */}
                <div className="border border-slate-800 bg-surface-dark rounded-xl p-6">
                    <p className="text-white text-sm font-bold mb-4">This course includes:</p>
                    <div className="flex flex-col gap-3 text-sm text-slate-400">
                        <div className="flex gap-3 items-center"><span className="material-symbols-outlined text-[20px]">ondemand_video</span>{totalVideos} video lessons</div>
                        <div className="flex gap-3 items-center"><span className="material-symbols-outlined text-[20px]">description</span>Project files & resources</div>
                        <div className="flex gap-3 items-center"><span className="material-symbols-outlined text-[20px]">all_inclusive</span>Full lifetime access</div>
                        <div className="flex gap-3 items-center"><span className="material-symbols-outlined text-[20px]">devices</span>Access on mobile and TV</div>
                        <div className="flex gap-3 items-center"><span className="material-symbols-outlined text-[20px]">workspace_premium</span>Certificate of completion</div>
                    </div>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}