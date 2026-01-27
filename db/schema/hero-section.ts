// schema.ts - Database schema for admin content management
import { pgTable, text, timestamp, integer, boolean, serial } from "drizzle-orm/pg-core";

// Admin users table
export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // hashed password
  name: text("name").notNull(),
  role: text("role").notNull().default("admin"), // admin, super_admin
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Hero slides table
export const heroSlides = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(), // image URL or path
  buttonText: text("button_text").notNull().default("Read More"),
  buttonLink: text("button_link").notNull().default("#"),
  order: integer("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// About section table
export const aboutSection = pgTable("about_section", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull().default("About Us"),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  buttonText: text("button_text").notNull().default("Explore More"),
  buttonLink: text("button_link").notNull().default("/about"),
  features: text("features").notNull(), // JSON array of features
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Services table
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // icon name (e.g., 'Plane', 'Handshake', 'Wrench')
  image: text("image").notNull(),
  buttonText: text("button_text").notNull().default("Read More"),
  buttonLink: text("button_link").notNull().default("/services"),
  order: integer("order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Services section header
export const servicesHeader = pgTable("services_header", {
  id: serial("id").primaryKey(),
  heading: text("heading").notNull().default("Our Services"),
  title: text("title").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});