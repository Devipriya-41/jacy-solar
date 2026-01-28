// app/admin/masters/hero-slides/components/HeroSlideModal.tsx
"use client";

import { X, Upload, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

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

interface HeroSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    formData: Omit<HeroSlide, "id"> & { id?: number },
  ) => Promise<void>;
  editingSlide: HeroSlide | null;
  initialFormData?: Partial<HeroSlide>;
}

interface UploadResponse {
  url: string;
  filename: string;
}

export const HeroSlideModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingSlide,
  initialFormData,
}: HeroSlideModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    buttonText: "Read More",
    buttonLink: "#",
    order: 0,
    isActive: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (editingSlide) {
      setFormData({
        title: editingSlide.title,
        description: editingSlide.description,
        image: editingSlide.image,
        buttonText: editingSlide.buttonText,
        buttonLink: editingSlide.buttonLink,
        order: editingSlide.order,
        isActive: editingSlide.isActive,
      });
      setPreviewImage(editingSlide.image);
    } else if (initialFormData) {
      setFormData((prev) => ({ ...prev, ...initialFormData }));
      if (initialFormData.image) {
        setPreviewImage(initialFormData.image);
      }
    } else {
      setFormData({
        title: "",
        description: "",
        image: "",
        buttonText: "Read More",
        buttonLink: "#",
        order: 0,
        isActive: true,
      });
      setPreviewImage(null);
    }
  }, [editingSlide, initialFormData]);

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error("Upload failed");
      }
      const data: UploadResponse = await response.json();
      setFormData((prev) => ({ ...prev, image: data.url }));
      setPreviewImage(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setTimeout(() => {
        setUploadingImage(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  // Handle file input change
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, WebP, GIF)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }
    const localPreview = URL.createObjectURL(file);
    setPreviewImage(localPreview);

    try {
      await handleImageUpload(file);
    } catch (error) {
      console.log(error);
      setPreviewImage(formData.image);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, image: url });
    if (url) {
      setPreviewImage(url);
    }
  };

  // Clear image
  const handleClearImage = () => {
    setFormData({ ...formData, image: "" });
    setPreviewImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all required fields");
      return;
    }

    setIsSaving(true);
    try {
      await onSubmit(
        editingSlide ? { ...formData, id: editingSlide.id } : formData,
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">
              {editingSlide ? "Edit Slide" : "Create New Slide"}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  placeholder="Enter slide title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                  placeholder="Enter slide description"
                />
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Slide Image *
                  </label>

                  {/* Upload Box */}
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer block"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        {uploadingImage ? (
                          <>
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                            <p className="text-sm text-gray-600">
                              Uploading... {uploadProgress}%
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                              <Upload className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 mb-1">
                                Click to upload
                              </p>
                              <p className="text-sm text-gray-500">
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                PNG, JPG, WebP up to 5MB
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </label>
                  </div>

                  {/* Or Divider */}
                  <div className="flex items-center my-4">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500">OR</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  {/* URL Input */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Enter Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.image}
                        onChange={handleImageUrlChange}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                        placeholder="https://example.com/image.jpg or /img/slide.jpg"
                      />
                      {formData.image && (
                        <button
                          type="button"
                          onClick={handleClearImage}
                          className="px-4 py-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          order: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                    />
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={formData.isActive}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              isActive: e.target.checked,
                            })
                          }
                          className="sr-only"
                        />
                        <div
                          className={`w-12 h-6 rounded-full transition-colors ${formData.isActive ? "bg-blue-600" : "bg-gray-300"}`}
                        >
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.isActive ? "translate-x-6" : ""}`}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">
                        Active
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  Live Preview
                </h4>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="Preview"
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        unoptimized={previewImage.startsWith("/img/")}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-400 mb-3" />
                        <span className="text-gray-500">No image selected</span>
                        <p className="text-sm text-gray-400 mt-2">
                          Upload or enter URL
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h5 className="text-lg font-bold text-gray-900 mb-2">
                      {formData.title || "Your Slide Title"}
                    </h5>
                    <p className="text-gray-600 text-sm mb-4">
                      {formData.description ||
                        "Slide description will appear here..."}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${formData.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {formData.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Order:</span>
                    <span className="font-semibold">{formData.order}</span>
                  </div>
                  {formData.image && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Image:</span>
                      <span className="text-xs font-mono text-blue-600 truncate max-w-[200px]">
                        {formData.image.length > 30
                          ? `${formData.image.substring(0, 30)}...`
                          : formData.image}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex gap-3 pt-8 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || uploadingImage}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {editingSlide ? "Updating..." : "Creating..."}
                </span>
              ) : editingSlide ? (
                "Update Slide"
              ) : (
                "Create Slide"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
