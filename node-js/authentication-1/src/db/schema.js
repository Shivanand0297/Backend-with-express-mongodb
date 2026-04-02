import { pgTable, text, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  salt: text().notNull(),
});

export const sessionTable = pgTable("sessions", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().references(() => usersTable.id),
  createdAt: timestamp().defaultNow().notNull(),
});
