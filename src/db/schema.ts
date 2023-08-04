import { Config } from "drizzle-kit";
import { InferModel } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 256 }).primaryKey(),
    name: varchar("name", { length: 256 }),
    age: varchar("age", { length: 256 }),
  },
  // (users) => ({
  //   id: primaryKey(), // drizzle doesn't seem to initialize the sqlite.db without this for some reason and causes write / access errors.
  // }),
);

export type User = InferModel<typeof users>;
export type InsertUser = InferModel<typeof users, "insert">;

export default {
  schema: "./src/schema.ts",
} satisfies Config;
