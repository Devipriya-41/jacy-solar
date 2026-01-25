// app/projects/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FaEye,
  FaLink,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
} from "react-icons/fa";

interface Project {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
}

interface Testimonial {
  id: number;
  name: string;
  profession: string;
  image: string;
  quote: string;
}

const projects: Project[] = [
  {
    id: 1,
    image: "/img/img-600x400-6.jpg",
    category: "solar",
    title: "Solar Panels",
    description: "We Are pioneers of solar & renewable energy industry",
  },
  {
    id: 2,
    image: "/img/img-600x400-5.jpg",
    category: "wind",
    title: "Wind Turbines",
    description: "We Are pioneers of solar & renewable energy industry",
  },
  {
    id: 3,
    image: "/img/img-600x400-4.jpg",
    category: "hydro",
    title: "Hydropower Plants",
    description: "We Are pioneers of solar & renewable energy industry",
  },
  {
    id: 4,
    image: "/img/img-600x400-3.jpg",
    category: "solar",
    title: "Solar Panels",
    description: "We Are pioneers of solar & renewable energy industry",
  },
  {
    id: 5,
    image: "/img/img-600x400-2.jpg",
    category: "wind",
    title: "Wind Turbines",
    description: "We Are pioneers of solar & renewable energy industry",
  },
  {
    id: 6,
    image: "/img/img-600x400-1.jpg",
    category: "hydro",
    title: "Hydropower Plants",
    description: "We Are pioneers of solar & renewable energy industry",
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Smith",
    profession: "Business Owner",
    image: "/img/testimonial-1.jpg",
    quote:
      "Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    profession: "Project Manager",
    image: "/img/testimonial-2.jpg",
    quote:
      "The service was exceptional! They delivered our solar project on time and within budget. Highly recommended for anyone looking for renewable energy solutions.",
  },
  {
    id: 3,
    name: "Michael Brown",
    profession: "CEO",
    image: "/img/testimonial-3.jpg",
    quote:
      "Working with JACY Trading was a game-changer for our business. Their consulting expertise helped us optimize our energy consumption and reduce costs significantly.",
  },
  {
    id: 4,
    name: "Emma Wilson",
    profession: "Operations Director",
    image: "/img/testimonial-1.jpg", // You can add more images
    quote:
      "Professional, reliable, and knowledgeable team. They transformed our office with efficient energy solutions that are both eco-friendly and cost-effective.",
  },
  {
    id: 5,
    name: "David Lee",
    profession: "IT Consultant",
    image: "/img/testimonial-2.jpg", // You can add more images
    quote:
      "The advisory services provided by JACY helped us make informed decisions about our energy infrastructure. Their team is truly dedicated to client success.",
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "solar", label: "Solar Panels" },
  { id: "wind", label: "Wind Turbines" },
  { id: "hydro", label: "Hydropower Plants" },
];

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [isClient, setIsClient] = useState(false);

  // Testimonial carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const testimonialRef = useRef<HTMLDivElement>(null);

  // This helps prevent hydration errors
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto slide testimonials
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        nextTestimonial();
      }, 5000); // Change testimonial every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isHovering]);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  const openLightbox = (image: string) => {
    setLightboxImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxImage("");
  };

  // Testimonial navigation
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  // Don't render if not on client to prevent hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <main>
      {/* Page Header */}
      <div className="relative py-20 mb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/carousel-1.jpg"
            alt="Projects Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 "></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl text-white font-bold">
            Projects
          </h1>
        </div>
      </div>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter Buttons */}
          <div className="text-center mb-12">
            <ul className="inline-flex flex-wrap gap-4 justify-center">
              {filters.map((filter) => (
                <li key={filter.id}>
                  <button
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-6 py-2 rounded-full transition-all duration-300 ${
                      activeFilter === filter.id
                        ? "bg-[#51cc82] text-white shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {filter.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group">
                <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#51cc82]/0 group-hover:bg-[#51cc82]/90 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-4">
                      <button
                        onClick={() => openLightbox(project.image)}
                        className="w-12 h-12 rounded-full bg-white text-[#51cc82] flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="View image"
                      >
                        <FaEye className="text-xl" />
                      </button>
                      <button
                        className="w-12 h-12 rounded-full bg-white text-[#51cc82] flex items-center justify-center hover:bg-gray-100 transition-colors"
                        aria-label="View project"
                      >
                        <FaLink className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="pt-4">
                  <p className="text-[#51cc82] font-semibold mb-2">
                    {project.title}
                  </p>
                  <div className="w-1/4 h-0.5 bg-[#51cc82] mb-3"></div>
                  <h5 className="text-lg font-medium leading-relaxed">
                    {project.description}
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Quote Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Image */}
            <div className="relative h-96 lg:h-auto">
              <Image
                src="/img/quote.jpg"
                alt="Get a Quote"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Form */}
            <div className="p-8 lg:p-12">
              <h6 className="text-[#51cc82] font-semibold mb-2">Free Quote</h6>
              <h2 className="text-4xl font-bold mb-4">Get A Free Quote</h2>
              <p className="text-gray-600 mb-6">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo erat amet
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51cc82]"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51cc82]"
                  />
                  <input
                    type="tel"
                    placeholder="Your Mobile"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51cc82]"
                  />
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51cc82]">
                    <option>Select A Service</option>
                    <option value="1">Service 1</option>
                    <option value="2">Service 2</option>
                    <option value="3">Service 3</option>
                  </select>
                </div>
                <textarea
                  placeholder="Special Note"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#51cc82]"
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#51cc82] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#45b872] transition-colors"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Updated with Carousel */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h6 className="text-[#51cc82] font-semibold mb-2">Testimonial</h6>
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say!</h2>
          </div>

          {/* Testimonial Carousel Container */}
          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            ref={testimonialRef}
          >
            {/* Navigation Arrows - Positioned outside with spacing */}
            <button
              onClick={prevTestimonial}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 md:-translate-x-16 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-[#51cc82] transition-all duration-300 hover:bg-[#51cc82] hover:text-white border-2 border-gray-100 ${
                isHovering ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="text-xl md:text-2xl" />
            </button>

            <button
              onClick={nextTestimonial}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 md:translate-x-16 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white shadow-xl flex items-center justify-center text-[#51cc82] transition-all duration-300 hover:bg-[#51cc82] hover:text-white border-2 border-gray-100 ${
                isHovering ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
              aria-label="Next testimonial"
            >
              <FaChevronRight className="text-xl md:text-2xl" />
            </button>

            {/* Testimonial Content */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-5 md:p-5 transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
                {/* Client Image */}
                <div className="relative w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                  <div className="relative w-full h-full">
                    <Image
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      fill
                      className="object-cover rounded-full border-4 border-[#51cc82] p-3"
                      sizes="(max-width: 768px) 192px, 224px"
                    />
                    <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-[#51cc82] rounded-full flex items-center justify-center shadow-lg">
                      <FaQuoteLeft className="text-white text-2xl" />
                    </div>
                  </div>
                </div>

                {/* Testimonial Text */}
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-8">
                    {/* Quote Icon */}
                    <div className="mb-6 md:mb-8">
                      <FaQuoteLeft className="text-4xl text-[#51cc82] opacity-30 mx-auto md:mx-0" />
                    </div>

                    {/* Quote Text */}
                    <blockquote className="mb-8 md:mb-10">
                      <p className="text-gray-700 text-xl md:text-xl italic leading-relaxed font-light">
                        &quot;{testimonials[currentTestimonial].quote}&quot;
                      </p>
                    </blockquote>

                    {/* Separator Line */}
                    <div className="w-20 h-1 bg-[#51cc82] mx-auto md:mx-0 mb-6 rounded-full"></div>

                    {/* Client Info */}
                    <div>
                      <h5 className="text-xl font-bold text-gray-900 mb-2">
                        {testimonials[currentTestimonial].name}
                      </h5>
                      <span className="text-gray-600 italic text-lg">
                        {testimonials[currentTestimonial].profession}
                      </span>
                    </div>
                  </div>

                  {/* Testimonial Dots Indicator */}
                  <div className="flex justify-center md:justify-start gap-3 mt-10">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? "bg-[#51cc82] scale-125"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <Image
              src={lightboxImage}
              alt="Project"
              width={1200}
              height={800}
              className="object-contain max-h-full"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default ProjectsPage;
