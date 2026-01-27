// app/admin/dashboard/page.tsx
import { db } from "@/db";
import { heroSlides, aboutSection, services } from "@/db/schema";
import { ImageIcon, Info, Briefcase, CheckCircle } from "lucide-react";

const AdminDashboardPage = async () => {
  // Fetch counts
  const heroCount = await db.select().from(heroSlides);
  const aboutCount = await db.select().from(aboutSection);
  const servicesCount = await db.select().from(services);

  const stats = [
    {
      title: "Hero Slides",
      count: heroCount.length,
      icon: ImageIcon,
      color: "bg-blue-500",
      href: "/admin/dashboard/hero-slides",
    },
    {
      title: "About Section",
      count: aboutCount.length,
      icon: Info,
      color: "bg-green-500",
      href: "/admin/dashboard/about",
    },
    {
      title: "Services",
      count: servicesCount.length,
      icon: Briefcase,
      color: "bg-purple-500",
      href: "/admin/dashboard/services",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Dashboard Overview
        </h2>
        <p className="text-gray-600">
          Welcome to your content management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <a
              key={index}
              href={stat.href}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-gray-800">
                  {stat.count}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {stat.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Manage {stat.title.toLowerCase()}
              </p>
            </a>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/dashboard/hero-slides"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <CheckCircle className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-700">Add New Slide</span>
          </a>
          <a
            href="/admin/dashboard/about"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-gray-700">
              Edit About Section
            </span>
          </a>
          <a
            href="/admin/dashboard/services"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition"
          >
            <CheckCircle className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-gray-700">Add New Service</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
