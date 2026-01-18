// db/schema/index.ts

// Import and re-export all schema definitions
// Adjust the import paths based on your file names

// Auth schema
export * from './auth-schema';

// Don't export utils if it just contains utility functions and not schema definitions
// export * from './utils';

// Note: Make sure each of these files uses named exports for schema objects
// For example:
// export const users = pgTable('users', { ... });
// export const usersRelations = relations(users, ({ many }) => ({ ... }));