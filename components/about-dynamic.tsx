// components/about-dynamic.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

interface AboutData {
  heading: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  features: string[];
}

export const AboutDynamic = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch("/api/admin/about");
      if (response.ok) {
        const data = await response.json();
        setAboutData(data);
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (!aboutData) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="h-96 lg:h-full min-h-[400px]">
            <div className="relative w-full h-full">
              <Image
                src={aboutData.image}
                alt={aboutData.title}
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h6 className="text-primary font-semibold">{aboutData.heading}</h6>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {aboutData.title}
            </h1>
            <p className="text-gray-600">{aboutData.description}</p>

            <div className="space-y-3">
              {aboutData.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href={aboutData.buttonLink}
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-full transition mt-4"
            >
              {aboutData.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};