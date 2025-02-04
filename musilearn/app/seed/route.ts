import bcrypt from "bcrypt";
import postgres from "postgres";
import { users, courses, enrollments, progress } from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role VARCHAR(50) NOT NULL,
      createdAt TIMESTAMP DEFAULT NOW()
    );
  `;

  return Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password, role, createdAt)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role}, ${user.createdAt})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );
}

async function seedCourses() {
  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      instrument VARCHAR(100),
      teacherId UUID REFERENCES users(id) ON DELETE SET NULL,
      level VARCHAR(50),
      schedule VARCHAR(100),
      capacity INT
    );
  `;

  return Promise.all(
    courses.map(
      (course) => sql`
      INSERT INTO courses (id, title, description, instrument, teacherId, level, schedule, capacity)
      VALUES (${course.id}, ${course.title}, ${course.description}, ${course.instrument}, ${course.teacherId}, ${course.level}, ${course.schedule}, ${course.capacity})
      ON CONFLICT (id) DO NOTHING;
    `
    )
  );
}

async function seedEnrollments() {
  await sql`
    CREATE TABLE IF NOT EXISTS enrollments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      studentId UUID REFERENCES users(id) ON DELETE CASCADE,
      courseId UUID REFERENCES courses(id) ON DELETE CASCADE,
      enrollmentDate DATE NOT NULL,
      status VARCHAR(50) NOT NULL
    );
  `;

  return Promise.all(
    enrollments.map(
      (enrollment) => sql`
      INSERT INTO enrollments (id, studentId, courseId, enrollmentDate, status)
      VALUES (${enrollment.id}, ${enrollment.studentId}, ${enrollment.courseId}, ${enrollment.enrollmentDate}, ${enrollment.status})
      ON CONFLICT (id) DO NOTHING;
    `
    )
  );
}

async function seedProgress() {
  await sql`
    CREATE TABLE IF NOT EXISTS progress (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      studentId UUID REFERENCES users(id) ON DELETE CASCADE,
      courseId UUID REFERENCES courses(id) ON DELETE CASCADE,
      date DATE NOT NULL,
      evaluation TEXT,
      comments TEXT
    );
  `;

  return Promise.all(
    progress.map(
      (prog) => sql`
      INSERT INTO progress (id, studentId, courseId, date, evaluation, comments)
      VALUES (${prog.id}, ${prog.studentId}, ${prog.courseId}, ${prog.date}, ${prog.evaluation}, ${prog.comments})
      ON CONFLICT (id) DO NOTHING;
    `
    )
  );
}

export async function GET() {
  try {
    await sql.begin(async (sql) => {
      await seedUsers(); // Insérer d'abord les utilisateurs
      await seedCourses(); // Puis les cours (qui dépendent des utilisateurs)
      await seedEnrollments(); // Ensuite les inscriptions
      await seedProgress(); // Enfin le suivi des progrès
    });

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
