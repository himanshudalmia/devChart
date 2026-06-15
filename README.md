# devChart — Club Collaboration Platform

A Kanban-style project management platform built for student clubs to collaborate, track tasks, and ship work together.

---

## Features Implemented

### Core (Required)
- **Kanban Board** — Three-column board (To Do → In Progress → Done) on the dashboard
- **Drag-and-drop** — Drag task cards between columns to update their status
- **Move buttons** — "← Back" and "Move →" buttons on each card for non-drag interaction

### Additional Features
1. **Task Deletion** — Delete any task directly from the board with the × button
2. **Due Dates** — Set an optional deadline when creating a task; overdue tasks are highlighted with ⚠️
3. **Assignees** — Assign a task to a team member by name; shown on each card with a 👤 icon

---

## Technology Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Framework  | Next.js 16 (App Router)       |
| Language   | TypeScript                    |
| Database   | MongoDB Atlas via Mongoose    |
| Styling    | Tailwind CSS v4               |
| Deployment | Vercel                        |

---

## Setup Instructions

### Prerequisites
- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)

### 1. Fork & Clone

```bash
git clone https://github.com/<your-username>/devChart.git
cd devChart
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```

Replace the URI with your own MongoDB Atlas connection string.

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment Instructions (Vercel)

1. Push your fork to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repo.
3. Add the `MONGODB_URI` environment variable in the Vercel project settings.
4. Click **Deploy**.

Vercel auto-detects Next.js and handles the build. Your app will be live at `https://<project>.vercel.app`.

---

## API Routes

| Method | Route                  | Description             |
|--------|------------------------|-------------------------|
| GET    | `/api/tasks`           | Fetch all tasks         |
| POST   | `/api/tasks`           | Create a new task       |
| PATCH  | `/api/tasks/[id]`      | Update task fields      |
| DELETE | `/api/tasks/[id]`      | Delete a task           |

---

## Known Limitations

- **No authentication** — anyone with the URL can view, create, or delete tasks.
- **No real-time sync** — changes by one user are not pushed to others; a page refresh is needed.
- **Single project** — the board shows all tasks in one shared view with no project/team separation.
- **Text-only assignees** — assignee is a plain string, not linked to a user account.

---

## Project Structure

```
src/
├── app/
│   ├── api/tasks/
│   │   ├── route.ts          # GET, POST
│   │   └── [id]/route.ts     # PATCH, DELETE
│   ├── dashboard/page.tsx    # Kanban board
│   ├── create-task/page.tsx  # New task form
│   └── page.tsx              # Landing page
├── components/
│   └── Navbar.tsx
├── lib/
│   └── mongodb.ts
└── models/
    └── Tasks.ts
```
