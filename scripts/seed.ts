// src/scripts/seed.ts
import { seedAdminUser } from "../db/seed";

async function main() {
  try {
    await seedAdminUser();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main();
