// app/page.jsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-3xl text-center space-y-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900 dark:text-white">
          Welcome to Your Next.js Boilerplate
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400">
          A powerful starter template with authentication, Drizzle ORM, and PostgreSQL.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link href="/login" passHref>
            <Button className="px-8 py-6 text-lg" size="lg">
              Login
            </Button>
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Better Auth</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Secure and easy-to-implement authentication system.</p>
          </div>
          
          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Drizzle ORM</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Type-safe database operations with Drizzle ORM.</p>
          </div>
          
          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">PostgreSQL</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Reliable and powerful database for your application.</p>
          </div>

          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Nodemailer</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Email sending capabilities for notifications, verifications, and password resets.</p>
          </div>
        </div>
      </div>
    </div>
  );
}