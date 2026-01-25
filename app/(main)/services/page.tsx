// app/services/page.tsx
"use client";
import Image from "next/image";
import { FaSolarPanel, FaWind, FaLightbulb } from "react-icons/fa";

interface ServiceCard {
  image: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}

interface ConsultingCard {
  image: string;
  title: string;
  description: string;
  delay: string;
}

const tradingServices: ServiceCard[] = [
  {
    image: "/img/img-600x400-1.jpg",
    icon: <FaSolarPanel className="text-3xl text-white" />,
    title: "Solar & Renewable Energy Products",
    description:
      "Solar PV modules, solar water heater, solar street light, solar power plant (On-grid and off-grid), solar batteries, solar inverter, ACDB box, DCDB box, earthing electrode, lightning arrestor, solar structures and systems including trackers, electronic interface.",
    delay: "0.1s",
  },
  {
    image: "/img/img-600x400-2.jpg",
    icon: <FaWind className="text-3xl text-white" />,
    title: "Home Appliances",
    description:
      "Upgrade your lifestyle with our cutting-edge home appliances both electrical and electronic items, bringing convenience and efficiency to every corner of your home.",
    delay: "0.3s",
  },
  {
    image: "/img/img-600x400-3.jpg",
    icon: <FaLightbulb className="text-3xl text-white" />,
    title: "Electrical and Plumbing Wholesale",
    description:
      "Supply electrical and plumbing equipment to contractors, construction companies, and hardware stores.",
    delay: "0.5s",
  },
  {
    image: "/img/img-600x400-4.jpg",
    icon: <FaSolarPanel className="text-3xl text-white" />,
    title: "Stationery Products",
    description:
      "Elevate productivity and creativity with our wide range of stationery items and office supplies, providing quality tools for every writing and organizing need.",
    delay: "0.1s",
  },
  {
    image: "/img/img-600x400-5.jpg",
    icon: <FaWind className="text-3xl text-white" />,
    title: "Furnitures",
    description:
      "Transform spaces with our diverse range of furniture items for all Home and Office needs, offering comfort, style, and functionality for homes, offices, and commercial spaces.",
    delay: "0.3s",
  },
  {
    image: "/img/img-600x400-6.jpg",
    icon: <FaLightbulb className="text-3xl text-white" />,
    title: "Agricultural Products",
    description:
      "Farm and Processed Food and Grocery items like spices, vegetables, rice and dry fruits.",
    delay: "0.5s",
  },
];

const consultingServices: ConsultingCard[] = [
  {
    image: "/img/team-1.jpg",
    title: "Management Consulting",
    description:
      "Advising businesses on strategies, operations, organizational structure, and performance improvement.",
    delay: "0.1s",
  },
  {
    image: "/img/team-2.jpg",
    title: "IT Consulting",
    description:
      "Providing expertise in information technology, including system implementation, software development, cybersecurity, and digital transformation.",
    delay: "0.3s",
  },
  {
    image: "/img/team-3.jpg",
    title: "Strategy Consulting",
    description:
      "Assisting organizations with long-term planning, market analysis, competitive positioning, and growth strategies.",
    delay: "0.5s",
  },
];

const advisoryServices: ServiceCard[] = tradingServices.slice(0, 3);

const ServicesPage = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="relative py-20 mb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/carousel-1.jpg"
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
            Services
          </h1>
        </div>
      </div>

      {/* Trading Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h6 className="text-[#51cc82] font-semibold mb-2">Our Services</h6>
            <h2 className="text-4xl font-bold mb-4">Trading</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tradingServices.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 pt-16 relative">
                  <div className="absolute -top-8 left-6 w-16 h-16 bg-[#51cc82] rounded-full flex items-center justify-center shadow-lg">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consulting Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-4">Consulting</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultingServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex">
                  <div className="relative w-3/4 h-64">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h5 className="text-xl font-bold mb-3">{service.title}</h5>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h6 className="text-[#51cc82] font-semibold mb-2">Our Services</h6>
            <h2 className="text-4xl font-bold mb-4">Advisory</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisoryServices.map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 pt-16 relative">
                  <div className="absolute -top-8 left-6 w-16 h-16 bg-[#51cc82] rounded-full flex items-center justify-center shadow-lg">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
