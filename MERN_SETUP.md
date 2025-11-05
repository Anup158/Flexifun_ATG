# FlexiFun MERN Stack Setup Guide

This document provides setup instructions for the complete MERN (MongoDB, Express, React, Node.js) stack application.

## Architecture Overview

The application follows a full-stack MERN architecture with:

- **Frontend**: React with React Router for navigation
- **Backend**: Express.js server with RESTful APIs
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based token authentication

## Prerequisites

- Node.js (v16 or higher)
- npm or pnpm
- MongoDB (local or Atlas cloud)

## Installation & Setup

### 1. Clone & Install Dependencies

```bash
# Install all dependencies (frontend + backend)
npm install
# or
pnpm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/flexifun
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/flexifun

# JWT Secret (change in production)
JWT_SECRET=your-secure-secret-key-here

# Server Configuration
PORT=5173
NODE_ENV=development

# Frontend API URL
REACT_APP_API_URL=http://localhost:5173/api
```

### 3. MongoDB Setup

#### Option A: Local MongoDB

```bash
# Install MongoDB Community Edition
# macOS (Homebrew):
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify connection
mongosh
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### 4. Start Development Server

```bash
# Starts both frontend (Vite) and backend (Express) with hot reload
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
# or
pnpm build
```

## Project Structure

```
flexifun/
├── client/                      # React Frontend
│   ├── pages/                   # Page components
│   │   ├── LoginSelection.tsx   # Login choice screen
│   │   ├── ChildLogin.tsx       # Child login with pattern
│   │   ├── ChildHome.tsx        # Child home dashboard
│   │   ├── Profile.tsx          # Child profile
│   │   ├── Game.tsx             # Game template
│   │   ├── TherapistLogin.tsx   # Therapist login
│   │   └── TherapistDashboard.tsx
│   ├── components/              # Reusable UI components
│   ├── contexts/                # React Context (Auth, Student)
│   │   ├── AuthContext.tsx      # Global auth state
│   │   └── StudentContext.tsx   # Student-specific state
│   ├── services/                # API & business logic
│   │   ├── api.ts               # API client
│   │   └── gameService.ts       # Game data service
│   ├── global.css               # Tailwind + theme
│   └── App.tsx                  # Main app with routes
│
├── server/                      # Express Backend
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── models/                  # Mongoose schemas
│   │   ├── Student.ts
│   │   ├── Therapist.ts
│   │   ├── GameProgress.ts
│   │   └── Session.ts
│   ├── routes/                  # API endpoints
│   │   ├── auth.ts              # Auth endpoints
│   │   ├── student.ts           # Student endpoints
│   │   ├── therapist.ts         # Therapist endpoints
│   │   └── demo.ts
│   ├── middleware/
│   │   └── auth.ts              # JWT verification
│   ├── utils/
│   │   └── auth.ts              # Auth helpers
│   └── index.ts                 # Server setup
│
├── shared/                      # Shared types
│   └── api.ts
│
├── .env.example                 # Environment template
├── tailwind.config.ts           # Tailwind configuration
├── vite.config.ts               # Frontend build config
├── vite.config.server.ts        # Backend build config
└── package.json                 # Dependencies
```

## API Endpoints

### Authentication

- `POST /api/auth/student/signup` - Create student account
- `POST /api/auth/student/login` - Student login with PIN
- `POST /api/auth/therapist/signup` - Create therapist account
- `POST /api/auth/therapist/login` - Therapist login with email/password

### Student Routes (Protected)

- `GET /api/student/profile` - Get student profile
- `PUT /api/student/profile` - Update student profile
- `GET /api/student/progress` - Get game progress
- `PUT /api/student/progress` - Update game progress
- `GET /api/student/stats` - Get overall stats

### Therapist Routes (Protected)

- `GET /api/therapist/dashboard` - Get dashboard data
- `POST /api/therapist/assign-student` - Assign student
- `GET /api/therapist/student/:studentId/progress` - Get student progress
- `GET /api/therapist/student/:studentId/report` - Generate weekly report

## Database Schema

### Student
```typescript
{
  name: string
  avatar: string
  pinCode: string (hashed)
  password: string (hashed)
  soundEnabled: boolean
  progressStars: number (0-5)
  totalSessions: number
  totalHours: number
  currentStreak: number
  createdAt: Date
  updatedAt: Date
}
```

### Therapist
```typescript
{
  name: string
  email: string
  password: string (hashed)
  organization: string
  assignedStudents: ObjectId[]
  createdAt: Date
  updatedAt: Date
}
```

### GameProgress
```typescript
{
  studentId: ObjectId
  moduleId: string (enum)
  completed: number
  total: number
  accuracy: number
  timeSpent: number
  lastPlayedAt: Date
  createdAt: Date
  updatedAt: Date
}
```

### Session
```typescript
{
  studentId: ObjectId
  therapistId: ObjectId
  moduleId: string
  duration: number
  accuracy: number
  pointsEarned: number
  notes: string
  createdAt: Date
  updatedAt: Date
}
```

## Authentication Flow

### For Students
1. Child clicks "Child / Learner Login" on LoginSelection
2. Selects avatar on ChildLogin page
3. Enters PIN pattern (minimum 4 dots)
4. System calls `POST /api/auth/student/login` with PIN
5. JWT token returned and stored in localStorage
6. User redirected to ChildHome with authenticated session

### For Therapists
1. Click "Therapist / Teacher Login" on LoginSelection
2. Enter email and password on TherapistLogin page
3. System calls `POST /api/auth/therapist/login`
4. JWT token returned and stored
5. User redirected to TherapistDashboard

## Security Features

- **Password Hashing**: bcryptjs for password encryption
- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access**: Separate routes for students and therapists
- **Protected Endpoints**: Middleware verifies JWT tokens
- **CORS**: Configured for secure cross-origin requests

## Deployment

### Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
3. Deploy:
   ```bash
   npm run build
   ```

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables
3. Vercel automatically detects and builds the project

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `brew services list`
- Check connection string in `.env`
- Verify network access for Atlas if using cloud

### Token Not Persisting
- Check browser localStorage (DevTools → Application)
- Ensure JWT_SECRET is consistent
- Verify token expiration (default 7 days)

### API Calls Failing
- Check browser Network tab for actual error responses
- Verify server is running on correct port
- Check CORS configuration in `server/index.ts`

### Hot Reload Not Working
- Restart dev server: `npm run dev`
- Clear browser cache (Ctrl+Shift+Delete)
- Check Vite server is listening

## Development Tips

### Adding a New API Endpoint

1. Create handler in appropriate `server/routes/*.ts`
2. Register route in `server/index.ts`
3. Add client method in `client/services/api.ts`
4. Use in React component with `apiClient.methodName()`

### Adding Authentication to a Route

1. Add to route handler in `server/routes/*.ts`:
   ```typescript
   app.get("/api/endpoint", studentAuthMiddleware, handler);
   ```

### Creating New Database Models

1. Add schema in `server/models/Model.ts`
2. Export model with proper TypeScript interface
3. Import and use in route handlers

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev)
- [JWT.io](https://jwt.io/)
- [Mongoose Documentation](https://mongoosejs.com/)

## License

MIT License - Open source and free to use

## Support

For issues or questions:
1. Check this guide's Troubleshooting section
2. Review MongoDB and Express documentation
3. Check API responses in browser Network tab
4. Ensure all environment variables are set correctly
