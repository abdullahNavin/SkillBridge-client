# Skill Bridge - Tutoring Platform

A modern, full-stack tutoring marketplace application built with **Next.js 16** and **TypeScript**. Skill Bridge connects students with qualified tutors, enabling bookings, reviews, and profile management through intuitive dashboards.

## 📋 Project Overview

Skill Bridge is a comprehensive tutoring platform that provides:
- **Multi-role Authentication**: Student, Tutor, and Admin roles with Better Auth
- **Tutor Discovery**: Browse and filter tutors by category, price, and rating
- **Booking System**: Students can book sessions with tutors
- **User Profiles**: Students and tutors can manage their profiles
- **Reviews & Ratings**: Rate tutors after sessions
- **Admin Dashboard**: Manage users, bookings, and categories
- **Real-time Notifications**: Toast notifications for user feedback

## 🏗️ Architecture

### Frontend Stack
- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Component Library**: Radix UI + shadcn/ui
- **Form Management**: React Hook Form + Zod validation
- **Authentication**: Better Auth (client-side)
- **Routing**: Next.js App Router

### Backend Integration
- **Backend Server**: Express.js (Render deployment)
- **Auth Service**: Better Auth API
- **API Base URL**: `https://skillbridge-6phn.onrender.com`

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── (commonLayout)/          # Public pages (layout wrapper)
│   │   ├── browse-tutors/       # Tutor discovery & filtering
│   │   ├── [id]/                # Tutor detail page
│   │   └── page.tsx             # Home page
│   ├── (Dashboard)/             # Protected dashboard pages
│   │   ├── @adminDashboard/     # Admin dashboard (parallel routes)
│   │   ├── @studentDashboard/   # Student dashboard (parallel routes)
│   │   ├── @tutorDashboard/     # Tutor dashboard (parallel routes)
│   │   ├── layout.tsx           # Dashboard layout
│   │   ├── admin-dashboard/     # Admin pages
│   │   ├── student-dashboard/   # Student pages
│   │   └── tutor-dashboard/     # Tutor pages
│   ├── login/                   # Login page
│   ├── signup/                  # Signup page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── not-found.tsx            # 404 page
│
├── components/
│   ├── layout/                  # Layout components (navbar, footer, sidebar)
│   ├── modules/                 # Feature-specific components
│   │   ├── Admin/               # Admin components
│   │   ├── Authentication/      # Login/Signup forms
│   │   ├── BrowsTutor/          # Tutor search & filtering
│   │   ├── TutorProfile/        # Tutor profile components
│   │   └── Home/                # Home page components
│   ├── ui/                      # Reusable UI components (button, card, dialog, etc.)
│   ├── service/                 # API service functions
│   └── provider/                # Context providers (Theme)
│
├── actions/                     # Server actions (API mutations)
│   ├── admin.action.ts          # Admin operations
│   ├── booking.action.ts        # Booking operations
│   ├── category.action.ts       # Category management
│   ├── review.action.ts         # Review operations
│   ├── studentProfile.action.ts # Student profile updates
│   └── tutorProfileData.action.ts
│
├── lib/
│   ├── auth-client.ts           # Better Auth client configuration
│   └── utils.ts                 # Utility functions
│
├── hooks/
│   └── use-mobile.ts            # Mobile responsiveness hook
│
├── constant/
│   └── userRole.ts              # User role constants
│
├── routes/
│   ├── adminRoutes.ts           # Admin navigation routes
│   ├── studentRoutes.ts         # Student navigation routes
│   └── tutorRoutes.ts           # Tutor navigation routes
│
└── env.ts                       # Environment variable validation
```

## 🔐 Authentication

**Better Auth Integration**:
- Dynamic baseURL configuration (client vs. server-side)
- Credential-based cookie handling (`credentials: "include"`)
- Same-origin requests for enhanced security
- Session management without explicit middleware

```typescript
// src/lib/auth-client.ts
const authClient = createAuthClient({
  baseURL: getBaseURL(),
  credentials: "include",
})
```

### User Roles

1. **Student**
   - Browse and filter tutors
   - Book tutoring sessions
   - Manage profile and sessions
   - Leave reviews

2. **Tutor**
   - Manage profile and rates
   - View bookings and sessions
   - Update availability

3. **Admin**
   - Manage all users
   - Manage bookings
   - Manage categories
   - View analytics

## 🎨 Key Features

### 1. Tutor Discovery
- **Advanced Filtering**: Category, price range, and rating filters
- **Search**: Find tutors by name or subject
- **Detail Pages**: Comprehensive tutor profiles with reviews

### 2. Booking System
- **Easy Booking**: One-click session booking
- **Session Management**: Track upcoming and past sessions
- **Date/Time Selection**: Calendar-based scheduling

### 3. Reviews & Ratings
- **Post-Session Reviews**: Rate and review tutors
- **Rating Display**: Average ratings on tutor cards
- **Rating Filter**: Find highly-rated tutors

### 4. User Profiles
- **Profile Management**: Update name, image, bio
- **Dashboard Stats**: View booking history and performance
- **Persistent Data**: Secure server-side storage

### 5. Admin Panel
- **User Management**: Add, edit, delete users
- **Category Management**: Create and manage subjects/categories
- **Booking Oversight**: View all bookings and manage cancellations

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm (package manager)

### Installation

```bash
# Clone repository
git clone https://github.com/abdullahNavin/SkillBridge-client.git
cd skill_ridge_client

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your backend URL and other config
```

### Environment Variables

```env
# Backend API Configuration
BACKEND_URL=https://skillbridge-6phn.onrender.com
API_URL=https://skillbridge-6phn.onrender.com
AUTH_URL=https://skillbridge-6phn.onrender.com/api/auth

# Frontend URLs
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
```

### Development

```bash
# Start development server
npm dev

# Open browser
# http://localhost:3000
```

### Build for Production

```bash
# Build optimized bundle
npm build

# Start production server
npm start
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/sign-up` - Register new user
- `POST /api/auth/sign-in` - Login user
- `POST /api/auth/sign-out` - Logout user
- `GET /api/auth/get-session` - Get current session

### Tutors
- `GET /tutors` - List tutors with filters
- `GET /tutors/:id` - Get tutor details
- `PUT /tutors/:id` - Update tutor profile

### Bookings
- `POST /bookings` - Create booking
- `GET /bookings` - Get user bookings
- `PUT /bookings/:id` - Update booking
- `DELETE /bookings/:id` - Cancel booking

### Reviews
- `POST /reviews` - Create review
- `GET /reviews/tutor/:id` - Get tutor reviews

### Categories
- `GET /categories` - List categories
- `POST /categories` - Create category (admin only)

## 🔧 Configuration Files

### `next.config.ts`
- Image optimization settings
- API route rewrites for auth paths
- Cache control headers

### `tsconfig.json`
- TypeScript strict mode
- Path aliases (`@/` for src imports)

### `tailwind.config.mjs`
- Tailwind CSS theme customization
- Color palette
- Component styling

## 🌐 Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "deployment ready"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com/new
   - Import GitHub repository
   - Set environment variables
   - Deploy

3. **Configure Environment Variables in Vercel**
   ```
   BACKEND_URL = https://skillbridge-6phn.onrender.com
   API_URL = https://skillbridge-6phn.onrender.com
   AUTH_URL = https://skillbridge-6phn.onrender.com/api/auth
   FRONTEND_URL = https://your-project.vercel.app
   NEXT_PUBLIC_FRONTEND_URL = https://your-project.vercel.app
   ```

## 🐛 Troubleshooting

### Better Auth Cookies Not Working
- Verify backend CORS configuration allows your frontend domain
- Check that `credentials: true` is set in backend CORS
- Ensure cookies are set with `SameSite=Lax` attribute
- Verify `secure` flag is only set in production (HTTPS)

### Build Errors
- Clear `.next/` directory: `rm -rf .next/`
- Reinstall dependencies: `npm install`
- Check environment variables are properly set

### API Connection Issues
- Verify `BACKEND_URL` is correct and reachable
- Check network tab in browser DevTools
- Ensure the backend server is running

## 📚 Technologies Used

| Category | Technologies |
|----------|--------------|
| **Frontend** | Next.js 16, React 19, TypeScript |
| **Styling** | Tailwind CSS 4, Radix UI |
| **Form Management** | React Hook Form, Zod |
| **Authentication** | Better Auth |
| **UI Components** | shadcn/ui, Lucide React Icons |
| **Utilities** | clsx, date-fns, class-variance-authority |
| **Backend** | Express.js (separate repository) |
| **Database** | PostgreSQL (backend) |
| **Deployment** | Vercel (frontend), Render (backend) |

## 📝 Available Scripts

```bash
npm dev      # Start development server
npm build    # Build for production
npm start    # Start production server
```

## 🎯 Future Enhancements

- [ ] Real-time messaging between tutors and students
- [ ] Video call integration for live sessions
- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced analytics for admin
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Calendar synchronization

## 📄 License

This project is proprietary and closed source.

## 👥 Team

- **Developer**: Abdullah Navin
- **Repository**: [SkillBridge-client](https://github.com/abdullahNavin/SkillBridge-client)

## 📞 Support

For issues, questions, or contributions:
- GitHub Issues: [Open an issue](https://github.com/abdullahNavin/SkillBridge-client/issues)
- Email: navinhp26@gmail.com

---

**Last Updated**: March 2026  
**Version**: 0.1.0
