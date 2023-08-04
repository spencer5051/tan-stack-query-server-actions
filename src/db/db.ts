import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import schema from "./schema";

if (!process.env.DATABASE_URL)
  throw new Error("Must define process.env.DATABASE_URL");

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client, { schema });
