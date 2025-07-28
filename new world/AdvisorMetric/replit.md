# Feedback Collection Application

## Overview

This is a bilingual (Arabic/English) customer feedback collection web application built with a modern React frontend and Express.js backend. The application guides users through a multi-step feedback process to collect ratings, source information, and comments about their experience. It now includes analytics visualization and a company logo display.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with clear separation between frontend and backend:

- **Frontend**: React SPA with TypeScript using Vite for development and building
- **Backend**: Express.js REST API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (currently using in-memory storage for development)
- **UI Framework**: shadcn/ui components with Tailwind CSS for styling
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for client-side routing

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui components providing a consistent design system
- **Styling**: Tailwind CSS with CSS variables for theming and dark mode support
- **Internationalization**: Custom translation system supporting Arabic (RTL) and English (LTR)
- **Form Management**: React Hook Form with Zod validation
- **HTTP Client**: Custom API client with error handling and credentials support

### Backend Architecture
- **API Layer**: Express.js with middleware for request logging and error handling
- **Data Layer**: Abstracted storage interface (currently in-memory, designed for easy PostgreSQL migration)
- **Validation**: Zod schemas shared between frontend and backend
- **Error Handling**: Centralized error middleware with proper HTTP status codes

### Database Design
- **PostgreSQL Database**: Production-ready database with persistent data storage
- **Feedback Responses Table**: Stores rating (1-5), source, comments, and timestamps
- **Schema Management**: Drizzle ORM with migration support using `npm run db:push`
- **Data Validation**: Shared Zod schemas for type safety across the stack
- **Connection**: Neon serverless PostgreSQL with connection pooling

## Data Flow

1. **User Journey**: Home → Rating Selection → Source Selection → Success
2. **Analytics Access**: Stats button in top-left corner provides access to analytics dashboard
3. **Data Collection**: Rating stored in session storage, combined with source/comments on final submission
4. **API Communication**: RESTful endpoints for feedback submission and retrieval
5. **Data Export**: CSV export functionality for feedback analysis
6. **Analytics Visualization**: Real-time charts and statistics for feedback analysis

### API Endpoints
- `POST /api/feedback` - Submit new feedback response
- `GET /api/feedback` - Retrieve all feedback responses (also used for analytics)
- `GET /api/feedback/export` - Export feedback as CSV

### Analytics Features
- **Statistics Dashboard**: Total feedback count, satisfaction breakdown, average rating
- **Visual Charts**: Bar charts for satisfaction levels, pie charts for source distribution
- **Real-time Data**: Live analytics updated with each new feedback submission
- **Recent Feedback**: List of most recent submissions with ratings and sources

## External Dependencies

### Core Framework Dependencies
- **React**: UI library with hooks and functional components
- **Express.js**: Backend web framework
- **TypeScript**: Type safety across the entire application
- **Vite**: Fast development server and build tool

### Database & Validation
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL support
- **Zod**: Runtime type validation and schema definition
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments

### UI & Styling
- **shadcn/ui**: Component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **class-variance-authority**: Type-safe CSS class management
- **Recharts**: Data visualization library for analytics charts

### Development Tools
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight client-side routing
- **React Hook Form**: Performant form library with minimal re-renders

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite dev server with HMR for fast development
- **Type Checking**: Real-time TypeScript compilation
- **Database**: PostgreSQL database with persistent storage
- **Replit Integration**: Custom plugins for development environment

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild compiles TypeScript server to `dist/index.js`
- **Database**: PostgreSQL with connection pooling via Neon
- **Static Assets**: Express serves built frontend files in production

### Environment Configuration
- **Development**: `NODE_ENV=development` enables Vite middleware
- **Production**: `NODE_ENV=production` serves static files
- **Database**: `DATABASE_URL` environment variable for PostgreSQL connection
- **Build Process**: Separate build steps for frontend and backend optimization

The application is designed for easy deployment to platforms like Replit, Vercel, or traditional hosting providers with minimal configuration changes.