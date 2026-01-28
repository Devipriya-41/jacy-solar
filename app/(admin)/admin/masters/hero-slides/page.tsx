// app/admin/masters/hero-slides/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  EyeOff,
  Eye,
  ArrowUpDown,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeroSlideModal } from "./hero-slides";

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  isActive: boolean;
}

const HeroSlidesPage = () => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [sortBy, setSortBy] = useState<"order" | "title">("order");

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/admin/hero-slides");
      const data = await response.json();
      setSlides(data);
    } catch (error) {
      toast.error("Failed to load slides");
      console.error("Error fetching slides:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    formData: Omit<HeroSlide, "id"> & { id?: number },
  ) => {
    try {
      const url = "/api/admin/hero-slides";
      const method = formData.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(
          formData.id
            ? "Slide updated successfully!"
            : "Slide created successfully!",
        );
        await fetchSlides();
        handleCloseModal();
      } else {
        throw new Error("Failed to save slide");
      }
    } catch (error) {
      toast.error("Failed to save slide");
      console.error("Error saving slide:", error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this slide?")) return;

    try {
      await fetch(`/api/admin/hero-slides?id=${id}`, {
        method: "DELETE",
      });
      toast.success("Slide deleted successfully!");
      await fetchSlides();
    } catch (error) {
      toast.error("Failed to delete slide");
      console.error("Error deleting slide:", error);
    }
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    try {
      await fetch(`/api/admin/hero-slides`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isActive: !currentStatus }),
      });
      toast.success(`Slide ${!currentStatus ? "activated" : "deactivated"}!`);
      await fetchSlides();
    } catch (error) {
      toast.error("Failed to update slide status");
      console.error("Error updating slide:", error);
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setShowModal(true);
  };

  const handleOpenCreateModal = () => {
    setEditingSlide(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSlide(null);
  };

  const sortedSlides = [...slides].sort((a, b) => {
    if (sortBy === "order") return a.order - b.order;
    return a.title.localeCompare(b.title);
  });

  if (loading && slides.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading slides...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Hero Slides</h1>
            <p className="text-gray-600 mt-2">
              Manage your homepage carousel slides with a beautiful preview
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Add New Slide</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Slides</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {slides.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Slides</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {slides.filter((s) => s.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inactive Slides</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {slides.filter((s) => !s.isActive).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <EyeOff className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSortBy(sortBy === "order" ? "title" : "order")}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            Sort by: {sortBy === "order" ? "Order" : "Title"}
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {sortedSlides.length} {sortedSlides.length === 1 ? "slide" : "slides"}{" "}
          found
        </div>
      </div>

      {/* Slides Grid */}
      {sortedSlides.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No slides yet
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get started by creating your first hero slide. It will appear on
            your homepage carousel.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Your First Slide
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedSlides.map((slide) => (
            <div
              key={slide.id}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 ${slide.isActive ? "border-blue-100" : "border-gray-200"}`}
            >
              {/* Image Container */}
              <div className="relative h-64">
                {slide.image ? (
                  <>
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      unoptimized={slide.image.startsWith("/img/")}
                    />
                    {!slide.isActive && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                        <EyeOff className="w-16 h-16 text-white/80 mb-4" />
                        <span className="text-white font-semibold">
                          Inactive
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
                    <ImageIcon className="w-16 h-16 text-gray-400 mb-4" />
                    <span className="text-gray-500 text-center">No Image</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                    Order: {slide.order}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                    {slide.title}
                  </h3>
                  <button
                    onClick={() => handleToggleActive(slide.id, slide.isActive)}
                    className={`p-2 rounded-lg ${slide.isActive ? "bg-green-100 text-green-600 hover:bg-green-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    title={slide.isActive ? "Deactivate" : "Activate"}
                  >
                    {slide.isActive ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2 min-h-[3rem]">
                  {slide.description}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleEdit(slide)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl font-medium transition-all hover:shadow-lg"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="p-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl transition-all hover:shadow-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <HeroSlideModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editingSlide={editingSlide}
      />
    </div>
  );
};
export default HeroSlidesPage;
