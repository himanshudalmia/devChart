import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center h-auto font-bold bg-black text-teal-200 px-5 py-3">
      <Link href="/" className="text-xl hover:opacity-80 transition-opacity">
        devChart
      </Link>
      <div className="flex gap-3">
        <Link href="/dashboard">
          <button className="rounded-lg py-1.5 px-4 bg-teal-200 text-black text-sm hover:bg-teal-300 transition-colors">
            Board
          </button>
        </Link>
        <Link href="/create-task">
          <button className="rounded-lg py-1.5 px-4 border border-teal-200 text-teal-200 text-sm hover:bg-teal-200 hover:text-black transition-colors">
            + New Task
          </button>
        </Link>
      </div>
    </nav>
  );
}
