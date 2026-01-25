"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setIsAboutDropdown] = useState(false);

  return (
    <>
      {/* Topbar */}
      <div className="bg-dark text-white py-2 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm">
                  Gudalur, The Nilgiris, Tamilnadu - 643212
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm">Mon - Fri : 09.00 AM - 09.00 PM</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">+91 741-888-0930</span>
              </div>
              <div className="flex gap-2">
                <Link
                  href="#"
                  className="w-8 h-8 flex items-center justify-center border-r border-gray-600 hover:text-primary transition"
                >
                  <Facebook className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 flex items-center justify-center border-r border-gray-600 hover:text-primary transition"
                >
                  <Twitter className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 flex items-center justify-center border-r border-gray-600 hover:text-primary transition"
                >
                  <Linkedin className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 flex items-center justify-center hover:text-primary transition"
                >
                  <Instagram className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="py-4 px-6 border-r border-gray-200">
              <h2 className="text-xl lg:text-2xl font-bold text-primary">
                JACY TRADING & CONSULTING
              </h2>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8 py-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-primary transition font-medium"
              >
                Home
              </Link>

              <div
                className="relative group"
                onMouseEnter={() => setIsAboutDropdown(true)}
                onMouseLeave={() => setIsAboutDropdown(false)}
              >
                <Link
                  href="/about/jacy"
                  className="text-gray-700 hover:text-primary transition font-medium"
                >
                  About Us
                </Link>
                {/* {isAboutDropdown && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-2 py-2 min-w-[200px]">
                    <Link
                      href="/about"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary transition"
                    >
                      Why Jacy?
                    </Link>
                  </div>
                )} */}
              </div>

              <Link
                href="/services"
                className="text-gray-700 hover:text-primary transition font-medium"
              >
                Services
              </Link>
              <Link
                href="/projects"
                className="text-gray-700 hover:text-primary transition font-medium"
              >
                Projects
              </Link>
              <Link
                href="/quote"
                className="text-gray-700 hover:text-primary transition font-medium"
              >
                Free Quote
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary transition font-medium"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden pb-4">
              <Link
                href="/"
                className="block py-2 text-gray-700 hover:text-primary transition"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block py-2 text-gray-700 hover:text-primary transition"
              >
                About Us
              </Link>
              <Link
                href="/features"
                className="block py-2 pl-4 text-gray-700 hover:text-primary transition"
              >
                Why Jacy?
              </Link>
              <Link
                href="/services"
                className="block py-2 text-gray-700 hover:text-primary transition"
              >
                Services
              </Link>
              <Link
                href="/projects"
                className="block py-2 text-gray-700 hover:text-primary transition"
              >
                Projects
              </Link>
              <Link
                href="/quote"
                className="block py-2 text-gray-700 hover:text-primary transition"
              >
                Free Quote
              </Link>
              <Link
                href="/contact"
                className="block py-2 text-gray-700 hover:text-primary transition"
              >
                Contact
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
