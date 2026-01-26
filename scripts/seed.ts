// src/scripts/seed.ts
import { seedAdminUser } from "../db/seed";

async function main() {
  try {
    console.log(" Starting database seeding...\n");

    await seedAdminUser();

    console.log("\n🎉 All seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

main();
