"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/img/carousel-1.jpg",
    title: "Human Centric Trading",
    description:
      "A Human-centric Approach in Trading, a New Way, One that is Centred Around the Values, Needs and Expectation of People.",
  },
  {
    image: "/img/carousel-2.jpg",
    title: "Consulting to Simplify",
    description:
      "Simplifying Businesses by Optimizing and Thereby Enhancing the Growth; Streamlining the Business Processes.",
  },
  {
    image: "/img/carousel-3.jpg",
    title: "Passion to Excel",
    description:
      "Leader in Current Technologies and Industry Domains to Create Impactful Solutions.",
  },
];

export const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative w-full h-full">
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-slide-in-down">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white mb-8 animate-fade-in">
                  {slide.description}
                </p>
                <button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-full transition animate-slide-in-left">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full transition"
      >
        <ChevronLeft className="w-6 h-6 text-dark" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full transition"
      >
        <ChevronRight className="w-6 h-6 text-dark" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-primary" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
