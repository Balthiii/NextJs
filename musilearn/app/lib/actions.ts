"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import postgres from "postgres";
import { Course } from "./definitions";
import { Progress, User } from "./definitions";

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

export async function createCourse(state: any, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const instrument = formData.get("instrument") as string;
  const teacherId = formData.get("teacherId") as string;
  const level = formData.get("level") as string;
  const schedule = formData.get("schedule") as string;
  const capacity = parseInt(formData.get("capacity") as string, 10);

  try {
    const course = await sql`
      INSERT INTO courses (title, description, instrument, teacherId, level, schedule, capacity)
      VALUES (${title}, ${description}, ${instrument}, ${teacherId}, ${level}, ${schedule}, ${capacity})
      RETURNING *;
    `;
    return { success: true, course: course[0] };
  } catch (error) {
    console.error("Failed to create course:", error);
    return { success: false, error: "Failed to create course." };
  }
}

export async function updateCourse(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const instrument = formData.get("instrument") as string;
  const level = formData.get("level") as string;
  const schedule = formData.get("schedule") as string;
  const capacity = parseInt(formData.get("capacity") as string, 10);

  try {
    const course = await sql`
      UPDATE courses
      SET title = ${title}, description = ${description}, instrument = ${instrument}, level = ${level}, schedule = ${schedule}, capacity = ${capacity}
      WHERE id = ${id}
      RETURNING *;
    `;
    return course[0];
  } catch (error) {
    console.error("Failed to update course:", error);
    throw new Error("Failed to update course.");
  }
}

export async function deleteCourse(id: string) {
  try {
    await sql`
      DELETE FROM courses WHERE id = ${id};
    `;
  } catch (error) {
    console.error("Failed to delete course:", error);
    throw new Error("Failed to delete course.");
  }
}

export async function getCourses() {
  try {
    const courses = await sql`
      SELECT * FROM courses;
    `;
    return courses;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    throw new Error("Failed to fetch courses.");
  }
}

export async function getTeachers(): Promise<{ id: string; name: string }[]> {
  try {
    const result = await sql`
      SELECT id, name FROM users WHERE role = 'teacher';
    `;
    return result.map((row: any) => ({ id: row.id, name: row.name }));
  } catch (error) {
    console.error("Failed to fetch teachers:", error);
    return []; // Retourner un tableau vide en cas d'erreur
  }
}

export async function fetchCourseById(id: string): Promise<Course> {
  const [course] = await sql<Course[]>`
    SELECT id, title, description, instrument, teacherId, level, schedule, capacity
    FROM courses
    WHERE id = ${id}
  `;
  return course;
}

export async function fetchStudentsProgress(): Promise<Progress[]> {
  try {
    const progressRecords = await sql<Progress[]>`
      SELECT * FROM progress;
    `;
    return progressRecords;
  } catch (error) {
    console.error("Failed to fetch progress records:", error);
    throw new Error("Failed to fetch progress records.");
  }
}
export async function updateProgress(
  id: string,
  progress: Partial<Progress>
): Promise<Progress> {
  try {
    const [updatedProgress] = await sql<Progress[]>`
      UPDATE progress
      SET evaluation = ${progress.evaluation ?? null}, comments = ${
      progress.comments ?? null
    }, date = ${progress.date ?? null}
      WHERE id = ${id}
      RETURNING *;
    `;
    return updatedProgress;
  } catch (error) {
    console.error("Failed to update progress:", error);
    throw new Error("Failed to update progress.");
  }
}

export async function createProgress(
  progress: Partial<Progress>
): Promise<Progress> {
  try {
    const [newProgress] = await sql<Progress[]>`
      INSERT INTO progress (studentId, courseId, evaluation, comments, date)
      VALUES (${progress.studentId ?? null}, ${progress.courseId ?? null}, ${
      progress.evaluation ?? null
    }, ${progress.comments ?? null}, ${progress.date ?? new Date()})
      RETURNING *;
    `;
    return newProgress;
  } catch (error) {
    console.error("Failed to create progress:", error);
    throw new Error("Failed to create progress.");
  }
}

export async function getStudents(): Promise<User[]> {
  try {
    const students = await sql<User[]>`
      SELECT * FROM users WHERE role = 'student';
    `;
    return students;
  } catch (error) {
    console.error("Failed to fetch students:", error);
    throw new Error("Failed to fetch students.");
  }
}
