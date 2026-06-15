"use client";

import Navbar from "@/components/Navbar";
import React, { useState, useEffect, useRef } from "react";

type Task = {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: "todo" | "in-progress" | "done";
  assignee: string;
  dueDate: string | null;
  createdAt: string;
};

type Column = {
  id: "todo" | "in-progress" | "done";
  label: string;
  accent: string;
  headerBg: string;
};

const COLUMNS: Column[] = [
  { id: "todo",        label: "To Do",       accent: "border-slate-400",   headerBg: "bg-slate-700" },
  { id: "in-progress", label: "In Progress",  accent: "border-amber-400",  headerBg: "bg-amber-600"  },
  { id: "done",        label: "Done",          accent: "border-emerald-400", headerBg: "bg-emerald-700" },
];

function priorityColor(p: string) {
  if (p === "high")   return "bg-red-400";
  if (p === "medium") return "bg-yellow-400";
  return "bg-green-400";
}

function priorityDot(p: string) {
  if (p === "high")   return "bg-red-500";
  if (p === "medium") return "bg-yellow-500";
  return "bg-green-500";
}

function formatDate(d: string | null) {
  if (!d) return null;
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function isOverdue(d: string | null) {
  if (!d) return false;
  return new Date(d) < new Date(new Date().setHours(0, 0, 0, 0));
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const dragTask = useRef<Task | null>(null);

  async function fetchTasks() {
    setLoading(true);
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setTasks(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { fetchTasks(); }, []);

  async function moveTask(taskId: string, newStatus: Task["status"]) {
    setTasks(prev =>
      prev.map(t => t._id === taskId ? { ...t, status: newStatus } : t)
    );
    await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
  }

  async function deleteTask(taskId: string) {
    if (!confirm("Delete this task?")) return;
    setTasks(prev => prev.filter(t => t._id !== taskId));
    await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
  }

  // Drag-and-drop handlers
  function onDragStart(task: Task) {
    dragTask.current = task;
    setDraggingId(task._id);
  }

  function onDragEnd() {
    setDraggingId(null);
    setDragOverCol(null);
    dragTask.current = null;
  }

  function onDrop(colId: Task["status"]) {
    if (dragTask.current && dragTask.current.status !== colId) {
      moveTask(dragTask.current._id, colId);
    }
    setDragOverCol(null);
  }

  const tasksByStatus = (status: Task["status"]) =>
    tasks.filter(t => t.status === status);

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ background: "bisque" }}>
        <div className="px-4 py-6">
          <h1 className="text-3xl font-bold text-black mb-1">Project Board</h1>
          <p className="text-sm text-gray-600 mb-6">
            Drag cards between columns or use the arrow buttons to move tasks.
          </p>

          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {COLUMNS.map(col => {
                const colTasks = tasksByStatus(col.id);
                const isOver = dragOverCol === col.id;
                return (
                  <div
                    key={col.id}
                    className={`rounded-2xl border-2 transition-all duration-150 ${col.accent} ${isOver ? "scale-[1.01] shadow-lg" : ""}`}
                    onDragOver={e => { e.preventDefault(); setDragOverCol(col.id); }}
                    onDragLeave={() => setDragOverCol(null)}
                    onDrop={() => onDrop(col.id)}
                  >
                    {/* Column header */}
                    <div className={`${col.headerBg} rounded-t-xl px-4 py-3 flex items-center justify-between`}>
                      <span className="text-white font-bold text-base">{col.label}</span>
                      <span className="bg-white bg-opacity-20 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        {colTasks.length}
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="p-3 flex flex-col gap-3 min-h-[200px]">
                      {colTasks.length === 0 && (
                        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm italic py-8">
                          Drop tasks here
                        </div>
                      )}
                      {colTasks.map(task => {
                        const overdue = isOverdue(task.dueDate);
                        const isDragging = draggingId === task._id;
                        return (
                          <div
                            key={task._id}
                            draggable
                            onDragStart={() => onDragStart(task)}
                            onDragEnd={onDragEnd}
                            className={`rounded-xl border border-black overflow-hidden cursor-grab active:cursor-grabbing transition-opacity ${isDragging ? "opacity-40" : "opacity-100"}`}
                          >
                            {/* Card top bar (priority color) */}
                            <div className={`${priorityColor(task.priority)} px-3 py-2 flex items-center justify-between gap-2`}>
                              <div className="flex items-center gap-2 min-w-0">
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${priorityDot(task.priority)}`} />
                                <h3 className="font-bold text-sm text-black truncate">{task.title}</h3>
                              </div>
                              <button
                                onClick={() => deleteTask(task._id)}
                                className="flex-shrink-0 text-black hover:text-red-700 text-lg leading-none"
                                title="Delete task"
                              >
                                ×
                              </button>
                            </div>

                            {/* Card body */}
                            <div className="bg-teal-50 px-3 py-2 space-y-2">
                              <p className="text-xs text-gray-700 break-words">{task.description}</p>

                              {/* Meta row */}
                              <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs">
                                {task.assignee && (
                                  <span className="flex items-center gap-1 text-gray-600">
                                    <span>👤</span>
                                    <span>{task.assignee}</span>
                                  </span>
                                )}
                                {task.dueDate && (
                                  <span className={`flex items-center gap-1 font-medium ${overdue ? "text-red-600" : "text-gray-600"}`}>
                                    <span>{overdue ? "⚠️" : "📅"}</span>
                                    <span>{formatDate(task.dueDate)}</span>
                                  </span>
                                )}
                              </div>

                              {/* Move buttons */}
                              <div className="flex gap-1 pt-1">
                                {col.id !== "todo" && (
                                  <button
                                    onClick={() => moveTask(task._id, col.id === "done" ? "in-progress" : "todo")}
                                    className="flex-1 text-xs bg-white border border-gray-300 hover:bg-gray-100 rounded-lg py-1 font-medium"
                                  >
                                    ← Back
                                  </button>
                                )}
                                {col.id !== "done" && (
                                  <button
                                    onClick={() => moveTask(task._id, col.id === "todo" ? "in-progress" : "done")}
                                    className="flex-1 text-xs bg-black text-teal-200 hover:bg-gray-800 rounded-lg py-1 font-medium"
                                  >
                                    Move →
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
