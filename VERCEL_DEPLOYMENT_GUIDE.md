# Vercel Deployment Guide - Skill Ridge Client

## ✅ What Has Been Done

### 1. **Better Auth Cookie Configuration Fixed**
- Updated `src/lib/auth-client.ts` with dynamic baseURL
- Added `credentials: "include"` for proper cookie handling
- Client-side uses same-origin requests for better security

### 2. **Build & Production Ready**
- Fixed TypeScript compilation errors
- Verified production build succeeds
- Created `vercel.json` with proper configuration
- Added `.vercelignore` for deployment optimization

### 3. **Environment Configuration**
- Created `.env.production` with template values
- All environment variables in `src/env.ts` properly typed
- Next.js config includes cache control for auth routes

### 4. **Code Changes Committed**
- All changes pushed to GitHub: `SkillBridge-client`
- Ready for Vercel deployment

---

## 📋 Next Steps - Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended - Easiest)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Sign in with your GitHub account

2. **Import Repository**
   - Select "Import Git Repository"
   - Search for `SkillBridge-client`
   - Click "Import"

3. **Configure Project**
   - Framework: **Next.js** (should auto-detect)
   - Root Directory: `.` (current)
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

4. **Set Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   BACKEND_URL = https://skillbridge-6phn.onrender.com
   API_URL = https://skillbridge-6phn.onrender.com
   AUTH_URL = https://skillbridge-6phn.onrender.com/api/auth
   FRONTEND_URL = https://your-project-name.vercel.app
   NEXT_PUBLIC_FRONTEND_URL = https://your-project-name.vercel.app
   ```
   
   ⚠️ **Important**: Replace `your-project-name` with your actual Vercel project name!

5. **Click "Deploy"**
   - Wait for deployment to complete
   - You'll get a deployment URL like: `https://skill-ridge-client.vercel.app`

### Option 2: Deploy via CLI (If Already Linked)

```bash
# If not already logged in:
vercel login

# Deploy to production:
vercel deploy --prod --env BACKEND_URL=https://skillbridge-6phn.onrender.com --env FRONTEND_URL=https://your-project.vercel.app --env NEXT_PUBLIC_FRONTEND_URL=https://your-project.vercel.app --env API_URL=https://skillbridge-6phn.onrender.com --env AUTH_URL=https://skillbridge-6phn.onrender.com/api/auth
```

---

## 🔐 Fixing Better Auth Cookies on Vercel

### Issue: Cookies Not Working Across Domains

If Better Auth cookies still aren't working after deployment:

**1. Check Backend CORS Settings**

Your backend at `skillbridge-6phn.onrender.com` needs to allow your Vercel domain:

```javascript
// Example: Backend CORS configuration
const cors = require('cors');

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://skill-ridge-client.vercel.app", // Add your Vercel URL here
  ],
  credentials: true // Very important!
}));
```

**2. Update Backend Better Auth Configuration**

Ensure your backend's Better Auth is configured with proper cookie settings:

```javascript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: db,
  secret: process.env.BETTER_AUTH_SECRET,
  basePath: "/api/auth",
  
  // Important for cross-domain cookies:
  cookie: {
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    httpOnly: true,
    sameSite: "lax", // Important: allows cookies from different domain
  },
});
```

**3. Check Deployment Settings**

Go to Vercel Project Settings → Environment Variables and verify:
- ✅ `BACKEND_URL` points to your Render backend
- ✅ `AUTH_URL` points to correct backend auth endpoint
- ✅ `NEXT_PUBLIC_FRONTEND_URL` matches your Vercel domain

---

## ✨ Features Now Properly Configured

✅ **Dynamic Base URL** - Client automatically uses correct server URL
✅ **Proper Cookie Handling** - credentials: "include" for auth
✅ **Cache Control** - Auth routes never cached
✅ **CSRF Protection** - SameSite=Lax cookies
✅ **Production Ready** - Optimized build configuration
✅ **Environment Validation** - Type-safe environment variables

---

## 🧪 Test After Deployment

1. **Test Login Flow**
   - Go to your Vercel URL
   - Click "Login"
   - Enter credentials
   - Verify session is saved (check browser cookies)

2. **Test Navigation**
   - After login, verify dashboard access works
   - Check that cookies persist on page refresh

3. **Check Network Tab**
   - Verify auth API calls include cookies
   - Look for Set-Cookie headers in responses

---

## 📚 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Better Auth Docs**: https://www.better-auth.com/docs
- **Next.js Cookies**: https://nextjs.org/docs/app/api-reference/functions/cookies
- **CORS Guide**: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

---

## 💡 Troubleshooting

**Problem: "SameSite cookie attribute"**
- ✅ Fixed in vercel.json - SameSite=Lax header added

**Problem: "Cookies not being sent"**
- Check backend CORS has `credentials: true`
- Verify `credentials: "include"` in auth-client.ts (already done)

**Problem: "Environment variables not found"**
- Ensure all vars are set in Vercel dashboard
- Redeploy after setting environment variables

---

## 📝 Summary

Your project is now properly configured for Vercel deployment with full Better Auth cookie support. The main configuration is done - you just need to:

1. Deploy via Vercel (GitHub integration recommended)
2. Set environment variables with your actual Vercel domain
3. Update backend CORS if needed
4. Test the authentication flow

Good luck! 🚀
