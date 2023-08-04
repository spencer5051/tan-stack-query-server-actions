"use server";
import { db } from "@/db/db";
import { users, type User } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";

export async function getUsers() {
  const result = db.select().from(users);
  console.log("result: ", result);
  return result;
}

export async function addUser(user: Omit<User, "id">) {
  const result = await db.insert(users).values({ ...user, id: createId() });
  console.log("result: ", result);
  return result;
}

export async function deleteUser(userId: string) {
  const result = await db.delete(users).where(eq(users.id, userId));
  console.log("result: ", result);
  return result;
}
