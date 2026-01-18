// src/scripts/seed.ts
import { seedCategories } from '../db/seed';

async function main() {
  try {
    await seedCategories();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

main();