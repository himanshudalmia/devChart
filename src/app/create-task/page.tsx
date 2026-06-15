"use client";

import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateTask = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          priority,
          status: "todo",
          assignee,
          dueDate: dueDate || null,
        }),
      });

      if (!response.ok) throw new Error("Failed to create task");

      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full p-3 bg-white rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black";

  return (
    <div style={{ background: "bisque", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-black mb-1">New Task</h1>
        <p className="text-gray-600 mb-6 text-sm">Fill in the details below to add a task to the board.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Task name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="e.g. Design the login page"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Description <span className="text-red-500">*</span></label>
            <textarea
              placeholder="What needs to be done?"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
              rows={3}
              className={inputClass}
            />
          </div>

          {/* Priority + Assignee side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className={inputClass}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1">Assignee</label>
              <input
                type="text"
                placeholder="Team member name"
                value={assignee}
                onChange={e => setAssignee(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-semibold text-black mb-1">Due date <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full p-3 bg-black text-teal-200 font-bold rounded-xl hover:bg-gray-800 disabled:opacity-60 transition-colors"
          >
            {submitting ? "Creating…" : "Create Task →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
