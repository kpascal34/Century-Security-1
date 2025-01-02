# Century Security Management System

A modern, secure, and efficient management system for Century Security UK, built with Next.js 14 and featuring a clean, professional design inspired by Flyhyer's functionality.

## Features

- 📱 Responsive design optimized for all devices
- 🔒 Secure authentication and authorization
- 📊 Staff management and scheduling
- 📝 Training and compliance tracking
- 💼 Client portal and venue management
- 📋 Timesheets and reporting
- 🧾 Invoicing system

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js
- **Database:** Prisma with PostgreSQL
- **UI Components:** Headless UI
- **Icons:** Heroicons
- **Animations:** Framer Motion

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/century-security.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables in `.env.local`

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
century-security/
├── app/                # Next.js app directory
│   ├── api/           # API routes
│   ├── (auth)/        # Authentication pages
│   ├── dashboard/     # Dashboard pages
│   └── ...           # Other app routes
├── components/        # Reusable components
├── lib/              # Utility functions
├── prisma/           # Database schema
└── public/           # Static assets
```

## Development Guidelines

- Follow the [Next.js](https://nextjs.org/) best practices
- Use TypeScript for type safety
- Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
- Write tests for critical functionality
- Keep components small and reusable
- Use proper error handling and loading states

## Deployment

The application is configured for deployment on Vercel:

1. Push your changes to the main branch
2. Vercel will automatically deploy the updates
3. Monitor the deployment in the Vercel dashboard

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is private and proprietary to Century Security UK.

## Support

For support, please contact the development team or raise an issue in the repository. 
