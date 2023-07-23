"use server";
import { db } from "@/db/db";
import { users, type User } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUsers() {
  const result = db.select().from(users).all();
  console.log("result: ", result);
  return result;
}

export async function addUser(user: Omit<User, "id">) {
  const result = await db.insert(users).values(user).run();
  console.log("result: ", result);
  return result;
}

export async function deleteUser(userId: number) {
  const result = await db.delete(users).where(eq(users.id, userId)).run();
  console.log("result: ", result);
  return result;
}
