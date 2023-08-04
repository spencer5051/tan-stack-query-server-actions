import type { Config } from "drizzle-kit";
require("dotenv").config();

if (!process.env.DATABASE_URL)
  throw new Error("Must define process.env.DATABASE_URL");

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
