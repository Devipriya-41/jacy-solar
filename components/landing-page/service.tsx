'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plane, Handshake, Wrench, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Plane,
    title: 'Trading',
    description: 'Discover a world of possibilities in trading with our extensive product selection, seamless logistics, and dedicated support, empowering your business growth.',
    image: '/images/img-600x400-1.jpg',
  },
  {
    icon: Handshake,
    title: 'Consulting',
    description: 'Expert consulting services tailored to your unique needs, guiding your business towards success with strategic insights and innovative solutions.',
    image: '/images/img-600x400-2.jpg',
  },
  {
    icon: Wrench,
    title: 'Advisory',
    description: 'Empowering your decisions with insightful advisory services, providing clarity and confidence in navigating complex challenges.',
    image: '/images/img-600x400-3.jpg',
  },
];

export const Services = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h6 className="text-primary font-semibold mb-2">Our Services</h6>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            We Are Pioneers In The World Of Renewable Energy
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="absolute -top-8 left-6 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3 mt-8">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <Link
                    href="/services"
                    className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-2 transition"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}