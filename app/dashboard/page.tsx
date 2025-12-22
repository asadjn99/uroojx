import { createClient } from "@/src/utils/supabase/server";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import Link from "next/link";
import { redirect } from "next/navigation";

// Re-using your mock data to "map" IDs to real content
// In a real app, this data would also live in Supabase
const coursesDB = [
  {
    id: 1,
    title: "Mastering Web Development: From Zero to Hero",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    instructor: "Asad Ullah",
    totalLessons: 3 // Updated to match your curriculum
  },
  {
    id: 2,
    title: "Complete Graphic Design (Urdu/Hindi)",
    image: "https://images.unsplash.com/photo-1626785774573-4b799314347d?auto=format&fit=crop&w=800&q=80",
    instructor: "Imran Ali Dina",
    totalLessons: 10 // Updated to match your curriculum
  },
  {
    id: 3,
    title: "For Testing...1",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    instructor: "Asad Ullah",
    totalLessons: 10 // Updated to match your curriculum
  },
  {
    id: 4,
    title: "For Testing...2",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    instructor: "Asad Ullah",
    totalLessons: 10 // Updated to match your curriculum
  },
  {
    id: 5,
    title: "For Testing...3",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    instructor: "Asad Ullah",
    totalLessons: 10 // Updated to match your curriculum
  }
];

export default async function Dashboard() {
  const supabase = await createClient();

  // 1. Check Auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth");
  }

  // 2. Fetch Enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*')
    .eq('user_id', user.id);

  // 3. Merge Database Data with Course Content
  const myCourses = enrollments?.map((enrollment) => {
    const courseDetails = coursesDB.find(c => c.id === Number(enrollment.course_id)); // Ensure ID types match
    
    // Calculate accurate progress if array exists
    const completedCount = enrollment.completed_lesson_ids?.length || 0;
    
    return {
      ...enrollment,
      ...courseDetails,
      completedCount // Pass this for display
    };
  }) || [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-dark text-slate-300 py-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">My Learning</h1>
              <p className="text-slate-400 mt-1">Welcome back, {user.user_metadata.full_name || "Student"}</p>
            </div>
          </div>

          {myCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map((course) => (
                <div key={course.id} className="bg-surface-dark border border-slate-800 rounded-xl overflow-hidden hover:border-primary/50 transition-colors group flex flex-col h-full">
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/courses/${course.id}`} className="bg-primary text-white px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all">
                            Continue Learning
                        </Link>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-white text-lg line-clamp-1 mb-1">{course.title}</h3>
                    <p className="text-sm text-slate-500 mb-4">{course.instructor}</p>
                    
                    {/* Progress Bar */}
                    <div className="mt-auto space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>{course.progress || 0}% Complete</span>
                            <span>{course.completedCount}/{course.totalLessons} Lessons</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${course.progress || 0}%` }}></div>
                        </div>

                        {/* Certificate Button (Only if 100%) */}
                        {course.progress === 100 && (
                          <Link href={`/courses/${course.id}`}>
                            <button className="w-full mt-3 py-2 rounded-lg bg-amber-500/10 border cursor-pointer border-amber-500/30 text-amber-500 text-xs font-bold hover:bg-amber-500/20 transition-colors flex items-center justify-center gap-2">
                              <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
                              Download Certificate
                            </button>
                          </Link>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-20 border border-dashed border-slate-800 rounded-2xl bg-surface-dark/50">
                <div className="size-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                    <span className="material-symbols-outlined text-3xl">school</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No courses yet</h3>
                <p className="text-slate-400 max-w-sm text-center mb-6">You haven not enrolled in any courses yet. Explore our catalog to get started.</p>
                <Link href="/courses" className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-colors">
                    Browse Courses
                </Link>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}