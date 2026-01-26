// db/seed.ts
import { db } from "./index";
import { users, accounts } from "./schema/auth-schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export async function seedAdminUser() {
  console.log("Seeding admin user...");

  const adminEmail = process.env.ADMIN_EMAIL || "priyavenkatesan41@gmail.com";
  const adminName = process.env.ADMIN_NAME || "Super Admin";
  const adminRole = process.env.ADMIN_ROLE || "super_admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";

  try {
    // First, delete existing admin user if exists (for clean reseed)
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.email, adminEmail));

    if (existingAdmin.length > 0) {
      console.log(`⚠️  Existing admin found. Deleting for clean reseed...`);

      // Delete accounts first (due to foreign key)
      await db.delete(accounts).where(eq(accounts.userId, existingAdmin[0].id));

      // Then delete user
      await db.delete(users).where(eq(users.email, adminEmail));

      console.log("✅ Existing admin deleted");
    }

    // Hash the password - ensure it's a string and properly hashed
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    console.log(
      "Password hash created:",
      hashedPassword.substring(0, 20) + "...",
    );

    // Create the user
    const userId = randomUUID();
    console.log("Creating user with ID:", userId);

    await db.insert(users).values({
      id: userId,
      email: adminEmail,
      name: adminName,
      emailVerified: true,
      role: adminRole,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("✅ User created");

    // Create the password account for the user
    await db.insert(accounts).values({
      id: randomUUID(),
      accountId: userId,
      providerId: "credential",
      userId: userId,
      password: hashedPassword, // Store the bcrypt hash directly
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log(`✅ Admin user created successfully`);
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Name: ${adminName}`);
    console.log(`   Role: ${adminRole}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`\n⚠️  IMPORTANT: Change your password after first login!`);
  } catch (error) {
    console.error("❌ Error seeding admin user:", error);
    throw error;
  }

  console.log("✅ Admin user seeding completed\n");
}
