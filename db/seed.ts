// db/seed.ts
import { db } from "./index";
import { users, accounts } from "./schema/auth-schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export async function seedAdminUser() {
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
      await db.delete(accounts).where(eq(accounts.userId, existingAdmin[0].id));
      await db.delete(users).where(eq(users.email, adminEmail));
    }
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    // Create the user
    const userId = randomUUID();

    await db.insert(users).values({
      id: userId,
      email: adminEmail,
      name: adminName,
      emailVerified: true,
      role: adminRole,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Create the password account for the user
    await db.insert(accounts).values({
      id: randomUUID(),
      accountId: userId,
      providerId: "credential",
      userId: userId,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log(`Admin user created successfully`);
  } catch (error) {
    console.error("Error seeding admin user:", error);
    throw error;
  }
}
