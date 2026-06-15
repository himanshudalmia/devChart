import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    priority: {
        type: String,
        required: true,
        enum: ["low", "medium", "high"],
    },
    status: {
        type: String,
        required: true,
        enum: ["todo", "in-progress", "done"],
        default: "todo",
    },
    assignee: {
        type: String,
        default: "",
    },
    dueDate: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export default Task;
