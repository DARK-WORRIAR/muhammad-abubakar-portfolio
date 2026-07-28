# Muhammad Abubakar — Portfolio

A cinematic, 3D-animated portfolio site built from your resume.

- **Frontend:** React (Vite) + Tailwind CSS v4 + Three.js (via react-three-fiber) + Framer Motion
- **Backend:** Python (Flask) — powers the contact form, stores messages in SQLite, and can optionally forward an email notification

## What's inside

```
portfolio/
├── src/
│   ├── components/   Nav, Hero (3D scene), About, Stack, Experience,
│   │                 Projects, Education, Contact, Footer
│   └── data.js        All resume content lives here — edit this file
│                       to update text without touching component code
├── public/profile.jpg
└── backend/
    ├── app.py          Flask API (POST /api/contact, GET /api/health)
    └── requirements.txt
```

## Run the frontend

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. The 3D hero animation assembles a
layered "build pipeline" on load — it represents your full-lifecycle
ownership from design through mobile/web through deployment.

To point the contact form at a deployed backend instead of localhost,
create a `.env` file in the project root:

```
VITE_API_URL=https://your-backend-url.com
```

## Run the backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Runs at `http://localhost:5000`. Messages submitted through the contact
form are saved to `backend/messages.db` (SQLite, created automatically).

### Optional: email notifications

Set these environment variables before running `app.py` to also get an
email whenever someone submits the form (works with Gmail App Passwords,
SendGrid SMTP, etc.):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_TO_EMAIL=bscs1495@gmail.com
```

If these aren't set, the form still works — messages are just saved to
the database without the email step.

## Editing content

Everything from your resume (summary, skills, experience, projects,
education, certifications, languages) lives in `src/data.js`. Update
that file and the whole site updates — no need to touch any component.

Two things worth double-checking before you publish:

1. **Safex Solutions internship dates** — currently set to
   "June 2026 — Present" based on what you told me. Update
   `src/data.js` → `experience` if the end date changes.
2. **Deploying** — the frontend can go on Vercel/Netlify/GitHub Pages
   like your other projects. The Flask backend needs a host that runs
   Python (Render, Railway, Fly.io, PythonAnywhere) — remember to set
   `ALLOWED_ORIGINS` on the backend and `VITE_API_URL` on the frontend
   to match wherever each one ends up living.
