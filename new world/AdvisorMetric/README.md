# Feedback Collection Application

A modern, bilingual (Arabic/English) customer feedback collection web application built with React and Express.js. Features a user-friendly interface with analytics dashboard and real-time data visualization.

![Application Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)
![React](https://img.shields.io/badge/React-18+-blue)

## ✨ Features

- **Bilingual Support**: Full Arabic (RTL) and English (LTR) interface
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Analytics Dashboard**: Real-time feedback visualization with charts
- **Data Export**: CSV export functionality for feedback analysis
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Database Integration**: PostgreSQL with Drizzle ORM

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- PostgreSQL database (or use the included Neon setup)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd feedback-collection-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file with your database URL
DATABASE_URL=your_postgresql_connection_string
```

4. Push database schema:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **shadcn/ui** components with Radix UI primitives
- **Tailwind CSS** for styling
- **TanStack Query** for server state management
- **Wouter** for client-side routing
- **React Hook Form** with Zod validation

### Backend
- **Express.js** REST API
- **TypeScript** for type safety
- **Drizzle ORM** with PostgreSQL
- **Zod** for runtime validation
- **Express Session** for session management

### Database
- **PostgreSQL** with Neon serverless connection
- **Drizzle ORM** for type-safe database operations
- **Shared schemas** between frontend and backend

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── lib/           # Utilities and configurations
│   │   └── hooks/         # Custom React hooks
├── server/                # Express.js backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database abstraction layer
│   └── vite.ts           # Vite integration
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema and validation
└── dist/                 # Build output
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push schema changes to database

## 📊 Analytics Features

The application includes a comprehensive analytics dashboard:

- **Real-time Statistics**: Total feedback count, satisfaction breakdown
- **Visual Charts**: Bar charts for ratings, pie charts for source distribution
- **Recent Feedback**: List of latest submissions
- **Export Functionality**: Download feedback data as CSV

## 🌐 Internationalization

- **Arabic (RTL)**: Full right-to-left layout support
- **English (LTR)**: Standard left-to-right layout
- **Dynamic Language Switching**: Users can switch languages seamlessly
- **Localized Content**: All UI text and messages are translated

## 🔧 Configuration

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `NODE_ENV` - Environment mode (development/production)

### Database Setup

The application uses PostgreSQL with Drizzle ORM. To set up the database:

1. Create a PostgreSQL database
2. Set the `DATABASE_URL` environment variable
3. Run `npm run db:push` to create tables

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Deployment Platforms

The application is ready for deployment on:
- **Replit** (recommended)
- **Vercel**
- **Railway**
- **Heroku**
- Any Node.js hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) component library
- Icons from [Lucide React](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)
- Database ORM by [Drizzle](https://orm.drizzle.team/)

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Made with ❤️ for better customer feedback collection**