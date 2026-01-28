// app/admin/dashboard/about/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Trash2,
  Upload,
  X,
  Image as ImageIcon,
  CheckCircle,
  Eye,
  Sparkles,
  Settings,
  Palette,
  Layout,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AboutData {
  id?: number;
  heading: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  features: string[];
  isActive: boolean;
}

interface UploadResponse {
  url: string;
  filename: string;
}

const AboutPage = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<AboutData>({
    heading: "About Us",
    title: "",
    description: "",
    image: "",
    buttonText: "Explore More",
    buttonLink: "/about",
    features: [],
    isActive: true,
  });
  const [newFeature, setNewFeature] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<"content" | "design" | "features">(
    "content",
  );

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch("/api/admin/about");
      if (response.ok) {
        const data = await response.json();
        setAboutData(data);
        if (data) {
          setFormData(data);
        }
      }
    } catch (error) {
      console.error("Error fetching about data:", error);
      toast.error("Failed to load about section data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = "/api/admin/about";
      const method = aboutData ? "PUT" : "POST";
      const body = aboutData ? { ...formData, id: aboutData.id } : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        await fetchAboutData();
        toast.success("About section updated successfully!");
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving about data:", error);
      toast.error("Failed to save about section");
    } finally {
      setSaving(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      });
      setNewFeature("");
      toast.success("Feature added!");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
    toast.info("Feature removed");
  };

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
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
    } finally {
      setTimeout(() => {
        setUploadingImage(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, WebP, GIF)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    try {
      await handleImageUpload(file);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setFormData({ ...formData, image: "" });
    toast.info("Image cleared");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading about section...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Layout className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                About Section Editor
              </h1>
            </div>
            <p className="text-gray-600 text-sm">
              Design and manage your about section with real-time preview
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${formData.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
            >
              {formData.isActive ? "🟢 Active" : "⚫ Inactive"}
            </div>
            <div className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              {formData.features.length} Features
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            {/* Tabs */}
            <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-lg w-fit">
              <button
                onClick={() => setActiveTab("content")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "content" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Palette className="w-4 h-4" />
                Content
              </button>
              <button
                onClick={() => setActiveTab("features")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "features" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Sparkles className="w-4 h-4" />
                Features
              </button>
              <button
                onClick={() => setActiveTab("design")}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "design" ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {activeTab === "content" && (
                <>
                  {/* Heading & Title */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={formData.heading}
                        onChange={(e) =>
                          setFormData({ ...formData, heading: e.target.value })
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-sm"
                        placeholder="About Us"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
                        Main Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-sm"
                        placeholder="Enter main title"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-sm resize-none"
                      placeholder="Write your about section description here..."
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
                      Featured Image *
                    </label>

                    {/* Upload Box */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                      <div
                        onClick={triggerFileInput}
                        className="cursor-pointer block"
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          {uploadingImage ? (
                            <>
                              <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-600">
                                Uploading... {uploadProgress}%
                              </p>
                            </>
                          ) : (
                            <>
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Upload className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 text-sm mb-1">
                                  Click to upload image
                                </p>
                                <p className="text-xs text-gray-500">
                                  or drag and drop
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* URL Input */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="text-xs text-gray-500 font-medium">
                          OR
                        </span>
                        <div className="flex-1 border-t border-gray-300"></div>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          required
                          value={formData.image}
                          onChange={(e) =>
                            setFormData({ ...formData, image: e.target.value })
                          }
                          className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-sm"
                          placeholder="/img/about.jpg"
                        />
                        {formData.image && (
                          <button
                            type="button"
                            onClick={clearImage}
                            className="px-3 py-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "features" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
                      Add Key Feature
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addFeature())
                        }
                        className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-sm"
                        placeholder="Add a feature (e.g., '24/7 Support')"
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-2.5 rounded-lg transition-all text-sm font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-800 uppercase tracking-wider">
                        Features ({formData.features.length})
                      </span>
                      <span className="text-xs text-gray-500">
                        Drag to reorder
                      </span>
                    </div>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {formData.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white px-3 py-3 rounded-lg group hover:from-blue-50 hover:to-blue-100 transition-all border border-gray-200 hover:border-blue-300"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1 bg-blue-100 rounded">
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-gray-800 text-sm font-medium">
                              {feature}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "design" && (
                <div className="space-y-4">
                  {/* Button Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
                        Button Text
                      </label>
                      <input
                        type="text"
                        value={formData.buttonText}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            buttonText: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-gray-800 uppercase tracking-wider">
                        Button Link
                      </label>
                      <input
                        type="text"
                        value={formData.buttonLink}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            buttonLink: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors text-sm"
                        placeholder="/about"
                      />
                    </div>
                  </div>

                  {/* Active Toggle */}
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-300">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Publish Status
                      </p>
                      <p className="text-xs text-gray-600">
                        Control section visibility
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            isActive: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={saving || uploadingImage}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving Changes...
                  </span>
                ) : (
                  "Save About Section"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Preview Section */}
        <div className="space-y-4 md:space-y-6">
          {/* Live Preview */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Eye className="w-4 h-4 text-gray-500" />
                Live Preview
              </h3>
              <div className="text-xs text-gray-500">Desktop View</div>
            </div>

            <div className="space-y-4">
              {/* Preview Header */}
              <div className="text-center space-y-1">
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">
                  {formData.heading || "About Us"}
                </p>
                <h2 className="text-lg font-bold text-gray-900">
                  {formData.title || "Your Title Here"}
                </h2>
              </div>

              {/* Preview Image */}
              <div className="relative h-40 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    unoptimized={formData.image.startsWith("/img/")}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4">
                    <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-gray-500 text-sm">
                      No image selected
                    </span>
                  </div>
                )}
              </div>

              {/* Preview Description */}
              <p className="text-gray-600 text-xs leading-relaxed">
                {formData.description || "Your description will appear here..."}
              </p>

              {/* Preview Features */}
              {formData.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    Key Features:
                  </h4>
                  <div className="space-y-1.5">
                    {formData.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span className="text-xs text-gray-700">{feature}</span>
                      </div>
                    ))}
                    {formData.features.length > 3 && (
                      <div className="text-xs text-gray-500 pl-2.5">
                        +{formData.features.length - 3} more features
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Preview Button */}
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all text-sm">
                {formData.buttonText || "Explore More"}
              </button>

              {/* Preview Stats */}
              <div className="pt-3 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div className="text-xs font-semibold text-gray-900">
                      Status
                    </div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full font-medium mt-1 ${formData.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                    >
                      {formData.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-semibold text-gray-900">
                      Features
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {formData.features.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
