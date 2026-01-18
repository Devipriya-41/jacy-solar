import { db } from "./index";
import { categories } from "./schema/categories";
import { eq } from "drizzle-orm";

const categoryNames = [
  "Agro",
  "Automobiles",
  "Branding & Marketing",
  "Commodities",
  "Electronic Components",
  "Electrical Equipment",
  "FMCG",
  "Food & Beverage",
  "Furniture",
  "Hardware Tools",
  "IT Hardware",
  "IT Software & Tools",
  "Mechanical Equipment",
  "MEP",
  "Medical Consumables",
  "Office Supplies",
  "Packing Material",
  "Pharma Product",
  "Professional Services",
  "Safety & PPE",
  "Transport",
  "Telecom",
  "Waste Management",
  "Workplace Consumables",
];

export async function seedCategories() {
  console.log("Seeding categories...");

  for (const name of categoryNames) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    try {
      const existing = await db
        .select()
        .from(categories)
        .where(eq(categories.slug, slug));

      if (existing.length === 0) {
        await db.insert(categories).values({
          name,
          slug,
        });
        console.log(`Created category: ${name}`);
      }
    } catch (error) {
      console.error(`Error creating category ${name}:`, error);
    }
  }

  console.log("Categories seeding completed");
}
