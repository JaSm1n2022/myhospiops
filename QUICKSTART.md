# Quick Start Guide - MyHospiOps

## Initial Setup (5 minutes)

### 1. Install Dependencies
```bash
cd /Users/nargelmac/Documents/GitHub/myhospiops
npm install
```

### 2. Configure Environment Variables
The `.env` file is already configured with your Supabase credentials. If you need to update them:
```bash
# Edit .env file
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### 3. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Project Overview

### What's Been Set Up

✅ **Complete Modern Architecture**
- TypeScript + React 18 + Vite
- Tailwind CSS for styling
- Supabase authentication (magic links)
- React Router v6 with protected routes
- i18n support (English/Spanish)
- PWA capabilities

✅ **Core Features Implemented**
- Login page with magic link authentication
- Dashboard page (admin and clinician views)
- Responsive layout with sidebar navigation
- Mobile hamburger menu
- Language switcher
- Role-based navigation

✅ **Project Structure**
- `/src/components` - Reusable UI components (Layout, LoadingScreen)
- `/src/pages` - Page components (Login, Dashboard, Unauthorized, AuthCallback)
- `/src/hooks` - React hooks (useAuth for authentication)
- `/src/lib` - External integrations (Supabase client)
- `/src/types` - TypeScript definitions
- `/src/utils` - Helper functions (date helpers, constants)
- `/src/i18n` - Internationalization files

### What Needs to Be Migrated

The following features from `hospice-mgmt-ops` still need to be ported:

🚧 **High Priority**
1. Patient management pages (`/patients`)
2. Employee management pages (`/employees`)
3. Deliveries page (`/deliveries`)
4. Pickups page (`/pickups`)
5. Routesheet page (`/routesheet`)

🚧 **Medium Priority**
6. Financial pages (payroll, invoicing, transactions)
7. Inventory/Logistics pages
8. Reports and analytics
9. Settings page

🚧 **Low Priority**
10. Medicare calculations
11. AI-powered invoice extraction
12. Advanced features from original system

## Testing the Application

### 1. Test Authentication
- Visit `http://localhost:3000`
- You'll be redirected to the login page
- Enter an email address
- Check your email for the magic link
- Click the link to sign in
- You'll be redirected to the dashboard

### 2. Test Navigation
- Use the sidebar (desktop) or hamburger menu (mobile)
- Try switching languages (EN/ES)
- Test logout functionality

### 3. Test Roles
To test different roles, you'll need to:
1. Create user profiles in Supabase
2. Set the `role` field to either `admin` or `clinician`
3. The navigation menu will adapt based on the role

## Database Setup

You'll need to create the following tables in Supabase:

### Required Tables
```sql
-- profiles table (links to auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT,
  role TEXT CHECK (role IN ('admin', 'clinician', 'user')),
  company_id UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- employees table
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  company_id UUID,
  position TEXT,
  status TEXT CHECK (status IN ('active', 'inactive')),
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

Enable Row Level Security (RLS) for both tables.

## Next Steps

### Immediate Tasks
1. **Set up database tables** in Supabase
2. **Test authentication flow** end-to-end
3. **Create a patient management page** as the first migration

### Recommended Migration Order
1. Start with **patient management** (most critical feature)
2. Then **employee management**
3. Then **routesheet/visit tracking** for clinicians
4. Then **financial modules**
5. Finally **reports and analytics**

### Tips for Migration
- Copy page components from `/Users/nargelmac/Documents/GitHub/hospice-mgmt-ops/src/views`
- Convert class components to functional components with hooks
- Replace Material-UI components with Tailwind CSS + Lucide icons
- Replace Redux calls with Context API or direct Supabase queries
- Use the existing type definitions in `src/types/index.ts`

## Available Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run typecheck        # Run TypeScript type checking
npm run lint             # Run ESLint
npm run lint --fix       # Auto-fix linting issues

# Testing
# (Add test scripts as needed)
```

## Troubleshooting

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or specify a different port
npm run dev -- --port 3001
```

### Type errors
```bash
npm run typecheck  # See all type errors
```

### Build fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Resources

- **Routecare Reference**: `/Users/nargelmac/Documents/GitHub/routecare`
- **Original System**: `/Users/nargelmac/Documents/GitHub/hospice-mgmt-ops`
- **Tailwind Docs**: https://tailwindcss.com/docs
- **React Router v6**: https://reactrouter.com/
- **Supabase Docs**: https://supabase.com/docs
- **Lucide Icons**: https://lucide.dev/icons

## Support

For questions or issues during development, refer to:
1. This QUICKSTART.md file
2. The main README.md
3. Code comments in existing components
4. The routecare project for design patterns
