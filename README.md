# 🎮 Flexifun_ATG

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/Anup158/Flexifun_ATG?style=for-the-badge)](https://github.com/Anup158/Flexifun_ATG/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Anup158/Flexifun_ATG?style=for-the-badge)](https://github.com/Anup158/Flexifun_ATG/network)
[![GitHub issues](https://img.shields.io/github/issues/Anup158/Flexifun_ATG?style=for-the-badge)](https://github.com/Anup158/Flexifun_ATG/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

**A Game-Based Therapy Platform designed to empower autistic children through interactive, AI-powered learning experiences.**

[Live Demo](https://flexifun-atg.vercel.app/) · [Report Bug](https://github.com/Anup158/Flexifun_ATG/issues) · [Request Feature](https://github.com/Anup158/Flexifun_ATG/issues)

</div>

---

## 📖 Overview

**Flexifun_ATG** is a full-stack, therapist-led web application built specifically for children on the autism spectrum. It combines AI, real-time webcam analysis, voice recognition, and Unity 2D/3D games to deliver structured therapeutic interventions across three core developmental modules:

- 🎭 **Emotional Recognition** — AI-powered facial expression training
- 💬 **Communication Reciprocity** — Voice-modulated echo challenges
- 🧠 **Executive Function** — Cognitive sequencing and planning games

Therapists manage and assign games; children play through a child-friendly dashboard — all progress tracked in real time.

---

## ✨ Features

### 🎮 Game Modules

| Module | Type | Description |
|--------|------|-------------|
| **Emotional Recognition** | Web + Unity 2D | Real-time webcam facial detection; children mirror prompted emotions (happy, sad, angry, surprised, fearful, neutral). AI scores accuracy using Hugging Face models. |
| **Communication Reciprocity (Echo Challenge)** | Web + Unity 2D/3D | Voice-modulated phrase repetition; children speak phrases in the correct emotional tone. Audio analysis scores pitch, rate & energy. |
| **Executive Function (Recipe Game)** | Web | Step-sequencing cognitive game; children arrange recipe steps in the correct order to build problem-solving skills. |

### 👨‍⚕️ Therapist Portal
- Secure therapist login and dashboard
- Assign specific game modules to individual students
- Track real-time session data, accuracy, and progress charts
- View per-student performance history

### 👦 Child Portal
- Child-friendly animated home screen
- Sound toggle and avatar support
- Progress stars, streaks, and session stats
- Only assigned games visible per child

### 🤖 AI & Real-time
- Hugging Face inference API for emotion detection from live webcam frames
- Web Audio API for voice pitch/rate/energy analysis (no external dependency)
- Camera-based face capture with confidence scoring

---

## 🖥️ Screenshots

<img width="1545" height="873" alt="Dashboard" src="https://github.com/user-attachments/assets/ad8842fc-6d8e-4520-8d8a-e7bb8618dba6" />

<img width="1538" height="875" alt="Child Home" src="https://github.com/user-attachments/assets/b3458c10-34ab-49a4-a6fc-2fbd60178347" />

<img width="1534" height="873" alt="Emotion Game" src="https://github.com/user-attachments/assets/bdb7ed58-035b-4349-a48e-c9c06710b9b9" />

---

## 🛠️ Tech Stack

**Frontend:**

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query/latest)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)](https://www.radix-ui.com/)

**Unity Games (WebGL):**

[![Unity](https://img.shields.io/badge/Unity-000000?style=for-the-badge&logo=unity&logoColor=white)](https://unity.com/)

- `emotional-unity02` — Emotional Recognition 2D Game (Unity WebGL build, embedded via iframe)
- `communication-unity` — Communication Reciprocity 2D/3D Game (Unity WebGL build, embedded via iframe)

**Backend:**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)](https://jwt.io/)

**AI / ML:**

[![Hugging Face](https://img.shields.io/badge/Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)](https://huggingface.co/)
- Facial emotion recognition via webcam frames
- Web Audio API for voice pitch/rate/energy scoring

**Database:**

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-800000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)

**DevOps:**

[![PNPM](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** `v18.x` or higher
- **pnpm** — `npm install -g pnpm`
- **MongoDB** — local or [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Hugging Face API Key** — free at [huggingface.co](https://huggingface.co/settings/tokens)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anup158/Flexifun_ATG.git
   cd Flexifun_ATG
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your `.env`:

   | Variable | Description | Required |
   |----------|-------------|----------|
   | `MONGO_URI` | MongoDB connection string | ✅ |
   | `JWT_SECRET` | Secret key for JWT signing | ✅ |
   | `HF_API_KEY` | Hugging Face API key for emotion AI | ✅ |
   | `PORT` | Backend server port (default: `5000`) | ✅ |
   | `CLIENT_URL` | Frontend URL (e.g. `http://localhost:8080`) | ✅ |
   | `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Optional |
   | `CLOUDINARY_API_KEY` | Cloudinary API key | Optional |
   | `CLOUDINARY_API_SECRET` | Cloudinary API secret | Optional |
   | `STRIPE_SECRET_KEY` | Stripe secret key | Optional |
   | `EMAIL_USER` | Nodemailer email address | Optional |
   | `EMAIL_PASS` | Nodemailer email password | Optional |

4. **Start the development server**
   ```bash
   pnpm run dev
   ```
   Visit `http://localhost:8080`

---

## 📁 Project Structure

```
Flexifun_ATG/
├── client/
│   ├── components/ui/          # Shadcn/Radix UI components
│   ├── contexts/               # AuthContext, StudentContext
│   ├── games/
│   │   ├── emotional/          # Emotion Recognition web game
│   │   │   ├── EmotionGame.tsx      # Main game controller
│   │   │   ├── FaceCapture.tsx      # Webcam + HuggingFace AI
│   │   │   ├── GameCanvas.tsx       # Animated canvas overlay
│   │   │   ├── PictureGame.tsx      # Picture-based emotion rounds
│   │   │   └── PictureRound.tsx     # Individual round component
│   │   ├── executive/          # Recipe sequencing game
│   │   │   └── RecipeGame.tsx       # Step ordering challenge
│   │   ├── theory/             # Communication reciprocity game
│   │   │   ├── EchoChallenge.tsx    # Challenge orchestrator
│   │   │   └── EchoRound.tsx        # Voice recording + analysis
│   │   └── shared/
│   │       └── SessionReport.tsx    # End-of-session summary
│   ├── pages/
│   │   ├── ChildHome.tsx       # Child dashboard
│   │   ├── TherapistDashboard.tsx  # Therapist control panel
│   │   ├── Game.tsx            # Game launcher/router
│   │   └── ...
│   └── services/
│       ├── api.ts              # Axios API client
│       └── gameService.ts      # Game module definitions & scoring
├── public/
│   ├── emotional-unity02/      # Unity WebGL build — Emotional Recognition
│   │   ├── Build/              # .wasm, .data, .framework.js
│   │   ├── StreamingAssets/    # Animation asset bundles
│   │   └── TemplateData/       # Unity WebGL template assets
│   └── communication-unity/    # Unity WebGL build — Communication Reciprocity
│       ├── Build/
│       └── TemplateData/
├── server/
│   ├── config/database.ts      # MongoDB connection
│   ├── middleware/auth.ts       # JWT middleware
│   ├── models/
│   │   ├── Student.ts          # Student schema
│   │   ├── Therapist.ts        # Therapist schema
│   │   ├── Session.ts          # Session tracking
│   │   └── GameProgress.ts     # Per-module progress
│   ├── routes/
│   │   ├── auth.ts             # Login/register
│   │   ├── student.ts          # Student APIs
│   │   └── therapist.ts        # Therapist APIs
│   └── index.ts                # Express server entry
├── shared/api.ts               # Shared types
├── .env.example
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🎮 Unity Games Integration

Both Unity games are built as **WebGL** and served as static files from the `public/` directory. They are embedded into the React app via `<iframe>` in the `Game.tsx` page.

### Emotional Recognition Game (`emotional-unity02`)
- Built with Unity 2D
- Features animated characters displaying 6 emotions: 😄 😢 😮 😠 😨 😐
- Uses 2D Animation asset bundles (`rikrpoison`, `rikrrage`, etc.)
- Communicates scores back to React via `window.postMessage`

### Communication Reciprocity Game (`communication-unity`)
- Built with Unity 2D/3D
- Interactive dialogue and turn-based communication scenarios
- Teaches reciprocal conversation, turn-taking, and social cues

> **Note:** Unity build files (`.wasm`, `.data`) are large binaries. They are excluded from git tracking. For deployment, upload the `Build/` folders to a CDN (Cloudflare R2 / AWS S3 / Netlify) and reference via URL, or use Git LFS.

---

## 🔌 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register student or therapist |
| `POST` | `/api/auth/login` | Login and receive JWT |

### Student
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/student/dashboard` | Get student stats & assigned games |
| `POST` | `/api/student/progress` | Submit game session progress |
| `GET` | `/api/student/progress` | Get all progress records |

### Therapist
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/therapist/students` | List all assigned students |
| `POST` | `/api/therapist/assign` | Assign game modules to a student |
| `GET` | `/api/therapist/progress/:studentId` | View student's progress |

---

## 📊 How Scoring Works

### Emotional Recognition
- Webcam frame sent to Hugging Face every second during active detection
- AI returns confidence % for each emotion
- Score = confidence when detected emotion matches target emotion
- 10 rounds per session

### Echo Challenge (Communication)
- Child records voice speaking a prompted phrase with a target emotion
- Web Audio API extracts: **RMS energy**, **zero-crossing rate**, **pitch estimate**
- Score = how closely recorded audio matches target emotion's expected voice profile
- Feedback: "Speak fast and bright! 😊" style real-time tips

### Recipe Game (Executive Function)
- Child reorders shuffled recipe steps
- Score based on number of correctly placed steps
- Teaches sequencing, planning, and working memory

---

## 🚀 Deployment

### Frontend + Backend (Unified Vite Dev Server)
```bash
pnpm run dev       # Runs both on http://localhost:8080
pnpm run build     # Production build
```

### Netlify
The `netlify.toml` is pre-configured. Deploy `dist/` after build.

### Docker
`.dockerignore` is included. Add your own `Dockerfile` for containerized deployment.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'feat: describe your change'`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

## 📞 Contact & Support

- 📧 Email: jagtapanup158@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/Anup158/Flexifun_ATG/issues)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ for autistic children, by [Anup158](https://github.com/Anup158)

</div>
