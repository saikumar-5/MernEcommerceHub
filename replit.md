# Portfolio Application

## Overview

This is a modern full-stack portfolio application built with React, Express, and PostgreSQL. The application features a clean, professional design with a dark theme, showcasing projects, experience, contact information, and visitor analytics. It includes both a public-facing portfolio and an admin panel for content management.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL storage
- **Validation**: Zod for schema validation

### Design System
- **Component Library**: shadcn/ui (New York variant)
- **Typography**: Inter and JetBrains Mono fonts
- **Color Scheme**: Dark theme with neutral base colors and blue primary
- **Icons**: Lucide React icons with React Icons for tech skills

## Key Components

### Database Schema
The application uses 6 main tables:
- **users**: Authentication and user management
- **projects**: Portfolio projects with categories, technologies, and engagement metrics
- **comments**: Public comments with moderation system
- **contacts**: Contact form submissions
- **experiences**: Professional experience entries
- **analytics**: Visitor tracking and site metrics

### API Structure
RESTful API endpoints organized by feature:
- `/api/analytics/*` - Visitor tracking and metrics
- `/api/projects/*` - Project CRUD operations and likes
- `/api/comments/*` - Comment management and moderation
- `/api/contacts/*` - Contact form handling
- `/api/experiences/*` - Experience management

### Frontend Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Custom Cursor**: Enhanced desktop experience with animated cursor
- **Smooth Scrolling**: Navigation with scroll-to-section functionality
- **Loading States**: Skeleton loaders for improved UX
- **Form Validation**: Client-side validation with error handling
- **Toast Notifications**: User feedback for actions
- **Admin Panel**: Content management interface

## Data Flow

1. **Visitor Tracking**: Automatic visitor count increment on page load
2. **Content Display**: Server-side data fetching with client-side caching
3. **User Interactions**: Form submissions, likes, and comments with optimistic updates
4. **Content Management**: Admin operations with immediate UI updates
5. **Real-time Updates**: Query invalidation for data consistency

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **express**: Web application framework
- **zod**: Schema validation

### UI Dependencies
- **@radix-ui/***: Primitive UI components
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **react-icons**: Additional icon sets
- **wouter**: Lightweight routing

### Development Tools
- **typescript**: Type safety
- **vite**: Build tool and dev server
- **drizzle-kit**: Database migration tool
- **tsx**: TypeScript execution

## Deployment Strategy

### Development
- **Hot Reloading**: Vite dev server with HMR
- **Database**: Development database with schema pushing
- **Environment**: NODE_ENV=development with debug logging

### Production Build
- **Frontend**: Vite build generating optimized static assets
- **Backend**: esbuild bundling for Node.js deployment
- **Database**: Production PostgreSQL with migrations
- **Static Serving**: Express serving built frontend assets

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Environment mode (development/production)

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 06, 2025. Initial setup