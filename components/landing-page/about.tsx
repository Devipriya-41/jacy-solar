import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const About = () => {
  const features = [
    'Durable home appliances',
    'Solar and renewable energy products',
    'Agricultural Products',
    'Stationery Products',
    'Consulting & Advisory',
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="h-96 lg:h-full min-h-[400px]">
            <div className="relative w-full h-full">
              <Image
                src="/images/about.jpg"
                alt="About JACY Trading"
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <h6 className="text-primary font-semibold">About Us</h6>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              10+ Years of Experience Across Multiple Domains & Industries
            </h1>
            <p className="text-gray-600">
              JACY Trading and Consulting LLP is Headquartered in Gudalur, Tamil Nadu and a branch office at Coimbatore. We are a committed team of professionals with experience of more than 10 years in trading and consulting domains. Incorporated in 2023, have differentiated our business into the two major vertical which has been further sub-divided as per the nature of the products/ service/ activity - for better customer experience.
            </p>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-full transition mt-4"
            >
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}