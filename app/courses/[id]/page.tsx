"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Certificate from "@/src/components/Certificate";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"; 
import { createClient } from "@/src/utils/supabase/client";
import YouTube, { YouTubeProps } from 'react-youtube';

// --- MOCK DATABASE ---
const coursesDB = [
  // ID 1: Web Development
  {
    id: 1,
    title: "Mastering Web Development: From Zero to Hero",
    subtitle: "Become a top-tier developer with this comprehensive guide to HTML5, CSS3, JS and modern frontend best practices.",
    rating: 4.8,
    reviews: "1,245",
    students: "500,000+",
    lastUpdated: "08/2023",
    language: "Urdu",
    price: 12.99,
    originalPrice: 0.0,
    discount: "100% off",
    initialVideoId: "dQw4w9WgXcQ", 
    instructor: {
      name: "The Developer",
      role: "Lead Instructor at App Brewery",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      courses: 12,
      students: "500,000+",
      bio: "I'm Asad Ullah, I'm a developer with a passion for building modern websites."
    },
    learningPoints: ["HTML/CSS", "React", "Next.js", "Tailwind CSS"],
    curriculum: [
      {
        title: "Introduction to React",
        lectures: 3,
        time: "14m",
        items: [
          { title: "What is React?", time: "04:20", type: "video", videoId: "N3AkSS5hXMA" },
          { title: "Setting up the Environment", time: "05:45", type: "video", videoId: "w7ejDZ8SWv8" },
          { title: "Course Resources", time: "04:15", type: "file", videoId: "SqcY0GlETPk" }
        ]
      }
    ]
  },
  // ID 2: Graphic Design
  {
    id: 2, 
    title: "Adobe Illustrator Training Course (Urdu/Hindi)",
    subtitle: "Complete Adobe Illustrator training from beginner to advanced level by GFX Mentor.",
    rating: 4.9,
    reviews: "55k+",
    students: "2.3M+",
    lastUpdated: "12/2024",
    language: "Urdu",
    price: 0.00,
    originalPrice: 199.99,
    discount: "Free on YouTube",
    initialVideoId: "vd1vRpoWC3M", 
    instructor: {
      name: "Imran Ali Dina",
      role: "GFX Mentor",
      image: "https://yt3.googleusercontent.com/ytc/AIdro_m41t-j0CWsK_FQ5G5UjF76iXjXy0X9_J9_X9_X=s176-c-k-c0x00ffffff-no-rj", 
      courses: 44,
      students: "2.5M+",
      bio: "Imran Ali Dina is a renowned graphic design mentor from Pakistan."
    },
    learningPoints: ["Selection Tools", "Pen Tool", "Shape Builder", "Logo Design"],
    curriculum: [
      {
        title: "Getting Started & Basic Tools",
        lectures: 5,
        time: "1h 15m",
        items: [
          { title: "Class 1 - Selection Tool", time: "12:45", type: "video", videoId: "vd1vRpoWC3M" },
          { title: "Class 2 - Direct Selection Tool", time: "10:30", type: "video", videoId: "lW6dvZOOXlo" },
          { title: "Class 3 - Pen Tool", time: "15:20", type: "video", videoId: "xRUxEqD2D5c" },
          { title: "Class 4 - Pen Tool & Shape Builder", time: "18:10", type: "video", videoId: "ksZ8iMexlC8" },
          { title: "Class 5 - All About Strokes", time: "14:50", type: "video", videoId: "6t-J7Ur8uRo" }
        ]
      }
    ]
  }
];

export default function CourseDetail() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  
  // State
  const [course, setCourse] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [activeVideo, setActiveVideo] = useState<string>("");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Progress State
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [showMarkCompleteBtn, setShowMarkCompleteBtn] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  
  const playerRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initialize Data
  useEffect(() => {
    const init = async () => {
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

  // --- DB FUNCTIONS ---

  const checkEnrollment = async (courseId: number, currentUser: any) => {
    const { data } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', currentUser.id)
      .eq('course_id', courseId)
      .single();
    
    if (data) {
      setIsEnrolled(true);
      // RECOVER PROGRESS FROM DB
      setCompletedLessonIds(data.completed_lesson_ids || []);
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
    }
    setEnrolling(false);
  };

  const markLessonComplete = async () => {
    if (!activeVideo || completedLessonIds.includes(activeVideo)) return;

    // Update Local State
    const newCompleted = [...completedLessonIds, activeVideo];
    setCompletedLessonIds(newCompleted);
    setShowMarkCompleteBtn(false);

    // Calculate Progress
    const totalVideos = course.curriculum.reduce((acc: number, sec: any) => acc + sec.items.length, 0);
    const progressPercent = Math.round((newCompleted.length / totalVideos) * 100);

    // SAVE TO DB
    if (user) {
      await supabase
        .from('enrollments')
        .update({ 
          completed_lesson_ids: newCompleted,
          progress: progressPercent
        })
        .eq('user_id', user.id)
        .eq('course_id', course.id);
    }
  };

  // --- PLAYER LOGIC ---
  const onPlayerStateChange = (event: any) => {
    // 1 = Playing
    if (event.data === 1 && isEnrolled && !completedLessonIds.includes(activeVideo)) {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (event.target.getCurrentTime() > 3) { // 3 Seconds Threshold
          setShowMarkCompleteBtn(true);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, 1000);
    }
  };

  // --- CALCULATIONS ---
  const totalVideos = course ? course.curriculum.reduce((acc: number, sec: any) => acc + sec.items.length, 0) : 0;
  const progressPercentage = totalVideos > 0 ? Math.round((completedLessonIds.length / totalVideos) * 100) : 0;
  const isCourseCompleted = progressPercentage === 100;

  if (loading) return <div className="min-h-screen bg-background-dark text-white flex items-center justify-center">Loading...</div>;
  if (!course) return <div className="min-h-screen bg-background-dark text-white flex items-center justify-center">Course not found</div>;

  return (
    <>
      <Navbar />
      {showCertificate && (
        <Certificate 
          studentName={user?.user_metadata?.full_name || "Student"}
          courseName={course.title}
          instructor={course.instructor.name}
          date={new Date().toLocaleDateString()}
          onClose={() => setShowCertificate(false)}
        />
      )}

      <main className="flex-grow min-h-screen bg-background-dark text-slate-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-8 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <span className="text-primary font-medium text-sm">Development / {course.title}</span>
                <h1 className="text-4xl font-bold text-white">{course.title}</h1>
                <p className="text-slate-400">{course.subtitle}</p>
              </div>

              {/* Progress Under Video (Mobile/Tablet view mostly, but visible here too) */}
              {isEnrolled && (
                <div className="bg-surface-dark p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-bold text-sm">Course Progress</span>
                        <span className="text-primary font-bold text-sm">{progressPercentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>
              )}

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
                          <div key={idx} onClick={() => isEnrolled && setActiveVideo(item.videoId)}
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
                    <YouTube videoId={activeVideo} opts={{ width: '100%', height: '100%', playerVars: { autoplay: 0 } }} onStateChange={onPlayerStateChange} className="w-full h-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <span className="material-symbols-outlined text-4xl">lock</span>
                    </div>
                  )}
                </div>

                {/* ENROLL / STATUS CARD */}
                <div className="bg-surface-dark border border-slate-800 p-6 rounded-xl shadow-lg">
                  {isEnrolled ? (
                    <div className="space-y-4">
                      {/* Dashboard Button */}
                      <Link href="/dashboard">
                        <button className="w-full py-2 mb-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold transition-colors">
                            Go to Dashboard
                        </button>
                      </Link>

                      {/* Mark Complete Action */}
                      {completedLessonIds.includes(activeVideo) ? (
                           <div className="w-full py-2 bg-emerald-500/20 text-emerald-500 text-center rounded-lg font-bold text-sm">
                              Lesson Completed
                           </div>
                      ) : showMarkCompleteBtn ? (
                          <button onClick={markLessonComplete} className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-sm animate-pulse">
                              Mark as Completed
                          </button>
                      ) : (
                          <div className="text-center text-xs text-slate-500">Watch 3s to mark complete</div>
                      )}

                      {/* Certificate Button - Always Visible */}
                      <button 
                        disabled={!isCourseCompleted}
                        onClick={() => setShowCertificate(true)}
                        className={`w-full py-3 mt-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all
                          ${isCourseCompleted 
                            ? "bg-amber-500 hover:bg-amber-400 text-white shadow-lg cursor-pointer"
                            : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                          }`}
                      >
                        <span className="material-symbols-outlined">workspace_premium</span>
                        {isCourseCompleted ? "Download Certificate" : "Certificate Locked"}
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                        <span className="text-3xl font-bold text-white">{course.price === 0 ? "Free" : `$${course.price}`}</span>
                        <button onClick={handleEnroll} disabled={enrolling} className="w-full h-12 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-all">
                            {enrolling ? "Enrolling..." : "Enroll Now"}
                        </button>
                        <p className="text-xs text-center text-slate-500">Full Lifetime Access</p>
                    </div>
                  )}
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