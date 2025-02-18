import postgres from "postgres";
import { Course } from "../lib/definitions";
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const fetchCourses = async (): Promise<Course[]> => {
  const data = await sql<Course[]>`
    SELECT id, title, description, instrument, teacherId, level, schedule, capacity
    FROM courses
  `;

  return data;
};

export const fetchCourseById = async (id: string): Promise<Course> => {
  const [course] = await sql<Course[]>`
    SELECT id, title, description, instrument, teacherId, level, schedule, capacity
    FROM courses
    WHERE id = ${id}
  `;
  return course;
};

export async function createCourse(state: any, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const instrument = formData.get("instrument") as string;
  const teacherId = formData.get("teacherId") as string;
  const level = formData.get("level") as string;
  const schedule = formData.get("schedule") as string;
  const capacity = parseInt(formData.get("capacity") as string, 10);

  try {
    const [course] = await sql`
      INSERT INTO courses (title, description, instrument, teacherId, level, schedule, capacity)
      VALUES (${title}, ${description}, ${instrument}, ${teacherId}, ${level}, ${schedule}, ${capacity})
      RETURNING *;
    `;
    return course;
  } catch (error) {
    console.error("Failed to create course:", error);
    throw new Error("Failed to create course.");
  }
}

export const updateCourse = async (
  id: string,
  course: Partial<Course>
): Promise<Course> => {
  try {
    const [updatedCourse] = await sql<Course[]>`
      UPDATE courses
      SET title = ${course.title ?? null}, description = ${
      course.description ?? null
    }, instrument = ${course.instrument ?? null}, level = ${
      course.level ?? null
    }, teacherId = ${course.teacherId ?? null}, schedule = ${
      course.schedule ?? null
    }, capacity = ${course.capacity ?? null}
      WHERE id = ${id}
      RETURNING *
    `;
    return updatedCourse;
  } catch (error) {
    console.error("Failed to update course:", error);
    throw new Error("Failed to update course.");
  }
};

export async function deleteCourse(id: string) {
  try {
    await sql`DELETE FROM courses WHERE id = ${id}`;
  } catch (error) {
    console.error("Failed to delete course:", error);
    throw new Error("Failed to delete course.");
  }
}
