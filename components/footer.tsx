import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Office Info */}
          <div>
            <h5 className="text-white text-lg font-bold mb-4">Office</h5>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm">
                  Gudalur, The Nilgiris, TamilNadu - 643212
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">+91-741-888-0930</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm">jctcteam@gmail.com</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Link
                href="#"
                className="w-10 h-10 border border-gray-600 rounded flex items-center justify-center hover:bg-primary hover:border-primary transition"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 border border-gray-600 rounded flex items-center justify-center hover:bg-primary hover:border-primary transition"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 border border-gray-600 rounded flex items-center justify-center hover:bg-primary hover:border-primary transition"
              >
                <Youtube className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 border border-gray-600 rounded flex items-center justify-center hover:bg-primary hover:border-primary transition"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white text-lg font-bold mb-4">Quick Links</h5>
            <div className="space-y-2">
              <Link
                href="/about"
                className="block hover:text-primary transition"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block hover:text-primary transition"
              >
                Contact Us
              </Link>
              <Link
                href="/services"
                className="block hover:text-primary transition"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* Project Gallery */}
          <div className="md:col-span-2">
            <h5 className="text-white text-lg font-bold mb-4">
              Project Gallery
            </h5>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="h-20 rounded overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={`/img/gallery-${num}.jpg`}
                      alt={`Gallery ${num}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              &copy;{" "}
              <Link href="/" className="text-primary hover:underline">
                JACY Trading & Consulting LLP
              </Link>
              , All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
