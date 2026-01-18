# Next.js Boilerplate

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), enhanced with better authentication, Drizzle ORM, PostgreSQL, and Nodemailer.

## Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL database
- Email provider account (for Nodemailer)
- OAuth provider accounts (Google, LinkedIn)
- Install PostGres - https://www.postgresql.org/download/windows/
- Install Xampp

### Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```bash
# Environment configuration
NODE_ENV="development"

# Application configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Database connection settings
DB_HOST="localhost"
DB_PORT=5432
DB_USER="postgres"
DB_PASSWORD="password"
DB_NAME="nextjs-boilerplate"
DB_SSL="false"
DATABASE_URL=postgresql://username:password@localhost:5432/your_database

# Authentication configuration
BETTER_AUTH_SECRET="your_better_auth_secret"
BETTER_AUTH_URL="http://localhost:3000"

# Email (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_password
SMTP_FROM=your_email@example.com

# Authentication Providers
# For Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# For LinkedIn OAuth
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# Next Auth (if using)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Database Setup

1. Run the database schema generation:

```bash
npm run db:generate
```

2. Apply migrations to your database:

```bash
npm run db:migrate
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

### Better Authentication

This boilerplate includes a robust authentication system with:

- Social login with Google and LinkedIn
- Email verification
- Password reset functionality
- Role-based access control
- Session management
- API key authentication for headless access

### Drizzle ORM

[Drizzle ORM](https://orm.drizzle.team/) provides a type-safe, lightweight ORM for TypeScript with:

- Schema definition with TypeScript
- Migrations management
- Query building with type safety
- Relations and joins
- Transactions

Learn more:
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [TypeScript Integration](https://orm.drizzle.team/docs/typescript)
- [PostgreSQL Usage](https://orm.drizzle.team/docs/rqb)

### PostgreSQL

This project utilizes PostgreSQL as the primary database:

- Relational data model
- ACID compliant
- Excellent performance for complex queries
- Rich feature set including JSON support
- Widely adopted and supported

Learn more:
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL with Drizzle](https://orm.drizzle.team/docs/get-started-postgresql)

### Nodemailer

[Nodemailer](https://nodemailer.com/) integration for sending emails:

- Email verification
- Password reset
- Notification emails
- Custom templates
- SMTP configuration

Learn more:
- [Nodemailer Documentation](https://nodemailer.com/about/)
- [Transports](https://nodemailer.com/transports/)
- [Message Configuration](https://nodemailer.com/message/)

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── auth/             # Authentication pages
│   └── ...               # Other pages
├── components/           # React components
├── db/                   # Database related files
│   ├── migrations/       # Generated migrations
│   └── schema/           # Drizzle schema definitions
├── lib/                  # Library code
│   ├── auth/             # Authentication utilities
│   ├── email/            # Email utilities
│   └── db/               # Database utilities
└── ...
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
