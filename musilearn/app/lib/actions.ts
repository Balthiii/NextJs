"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdAt = new Date();

  try {
    console.log("Registering user:", {
      name,
      email,
      hashedPassword,
      role,
      createdAt,
    });
    const user = await sql`
      INSERT INTO users (name, email, password, role, createdat)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role}, ${createdAt})
      RETURNING id, name, email, role, createdat;
    `;
    console.log("User registered successfully:", user);
    return user[0];
  } catch (error) {
    console.error("Failed to register user:", error);
    throw new Error("Failed to register user.");
  }
}
