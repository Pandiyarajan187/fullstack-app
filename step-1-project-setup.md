# Step 1 — Project Setup (Backend + Frontend + Git)

---

## 🎯 Objective

Set up a professional monorepo-style project structure with a Node/Express backend and a React frontend. Initialize Git with a proper `.gitignore`. Understand WHY the structure is designed this way.

---

## 🧠 Concepts

- **Monorepo vs Polyrepo**: Why keep frontend and backend in one repo vs separate repos?
- **Separation of concerns**: Why do we split `client/` and `server/`?
- **npm init vs create-react-app vs Vite**: What are the trade-offs?
- **Environment variables**: What is `.env` and why should it NEVER be committed to Git?
- **`.gitignore`**: What goes in it and why?
- **node_modules**: Why is it excluded from version control?
- **package.json**: What is it and what does each field mean?

---

## 🛠 Tasks

Work through these one at a time. Do NOT move to the next until the current is done.

### Task 1 — Root Project Setup
1. Create a root folder called `learning-mern-app` (already exists as your working directory)
2. Initialize a Git repository at the root level
3. Create a root-level `README.md` with a short project description
4. Create a root-level `.gitignore` — think carefully about what belongs here

### Task 2 — Backend Setup
1. Inside the root, create a `server/` folder
2. Navigate into it and initialize a new Node project
3. Install Express (just Express for now, nothing else)
4. Create an `index.js` entry file inside `server/src/`
5. Write the absolute minimum Express server — just enough to start and respond on a port
6. Add a `start` script to `server/package.json`
7. Test that it runs

### Task 3 — Frontend Setup
1. Inside the root, create a `client/` folder using Vite (React template)
   - Command hint: look up `npm create vite@latest`
2. Clean out the boilerplate — remove things you didn't write
3. Verify the dev server starts

### Task 4 — Git Discipline
1. Make your first commit from the root — message should be meaningful
2. Check `git status` — are any unwanted files tracked? (node_modules, .env?)
3. Confirm your `.gitignore` is working correctly

---

## ❓ Thinking Questions

Answer these IN YOUR HEAD (or write them down) before moving forward:

1. Why do we have two separate `package.json` files — one in `server/` and one in `client/`?
2. What happens if you commit `node_modules`? Why is that a problem?
3. What is the difference between `dependencies` and `devDependencies`?
4. Why do we use `src/` inside `server/` instead of putting files at the root of `server/`?
5. What is `port 5000` vs `port 3000`? Why do we typically use different ports?
6. What does `git init` actually create? What is the `.git` folder?

---

## ⚠️ Common Mistakes

- Putting `node_modules` into Git — always check `git status` before committing
- Having a flat structure — `index.js` at root of `server/` instead of `server/src/`
- Forgetting to add `.env` to `.gitignore` before creating one
- Using `console.log` to check port but never actually testing with a browser or curl
- Vague commit messages like "initial" or "setup done" — be specific

---

## 🧪 Mini Challenge

After your basic server is running on port 5000:

- Add a second route `/api/health` that returns `{ status: "ok", timestamp: <current date> }`
- Test it using your browser OR `curl http://localhost:5000/api/health`
- Think: why would a real production backend have a `/health` endpoint?

---

## 🔁 Revision Notes

| Concept | One-line Summary |
|---|---|
| Monorepo | One repo, multiple apps — easier to share code and manage |
| `.gitignore` | Tells Git which files/folders to never track |
| `node_modules` | Auto-generated — never commit, always reinstall via `npm install` |
| `package.json` | Project manifest — name, version, scripts, dependencies |
| Express | Minimal Node.js web framework — handles HTTP routing |
| Environment variables | Config that changes per environment (dev/prod) — stored in `.env` |

---

## ✅ Completion Check

You are done with Step 1 when:

- [ ] `server/` exists with a running Express app on port 5000
- [ ] `client/` exists with a running Vite React app on port 5173
- [ ] Root-level `.gitignore` excludes `node_modules`, `.env`, and build folders
- [ ] At least one meaningful Git commit exists
- [ ] `/api/health` returns a JSON response
- [ ] You can answer all 6 Thinking Questions out loud

---

## 🚀 Next Step Trigger

When you have completed everything above, say:

> **"Step 1 done. Ready for Step 2."**

And briefly tell me:
- What your folder structure looks like (describe it, don't paste it)
- What your `/api/health` returns
- One thing that confused you or surprised you
