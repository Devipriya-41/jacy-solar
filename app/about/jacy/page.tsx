// app/about/jacy/page.tsx
"use client";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { FaChartLine, FaEye, FaCoins, FaArrowRight } from "react-icons/fa";

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - JACY TRADING & CONSULTING</title>
        <meta
          name="description"
          content="Learn about JACY Trading & Consulting"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Page Header with Background Image - FIXED IMAGE PATH */}
      <div className="relative py-20 mb-12 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* FIX: Added proper image extension and fallback */}
          <Image
            src="/img/carousel-1.jpg" // Changed from /img/carousel-1 to /img/carousel-1.jpg
            alt="About Us Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />

          <div className="absolute inset-0 "></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-5xl text-white font-bold m-5">
            About Us
          </h1>
        </div>
      </div>

      {/* Mission, Vision, Goal Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-2xl md:text-3xl font-bold">
            We excel as pioneers in our field, leading the way with our
            exceptional work
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mission Card */}
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-64">
              <Image
                src="/img/img-600x400-1.jpg"
                alt="Mission"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-6 pt-16 relative">
              <div className="absolute -top-8 left-6 bg-[#51cc82] text-white p-4 rounded-full shadow-lg">
                <FaChartLine className="text-3xl" />
              </div>
              <h4 className="text-xl font-bold mb-3">Mission</h4>
              <p className="text-gray-600 mb-4">
                To be a responsible leader, creator, processor, developer in
                enhancing, boosting, improvising the quality, experience of the
                Human Life through our products, services, consulting, advisory
                expertise and experience.
              </p>
              <Link
                href="/service"
                className="text-[#51cc82] font-medium hover:underline inline-flex items-center"
              >
                Read More <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Vision Card */}
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-64">
              <Image
                src="/img/img-600x400-2.jpg"
                alt="Vision"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-6 pt-16 relative">
              <div className="absolute -top-8 left-6 bg-[#51cc82] text-white p-4 rounded-full shadow-lg">
                <FaEye className="text-3xl" />
              </div>
              <h4 className="text-xl font-bold mb-3">Vision</h4>
              <p className="text-gray-600 mb-4">
                To be our clients&apos; highly valued first call, the preferred
                collaboration partner, the most admired and successfully
                organised company that celebrates, enhances the quality of life!
              </p>
              <Link
                href="/service"
                className="text-[#51cc82] font-medium hover:underline inline-flex items-center"
              >
                Read More <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>

          {/* Goal Card */}
          <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="relative h-64">
              <Image
                src="/img/img-600x400-3.jpg"
                alt="Goal"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-6 pt-16 relative">
              <div className="absolute -top-8 left-6 bg-[#51cc82] text-white p-4 rounded-full shadow-lg">
                <FaCoins className="text-3xl" />
              </div>
              <h4 className="text-xl font-bold mb-3">Goal</h4>
              <p className="text-gray-600 mb-4">
                Our commitment is to indicate our passion, how we value our
                business – by offering premium products/services at a genuinely
                competitive price without ever compromising on the quality &
                performance.
              </p>
              <Link
                href="/service"
                className="text-[#51cc82] font-medium hover:underline inline-flex items-center"
              >
                Read More <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <a
        href="#"
        className="fixed bottom-8 right-8 w-12 h-12 bg-[#51cc82] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#3da566] transition z-50"
      >
        ↑
      </a>
    </>
  );
};

export default About;
