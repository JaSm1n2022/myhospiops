# MyHospiOps - Hospice Management Operations System

A modern, full-featured hospice management system built with React, TypeScript, Tailwind CSS, and Supabase. This project converts the original hospice-mgmt-ops system to a modern architecture based on the routecare structure and design.

## Features

### Core Functionality
- **Magic Link Authentication** - Passwordless login via Supabase Auth
- **Role-Based Access Control** - Admin and Clinician dashboards with tailored features
- **Multi-Language Support** - English and Spanish via i18next
- **Progressive Web App** - Installable, offline-capable application
- **Responsive Design** - Mobile-first approach with adaptive layouts

### Admin Dashboard Features
- Patient Management
- Employee Management
- Financial Management (Payroll, Invoicing)
- Inventory & Logistics
- Reports & Analytics
- Settings & Configuration

### Clinician Dashboard Features
- Daily Routesheets
- Visit Tracking
- Delivery & Pickup Management
- Earnings Tracking
- Document Management

## Technology Stack

### Frontend
- **React 18.3** - Modern React with hooks
- **TypeScript 5.5** - Type-safe development
- **Vite 5.4** - Fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **React Router 6** - Client-side routing

### Backend & Services
- **Supabase** - PostgreSQL database + authentication
- **Anthropic Claude API** - AI-powered features

### Key Libraries
- **react-i18next** - Internationalization
- **react-hot-toast** - Notifications
- **lucide-react** - Icon system
- **dayjs** - Date manipulation
- **@react-pdf/renderer** - PDF generation
- **ApexCharts** - Data visualization
- **XLSX** - Excel file handling

## Project Structure

```
myhospiops/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Layout.tsx     # Main layout with sidebar/mobile menu
│   │   └── LoadingScreen.tsx
│   ├── pages/            # Page components
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   │   └── useAuth.tsx   # Authentication context
│   ├── lib/              # External integrations
│   │   └── supabase.ts   # Supabase client
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   ├── constants.ts
│   │   └── dateHelpers.ts
│   ├── i18n/             # Internationalization
│   │   ├── config.ts
│   │   └── locales/      # Translation files
│   ├── App.tsx           # Root component with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles + Tailwind
├── public/               # Static assets
├── dist/                 # Build output
└── package.json          # Dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project
- (Optional) Anthropic API key for AI features

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key
VITE_DOWNLOAD_READING_MATERIAL=your_pdf_url
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run type checking
npm run typecheck

# Run linting
npm run lint
```

## Development Workflow

### Adding a New Page
1. Create page component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation item in `src/components/Layout.tsx`
4. Add translations in `src/i18n/locales/`

### Adding Translations
1. Add keys to `src/i18n/locales/en.json`
2. Add Spanish translations to `src/i18n/locales/es.json`
3. Use in components: `const { t } = useTranslation()` then `{t('key')}`

### Custom Tailwind Classes
Common button and component styles are defined in `src/index.css`:
- `.btn-primary` - Primary action button
- `.btn-secondary` - Secondary action button
- `.btn-danger` - Destructive action button
- `.input-field` - Standard text input
- `.card` - Card container

## Migration from hospice-mgmt-ops

This project maintains feature parity with the original hospice-mgmt-ops system while modernizing the architecture.

### Architecture Changes
- ✅ Redux → Context API for state management
- ✅ Create React App → Vite
- ✅ JavaScript → TypeScript
- ✅ Material-UI v4 → Tailwind CSS + Lucide Icons
- ✅ React Router v5 → React Router v6
- ✅ Email/Password Auth → Magic Link Auth

### Next Steps
To complete the migration, the following features from hospice-mgmt-ops need to be ported:
- Patient management pages and CRUD operations
- Employee management system
- Financial modules (payroll, invoicing, transactions)
- Inventory and logistics tracking
- Reports and analytics dashboards
- Medicare management and calculations
- AI-powered invoice extraction
- Full routesheet and visit tracking

## Deployment

The application can be deployed to Vercel, Netlify, or any static hosting service.

```bash
npm run build
# Deploy the dist/ folder
```

## License

Private/Proprietary

## Next Development Tasks

1. Create patient management pages
2. Create employee management pages
3. Build financial modules
4. Implement reports and analytics
5. Add inventory management
6. Port Medicare calculation features
7. Integrate Claude AI for invoice processing