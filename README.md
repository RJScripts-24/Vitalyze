

**Use GitHub Codespaces**

 # Vitalyze 

Vitalyze is a health-tech web application that offers predictive screening for multiple diseases (for example: diabetes and heart disease). It combines an interactive React + TypeScript frontend with a Node.js/Express backend and MongoDB for persistent storage. The app aims to provide early detection, reporting, and actionable insights to patients and care providers.

---

## Key goals

- Detect and score risks for common chronic conditions using pre-trained ML models.
- Make screening accessible and sharable (PDF/export) for clinicians and patients.
- Provide a secure, privacy-focused platform that integrates with standard clinical workflows.

## Tech stack

- Frontend: React 18, TypeScript, Vite, Tailwind CSS, Radix UI primitives, Lucide icons
- Backend: Node.js, Express, JWT authentication, Multer (file uploads), Mongoose (MongoDB client)
- Database: MongoDB (local or Atlas)
- Machine Learning: scikit-learn models persisted as `.joblib` files; Python scripts for training/evaluation in `backend/model/`

## What the project does (practical use cases)

- Population screening: Run bulk or batch predictions to identify high-risk patients in a population.
- Clinic triage: Quickly surface patients who may require immediate follow-up.
- Remote patient monitoring: Allow patients to generate risk reports remotely and share with clinicians.
- Resource prioritization: Hospitals and clinics can use aggregated risk insights to allocate resources efficiently.

## Repository layout (high level)

- `src/` — Frontend
	- `components/` — UI components (Hero, Navigation, Cards, Modals)
	- `pages/` — Page components (Index, Dashboard, PatientScreening, Reports, Profile)
	- `lib/`, `hooks/` — utilities and data helpers

- `backend/` — Backend application
	- `index.js` — Express app entry
	- `routes/` — API endpoints (`auth`, `predict`, `profile` etc.)
	- `model/` — ML artifacts, Python scripts, wrappers
	- `config/` — DB & cloudinary configuration

## Running locally (Windows PowerShell)

1) Clone the repository and install dependencies

```powershell
git clone https://github.com/RJScripts-24/Vitalyze.git
cd Vitalyze
npm install
cd backend
npm install
cd ..
```

2) Setup environment variables

Create `backend/.env` (you can copy from an example if present) and set the values:

- `MONGO_URI` — MongoDB connection string (e.g. `mongodb://localhost:27017/vitalyze`)


3) Start backend

```powershell
# from repo root
npm --prefix backend run dev
```

4) Start frontend

```powershell
npm run dev
```

Open the local Vite URL that prints in the terminal (commonly `http://localhost:8080`). The backend will typically run on `http://localhost:5000` or as configured in `backend/index.js`.

## Running the ML models

- The models are stored as `.joblib` files in `backend/model/`. To retrain or update models run the Python scripts in the same folder. Ensure you have a compatible Python version and the required packages installed in a virtual environment.

## Deployment notes

- Frontend: Build with `npm run build` and deploy the `dist/` to Netlify, Vercel, or any static host.
- Backend: Deploy as a Node.js app (Heroku, DigitalOcean App Platform, or containerize with Docker). Ensure a MongoDB instance is available (Atlas recommended for production).

## Security and privacy

- Use HTTPS in production.
- Keep  DB credentials out of source control (use environment variables).
- Consider additional data governance for storing health-related data; anonymize or encrypt as appropriate.

## Developer commands

- `npm run dev` — run frontend dev server (Vite)
- `npm --prefix backend run dev` — run backend with nodemon
- `npx tsc --noEmit` — typecheck frontend code
- `npm run lint` — run linter

## Contributing

- Fork the repo, create a feature branch, and open a PR with a clear description.

## Contact

- Author: Rishabh Kumar Jha
- GitHub: https://github.com/RJScripts-24/Vitalyze



