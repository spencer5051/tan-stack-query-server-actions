import { Config } from "drizzle-kit";
import { InferModel } from "drizzle-orm";
import { primaryKey } from "drizzle-orm/mysql-core";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey(),
    name: text("name"),
    age: text("age"),
  },
  (users) => ({
    id: primaryKey(), // drizzle doesn't seem to initialize the sqlite.db without this for some reason and causes write / access errors.
  }),
);

export type User = InferModel<typeof users>;
export type InsertUser = InferModel<typeof users, "insert">;

export default {
  schema: "./src/schema.ts",
} satisfies Config;
