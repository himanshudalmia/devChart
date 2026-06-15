import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ background: "bisque", minHeight: "100vh" }}>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <img src="/logo.svg" alt="devChart logo" className="w-40 h-auto mb-6" />
        <h1 className="text-7xl font-bold text-teal-200 text-outline-black mb-4">
          devChart
        </h1>
        <p className="text-xl font-medium text-black max-w-md mb-8">
          A Kanban-style collaboration platform for student clubs. Track tasks, assign work, and ship together.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/dashboard">
            <button className="rounded-xl px-6 py-3 bg-black text-teal-200 font-bold hover:bg-gray-800 transition-colors">
              Open Board →
            </button>
          </Link>
          <Link href="/create-task">
            <button className="rounded-xl px-6 py-3 border-2 border-black text-black font-bold hover:bg-black hover:text-teal-200 transition-colors">
              + New Task
            </button>
          </Link>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 max-w-2xl w-full text-left">
          {[
            { icon: "🗂️", title: "Kanban Board", desc: "Visualise work across To Do, In Progress, and Done." },
            { icon: "📅", title: "Due Dates", desc: "Set deadlines and get overdue warnings at a glance." },
            { icon: "👤", title: "Assignees", desc: "Assign tasks to team members and track ownership." },
          ].map(f => (
            <div key={f.title} className="bg-white bg-opacity-60 rounded-2xl p-4 border border-gray-200">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-bold text-black mb-1">{f.title}</div>
              <div className="text-sm text-gray-600">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
