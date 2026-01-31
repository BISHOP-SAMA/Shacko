import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull(),
  xUsername: text("x_username"),
  discordUsername: text("discord_username"),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===
// Validate EVM address format (basic check)
export const insertRegistrationSchema = createInsertSchema(registrations)
  .omit({ id: true, createdAt: true })
  .extend({
    walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, "Invalid EVM wallet address"),
    xUsername: z.string().optional().nullable(),
    discordUsername: z.string().optional().nullable(),
  });

// === EXPLICIT TYPES ===
export type Registration = typeof registrations.$inferSelect;
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
