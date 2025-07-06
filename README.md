# MERN E-commerce Hub

A full-stack e-commerce application built with the MERN stack (MongoDB/PostgreSQL, Express.js, React, Node.js) featuring modern UI components and real-time functionality.

## 🚀 Features

- **Modern UI/UX**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Authentication**: Secure user authentication and session management
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Email Integration**: Contact form with email notifications
- **Real-time Features**: WebSocket support for live updates
- **Admin Panel**: Complete admin interface for product management
- **Payment Integration**: Ready for payment gateway integration

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **Framer Motion** for animations
- **React Query** for data fetching

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **PostgreSQL** with Neon database
- **Drizzle ORM** for database operations
- **Passport.js** for authentication
- **Nodemailer** for email functionality
- **WebSocket** for real-time features

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MernEcommerceHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL=your_postgresql_connection_string
   
   # Email Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=your-email@gmail.com
   
   # Environment
   NODE_ENV=development
   ```

4. **Database Setup**
   ```bash
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## 🚀 Deployment

### Render Deployment

1. **Connect your GitHub repository to Render**
2. **Set Environment Variables** in Render dashboard:
   - `DATABASE_URL`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `CONTACT_EMAIL`
   - `NODE_ENV=production`

3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `npm start`

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
DATABASE_URL=your_production_database_url
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@gmail.com
NODE_ENV=production
```

## 📁 Project Structure

```
MernEcommerceHub/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                 # Express.js backend
│   ├── routes.ts          # API routes
│   ├── db.ts              # Database configuration
│   ├── emailService.ts    # Email functionality
│   └── storage.ts         # File storage handling
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema
└── attached_assets/        # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - TypeScript type checking
- `npm run db:push` - Push database schema changes

## 📧 Email Setup

For email functionality, follow the guide in `EMAIL_SETUP.md`:

1. Enable 2-Factor Authentication on your Gmail
2. Generate an App Password
3. Configure SMTP settings in your `.env` file

## 🔒 Security

- Environment variables for sensitive data
- Input validation with Zod
- Secure session management
- CORS configuration
- Rate limiting (recommended for production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, please check the documentation or create an issue in the repository. 