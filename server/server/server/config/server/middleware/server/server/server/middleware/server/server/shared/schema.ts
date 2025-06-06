import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, pgEnum, doublePrecision, decimal, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// User roles enum
export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'moderator']);

// Basic user management
export const users = pgTable('users', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  username: varchar('username').unique().notNull(),
  email: varchar('email').unique(),
  password: varchar('password'),
  firstName: varchar('first_name'),
  lastName: varchar('last_name'),
  profileImageUrl: varchar('profile_image_url'),
  role: userRoleEnum('role').default('user').notNull(),
  isAdmin: boolean('is_admin').default(false).notNull(),
  stripeCustomerId: varchar('stripe_customer_id'),
  stripeSubscriptionId: varchar('stripe_subscription_id'),
  subscriptionStatus: varchar('subscription_status'),
  subscriptionTier: varchar('subscription_tier').default('free'),
  subscriptionExpiresAt: timestamp('subscription_expires_at'),
  purchasedPacks: jsonb('purchased_packs').default('[]'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  lastLogin: timestamp('last_login')
});

// Session storage table
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Categories 
export const categories = pgTable('categories', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  name: varchar('name').notNull(),
  description: text('description'),
  icon: varchar('icon'),
  premium: boolean('premium').default(false),
});

// Prompts
export const prompts = pgTable('prompts', {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
  title: varchar('title').notNull(),
  content: text('content').notNull(),
  categoryId: integer('category_id').references(() => categories.id),
  userId: integer('user_id'),
  promptType: varchar('prompt_type'),
  experienceLevel: varchar('experience_level'),
  specificFocus: varchar('specific_focus'),
  timeAvailable: integer('time_available'),
  isFavorite: boolean('is_favorite').default(false),
  isPublic: boolean('is_public').default(false),
  shareableId: varchar('shareable_id'), 
  packId: integer('pack_id'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
export type Prompt = typeof prompts.$inferSelect;
export type InsertPrompt = typeof prompts.$inferInsert;

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users);
export const insertCategorySchema = createInsertSchema(categories);
export const insertPromptSchema = createInsertSchema(prompts);

export type InsertUserType = z.infer<typeof insertUserSchema>;
export type InsertCategoryType = z.infer<typeof insertCategorySchema>;
export type InsertPromptType = z.infer<typeof insertPromptSchema>;
